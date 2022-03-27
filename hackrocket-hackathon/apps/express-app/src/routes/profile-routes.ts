import { Router, Request, Response } from "express";
import { models } from "../models";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { funcs } from "../utils/funcs";

export const router = Router();

router.get("/", async (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);
  try {
    const User = await models.User.findOne({ profile: _id })
      .select({ access_token: 0 })
      .populate([
        {
          path: "profile",
          populate: [{ path: "friends" }, { path: "followers" }],
          select: { password: 0 },
        },
        { path: "platform_profiles" },
      ]);

    return funcs.sendSuccess(res, User);
  } catch (_err: any) {
    next();
  }
});

router.patch("/change_pswd", async (req: any, res: any, next) => {
  let { old_password, new_password } = req.body;
  const _id = req.jwt_data.data.id;

  if (!old_password || !new_password)
    return funcs.sendSuccess(res, "Missing some required fields!", 406);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);
  try {
    let profile: any = await models.Profile.findOne({ _id });

    if (!profile) throw { err_message: "User not found", err_code: 404 };

    const auth = bcrypt.compareSync(old_password, profile.password);
    if (!auth) throw { err_message: "Password doesn't match", err_code: 403 };

    new_password = funcs.get_hash(new_password);

    profile.password = new_password;
    await profile.save();
    return funcs.sendSuccess(res, "Password Changed Successfully !!");
  } catch (err: any) {
    return funcs.sendError(res, "Something went wrong!");
  }
});

router.patch("/edit", async (req: any, res, next) => {
  const { designation, name } = req.body;
  const _id = req.jwt_data.data.id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);
  try {
    let profile: any = await models.Profile.findOne({ _id });
    if (!profile) return funcs.sendError(res, "UserID not found", 404);
    if (designation) profile.designation = designation;
    if (name) profile.name = name;

    await profile.save();
    return funcs.sendSuccess(res, {
      _id: profile._id,
      designation: profile.designation,
      name: profile.name,
    });
  } catch (_err: any) {
    next();
  }
});
