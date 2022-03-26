import * as dotenv from "dotenv";
dotenv.config();

export const publicEnv = {
  MONGODB_URI: process.env.MONGODB_URI as string,
  API_PORT: process.env.API_PORT as string,
  API_BIND_ADDRESS: process.env.API_BIND_ADDRESS as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  VERSION: process.env.VERSION as string,
  ACCESS_EXPIRY_TIME: process.env.ACCESS_EXPIRY_TIME as string,
};
