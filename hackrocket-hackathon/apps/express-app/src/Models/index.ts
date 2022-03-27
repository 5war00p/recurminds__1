import { connect } from "mongoose";
import { publicEnv } from "../../env";
import ConnectionModel from "./Connection";
import { PlatformProfileModel } from "./PlatformProfile";
import { ProfileModel } from "./Profile";
import { UserModel } from "./User";

export const db = async (): Promise<void> => {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
    await connect(publicEnv.MONGODB_URI, options);
  } catch (err) {
    console.error(err);
  }
};

export const models = {
  User: UserModel,
  PlatformProfile: PlatformProfileModel,
  Profile: ProfileModel,
  Connection: ConnectionModel,
};
