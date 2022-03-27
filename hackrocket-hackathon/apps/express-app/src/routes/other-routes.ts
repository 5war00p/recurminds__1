import { Router, Request, Response } from "express";

export const router = Router();

router.get("/other", async (req: Request, res: Response) => {
  return res.json({ message: "Auth set" });
});
