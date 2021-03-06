import bcrypt from "bcrypt";
import { models } from "../models";
import { Router, Request, Response } from "express";
import { funcs } from "../utils/funcs";
import { jwtManager } from "../utils/jwtManager";

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  res.send("Come on login I sayyy");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return funcs.sendError(res, "Missing some required fields!", 422);

  let jwt_data: string | object;
  let access_token: string;
  try {
    let profile: any = await models.Profile.findOne({ username });
    if (!profile)
      return funcs.sendError(
        res,
        "Seems entered user details not exists!",
        401
      );
    const auth = bcrypt.compareSync(password, profile.password);
    if (!auth) return funcs.sendError(res, "Incorrect credentials", 401);
    jwt_data = {
      data: {
        id: profile._id,
      },
      version: process.env.VERSION,
      username,
    };
    access_token = funcs.genJWT(jwt_data);
    let user: any = await models.User.findOneAndUpdate(
      { profile: profile._id },
      { access_token: access_token }
    );
    await user.save();
    return funcs.sendSuccess(res, jwt_data, 200, access_token);
  } catch (err: any) {
    return funcs.sendError(res, err.err_message || err, err.err_code);
  }
});

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return funcs.sendError(res, "Missing some required fields!", 422);
  }

  password = funcs.get_hash(password);

  let jwt_data: string | object;
  let access_token: string;
  try {
    let user: any = await models.Profile.findOne({ username });
    if (!user) {
      const profile = await models.Profile.create({
        username: username,
        password: password,
        email: email,
      });
      user = await models.User.create({ profile: profile._id });
      jwt_data = {
        data: {
          id: profile._id,
        },
        version: process.env.VERSION,
      };
      access_token = funcs.genJWT(jwt_data);
    } else return funcs.sendError(res, "Username already exists!", 400);

    return funcs.sendSuccess(res, jwt_data, 201);
  } catch (err: any) {
    return funcs.sendError(res, err.err_message || err, err.err_code);
  }
});

router.delete("/logout", jwtManager, async (req: any, res: Response, next) => {
  const _id: string = req.jwt_data.data.id;
  try {
    let user: any = await models.User.findOneAndUpdate(
      { profile: _id },
      { $unset: { access_token: 1 } }
    );
    if (!user) return funcs.sendError(res, "User not exists!", 401);
    return funcs.sendSuccess(res, "Loggedout Successfully !!", 200);
  } catch (err: any) {
    next();
  }
});

router.post("/check-username", async (req, res) => {
  const { username } = req.body;
  const user = await models.Profile.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "User Already exits" });
  } else {
    return res.status(200).json({ message: "Username Available" });
  }
});

router.get("/platforms", async (req, res) => {
  const { username } = req.query;
  const profile = await models.Profile.findOne({ username });
  if (!profile) return res.status(404).json({ message: "No Data found" });
  const user = await models.User.findOne({ profile: profile?._id });
  if (!user) return res.status(404).json({ message: "No Data found" });
  return res.json({ platform_profiles: user.platform_profiles });
});
