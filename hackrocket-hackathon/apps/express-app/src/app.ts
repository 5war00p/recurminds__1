import express from "express";
import { db } from "./models";
import cors from "cors";
import { publicEnv } from "../env";
import { jwtManager } from "./utils/jwtManager";
import { router as AuthRouter } from "./routes/auth-routes";
const app = express();

import { router as OtherRouter } from "./routes/other-routes";
import { funcs } from "./utils/funcs";

app.set("case sensitive routing", true);
app.use(express.json({ limit: "5MB" }));
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/other", jwtManager, OtherRouter);

app.use(
  (
    err: { err_message: any; err_code: number },
    _req: any,
    res: {
      req: any;
      set: (arg0: string, arg1: string) => void;
      status: (arg0: any) => void;
      json: (arg0: { code: any; status: string; message: any }) => void;
      end: () => void;
    },
    _next: any
  ) => {
    if (err instanceof SyntaxError)
      return funcs.sendError(res, "JSON parse error!", 400);
    else return funcs.sendError(res, err.err_message || err, err.err_code);
  }
);

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
