import bcrypt from "bcrypt";
import { models } from "../models/index";
import { Router, Request, Response } from "express";
import { funcs } from "../utils/funcs";
import { jwtManager } from "../utils/jwtManager";

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  res.send("Come on login I sayyy");
});

router.post("/login", async (req, res) => {
  const { username, password, email } = req.body;

  if ((!username && !email) || !password)
    return funcs.sendError(res, "Missing some required fields!", 422);

  let jwt_data: string | object;
  let access_token: string;
  try {
    let user: any = await models.Profile.findOne({ username, email });
    if (!user)
      return funcs.sendError(
        res,
        "Seems entered user details not exists!",
        401
      );
    const auth = bcrypt.compareSync(password, user.password);
    if (!auth) return funcs.sendError(res, "Incorrect credentials", 401);
    jwt_data = {
      data: {
        id: user._id,
      },
      version: process.env.VERSION,
    };
    access_token = funcs.genJWT(jwt_data);
    await user.save();
    return funcs.sendSuccess(res, jwt_data, 201, access_token);
  } catch (err: any) {
    return funcs.sendError(res, err.err_message || err, err.err_code);
  }
});

router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return funcs.sendError(res, "Missing some required fields!", 422);
  }

  password = funcs.get_hash(password);

  let jwt_data: string | object;
  let access_token: string;
  try {
    let user: any = await models.User.findOne({ username });
    if (!user) {
      const profile = await models.Profile.create({
        username: username,
        password: password,
        email: email,
      });
      user = await models.User.create({ profile: profile._id });
      jwt_data = {
        data: {
          id: user._id,
        },
        version: process.env.VERSION,
      };
      access_token = funcs.genJWT(jwt_data);
    } else return funcs.sendError(res, "Username already exists!", 400);

    return funcs.sendSuccess(res, jwt_data, 201, access_token);
  } catch (err: any) {
    return funcs.sendError(res, err.err_message || err, err.err_code);
  }
});

router.delete("/logout", jwtManager, async (req: any, res: Response, next) => {
  const _id: string = req.jwt_data.data.id;
  try {
    let user: any = await models.User.findOneAndUpdate(
      { _id },
      { $unset: { access_token: 1 } }
    );
    if (!user) return funcs.sendError(res, "User not exists!", 401);
    return funcs.sendSuccess(res, "Loggedout Successfully !!", 200, null);
  } catch (err: any) {
    next();
  }
});