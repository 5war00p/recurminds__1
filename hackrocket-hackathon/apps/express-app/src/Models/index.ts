import { connect } from "mongoose";
import { publicEnv } from "../../env";

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
  User: import("./User"),
  PlatformProfile: import("./PlatformProfile"),
  Profile: import("./Profile"),
  Connection: import("./Connection"),
};
