import { Router } from "express";
import { models } from "../models";
import { funcs } from "../utils/funcs";
import mongoose from "mongoose";

export const router = Router();

router.post("/new", async (req: any, res: any, next) => {
  const _id = req.jwt_data.data.id;
  const { platform, username } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);

  if (!platform || !username)
    return funcs.sendSuccess(res, "Missing some required fields!", 422);

  try {
    const platformProfile: any = await models.PlatformProfile.create({
      name: platform,
      details: { username: username },
    });

    await models.User.findOneAndUpdate(
      { profile: _id },
      { $addToSet: { platform_profiles: platformProfile._id } }
    );
    return funcs.sendSuccess(res, "Platform added successfully!");
  } catch (_err: any) {
    next();
  }
});

router.get("/list", async (req: any, res: any, next) => {
  const _id = req.jwt_data.data.id;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return funcs.sendError(res, "Invalid UserID!", 403);

  try {
    const details = await models.User.findOne({
      profile: _id,
    }).populate({ path: "platform_profiles" });
    return funcs.sendSuccess(res, details);
  } catch (_err: any) {
    next();
  }
});
