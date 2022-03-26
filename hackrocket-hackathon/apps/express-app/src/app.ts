import express, { Request, Response } from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
  return res.json({ version: "1.0.0" });
});

const createServer = () => {
  server.listen(3001, () => {
    console.log("Running the API on http://localhost:3001");
  });
};

export { createServer };
