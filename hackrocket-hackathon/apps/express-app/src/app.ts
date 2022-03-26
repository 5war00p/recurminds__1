import express from "express";
import { db } from "./models";
import cors from "cors";
import { publicEnv } from "../env";
import { jwtManager } from "./utils/jwtManager";
import { router as AuthRouter } from "./routes/auth-routes";
const app = express();

import { router as OtherRouter } from "./routes/other-routes";

app.set("case sensitive routing", true);
app.use(express.json({ limit: "5MB" }));
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/other", jwtManager, OtherRouter);

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
