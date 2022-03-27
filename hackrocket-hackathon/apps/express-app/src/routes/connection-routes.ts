import { Router, Response } from "express";
import { models } from "../models";
import mongoose from "mongoose";
import { funcs } from "../utils/funcs";

export const router = Router();

router.get("/", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);
  try {
    const User = await models.User.findOne({ profile: _id })
      .select({ access_token: 0, platform_profiles: 0 })
      .populate([
        {
          path: "profile",
          select: { friends: 1, followers: 1, following: 1 },
          populate: [
            { path: "friends", select: { username: 1 } },
            { path: "followers", select: { username: 1 } },
            { path: "following", select: { username: 1 } },
          ],
        },
        { path: "connections", select: { type: 1, user_id: 1 } },
      ]);

    return funcs.sendSuccess(res, User);
  } catch (_err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});

router.get("/search", async (req, res) => {
  const { user } = req.query;
  if (!user)
    return res.json({ type: "error", message: "Please provide input" });
  const profiles = await models.Profile.find({
    username: { $regex: user },
  }).select({ username: 1 });
  return res.json({ message: "success", data: profiles });
});

router.post("/friend/req", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;
  const { requesting_user_id } = req.body;

  if (!requesting_user_id)
    return funcs.sendError(res, "Missing some required data!", 422);
  try {
    const connection0: any = await models.Connection.create({
      type: "Requested",
      user_id: _id,
    });

    const user: any = await models.User.findOneAndUpdate(
      { profile: _id },
      { $addToSet: { connections: connection0._id } }
    );

    const connection1: any = await models.Connection.create({
      type: "IncomingRequest",
      user_id: requesting_user_id,
    });
    const otherUser: any = await models.User.findOneAndUpdate(
      {
        profile: requesting_user_id,
      },
      { $addToSet: { connections: connection1._id } }
    );

    return funcs.sendSuccess(res, `Request sent successfully!`);
  } catch (_err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});

router.post("/follow", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;
  const { following_user_id } = req.body;

  if (!following_user_id)
    return funcs.sendError(res, "Missing some required data!", 422);
  try {
    const otherUser: any = await models.Profile.findOneAndUpdate(
      {
        _id: following_user_id,
      },
      { $addToSet: { followers: _id } }
    );

    await models.Profile.findOneAndUpdate(
      {
        _id: _id,
      },
      { $addToSet: { following: following_user_id } }
    );

    return funcs.sendSuccess(
      res,
      `You are now following ${otherUser.username}`
    );
  } catch (_err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});

router.post("/friend/accept", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;
  const { requested_user_id } = req.body;

  if (!requested_user_id)
    return funcs.sendError(res, "Missing some required data!", 422);

  console.log(_id, requested_user_id);
  try {
    await models.Profile.findOneAndUpdate(
      {
        _id,
      },
      { $addToSet: { friends: requested_user_id } }
    );

    const con0: any = await models.Connection.findOneAndDelete({
      user_id: requested_user_id,
    });

    await models.User.findOneAndUpdate(
      {
        profile: requested_user_id,
      },
      { $pull: { connections: con0._id } }
    );

    const otherUser: any = await models.Profile.findOneAndUpdate(
      { _id: requested_user_id },
      { $addToSet: { friends: _id } }
    );

    const con1: any = await models.Connection.findOneAndDelete({
      user_id: _id,
    });

    await models.User.findOneAndUpdate(
      {
        profile: _id,
      },
      { $pull: { connections: con1._id } }
    );

    return funcs.sendSuccess(
      res,
      `Now you  & ${otherUser.username} are friends..`
    );
  } catch (_err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});

router.post("/friend/reject", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;
  const { requested_user_id } = req.body;

  if (!requested_user_id)
    return funcs.sendError(res, "Missing some required data!", 422);
  try {
    const con1: any = await models.Connection.findOneAndDelete({
      user_id: requested_user_id,
    });
    // other user
    const user: any = await models.User.findOneAndUpdate(
      {
        profile: requested_user_id,
      },
      { $pull: { connections: con1._id } }
    );

    const con2: any = await models.Connection.findOneAndDelete({
      user_id: _id,
    });

    // user
    const otherUser: any = await models.User.findOneAndUpdate(
      { profile: _id },
      { $pull: { connections: con2._id } }
    );

    return funcs.sendSuccess(res, "Rejected friend request!");
  } catch (_err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});
