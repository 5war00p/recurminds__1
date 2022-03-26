import { Router } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User";

const router = Router({ caseSensitive: true });

router.get("/login", (req, res) => {
  const { username, password }: Record<string, string> = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ type: "error", message: "Please fill all the inputs " });
  } else if (username.length < 4 || password.length < 7) {
    return res.status(400).json({
      type: "error",
      message:
        "Please check your Username (4) or Password(8) length should be matched",
    });
  } else {
    const User = UserModel.findOne({
      $or: [{ username: { $eq: username } }, { email: { $eq: username } }],
    });

    console.log(User);
  }
});

router.get("/signup", (req, res) => {
  const { username, password, email }: Record<string, string> = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ type: "error", message: "Please fill all the inputs correctly" });
  } else if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.substring(email.indexOf(".")).length > 2
  ) {
    return res.status(400).json({
      type: "error",
      message: "Please check your email address format once",
    });
  } else if (username.length < 4 || password.length < 8) {
    return res.status(400).json({
      type: "error",
      message:
        "Please check your Username (4) or Password(8) length should be matched",
    });
  }

  const newUser = new UserModel({ username, email, password });
  try {
    console.log(newUser);
    return res
      .status(200)
      .json({ message: "User created Successfully", type: "Success" });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ type: "error", message: "Please check the input again." });
    }
  }
});
