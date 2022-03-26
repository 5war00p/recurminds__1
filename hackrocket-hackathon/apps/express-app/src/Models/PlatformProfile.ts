import mongoose from "mongoose";

const PlatformProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
    },
  },
  { timestamps: true }
) as never;

const PlatformProfileModel = mongoose.model(
  "PlatformProfile",
  PlatformProfileSchema
);
export { PlatformProfileModel };
