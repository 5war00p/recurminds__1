import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    authentication_token: {
      type: String,
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Connection",
      },
    ],
    platform_profiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlatformProfile",
      },
    ],
  },
  { timestamps: true }
) as never;

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };
