import bcrypt from "bcrypt";
import { models } from "../models/index";
import { Router, Request, Response } from "express";
import { funcs } from "../utils/funcs";
import { jwtManager } from "../utils/jwtManager";

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  res.send("Come on login I sayyy");
});

router.post("/login", (req, res) => {
  const { username, password, email } = req.body;

  let jwt_data: string | object;
  let access_token: string;
  models.Profile.findOne({ username, email })
    .then(
      (user: {
        password: any;
        _id: any;
        email: string;
        username: string;
        last_login: Date;
        save: () => any;
      }) => {
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
          isloggedIn: true,
          version: process.env.VERSION,
        };
        access_token = funcs.genJWT(jwt_data);
        user.last_login = new Date();
        return user.save();
      }
    )
    .then((_: any) => {
      return funcs.sendSuccess(res, jwt_data, 201, access_token);
    })
    .catch((err: { err_message: any; err_code: any }) => {
      return funcs.sendError(res, err.err_message || err, err.err_code);
    });
});

router.post("/register", (req, res) => {
  let { username, email, password, confirm_password } = req.body;

  if (!username || !email || !password || !confirm_password) {
    return funcs.sendError(res, "Some fields are missing", 422);
  }

  if (password !== confirm_password) {
    return funcs.sendError(res, "Passwords must be same", 422);
  }

  password = funcs.get_hash(password);

  let jwt_data: string | object;
  let access_token: string;

  models.User.findOne({ username })
    .then((user: any) => {
      if (!user)
        return models.Profile.create({
          username: username,
          password: password,
          email: email,
        });
      return funcs.sendError(res, "Username already exists!", 400);
    })
    .then((profile: { _id: any }) => {
      return models.User.create({ profile: profile._id });
    })
    .then((user: { _id: any; last_login: Date; save: () => any }) => {
      jwt_data = {
        data: {
          id: user._id,
        },
        isloggedIn: true,
        version: process.env.VERSION as string,
      };
      access_token = funcs.genJWT(jwt_data);
      user.last_login = new Date();
      return user.save();
    })
    .then((_: any) => {
      return funcs.sendSuccess(res, jwt_data, 201, access_token);
    })
    .catch((err: { err_message: any; err_code: number }) => {
      return funcs.sendError(res, err.err_message || err, err.err_code);
    });
});

router.delete("/logout", jwtManager, (req: any, res: Response, next) => {
  const _id = req.jwt_data.data.id;

  models.User.findOneAndUpdate({ _id }, { $unset: { access_token: 1 } })
    .then((user: any) => {
      if (!user) return funcs.sendError(res, "User not exists!", 401);

      return funcs.sendSuccess(res, "Loggedout Successfully !!", 200, null);
    })
    .catch(next);
});
