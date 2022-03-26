import express, { Request, Response } from "express";
import { db } from "./models";

const server = express();

server.get("/", (req: Request, res: Response) => {
  return res.json({ version: "1.0.0" });
});

const createServer = async () => {
  server.listen(3001, () => {
    console.log("Running the API on http://localhost:3001");
  });
  await db();
  console.log("DB Connected successfully!");
};

export { createServer };
