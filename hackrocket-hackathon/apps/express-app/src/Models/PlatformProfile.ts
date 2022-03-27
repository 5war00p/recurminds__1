import mongoose from "mongoose";

const PlatformProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["HackerRank", "GitHub"],
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
) as never;

const PlatformProfileModel = mongoose.model(
  "PlatformProfile",
  PlatformProfileSchema
);
export { PlatformProfileModel };
