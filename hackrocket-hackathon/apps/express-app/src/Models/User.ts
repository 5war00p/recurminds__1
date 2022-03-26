import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema({
  email: Schema.Types.String,
  password: Schema.Types.String,
});

const UserModel = new mongoose.Model("user", User);
export default UserModel;
