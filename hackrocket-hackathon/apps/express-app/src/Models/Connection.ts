import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["IncomingRequest", "Requested"],
      required: true,
    },
    user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
) as never;

const ConnectionModel = mongoose.model("Connection", ConnectionSchema);
export default ConnectionModel;
