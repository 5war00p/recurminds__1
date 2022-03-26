import express from "express";
import { db } from "./models";
import cors from "cors";
import { publicEnv } from "../env";
import { jwtManager } from "./utils/jwtManager";
const app = express();

import otherRoutes from "./routes/other-routes";

app.set("case sensitive routing", true);
app.use(express.json({ limit: "5MB" }));
app.use(cors);

app.use("/auth", authRoutes);
app.use("/other", jwtManager, otherRoutes);

const createServer = async () => {
  app.listen(parseInt(publicEnv.API_PORT), publicEnv.API_BIND_ADDRESS, () => {
    console.log(`Running the API on http://localhost:${publicEnv.API_PORT}`);
  });

  db()
    .then((_) => {
      console.log("DB Connected successfully!");
    })
    .catch((err) => {
      console.error(err);
    });
};

export { createServer };
function authRoutes(arg0: string, authRoutes: any) {
  throw new Error("Function not implemented.");
}
