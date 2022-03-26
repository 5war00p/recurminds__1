import * as dotenv from "dotenv";
dotenv.config();

export const publicEnv = {
  MONGODB_URI: process.env.MONGODB_URI as string,
};
