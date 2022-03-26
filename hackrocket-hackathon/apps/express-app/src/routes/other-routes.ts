import { Router, Request, Response } from "express";

const router = Router();

router.get("/other", async (req: Request, res: Response) => {
  res.send("Auth set");
});

export default router;
