import { verify } from "jsonwebtoken";
import { publicEnv } from "../../env";
import { Request, Response, NextFunction } from "express";
import { funcs } from "./funcs";

const JWT_ACCESS_SECRET = publicEnv.ACCESS_TOKEN_SECRET || "access secret";

export const jwtManager = (req: Request, res: Response, next: NextFunction) => {
  // return (req: Request, res: Response, next: NextFunction) => {
  const baseUrl = req.baseUrl.split("/").reverse()[0];
  const access_token = funcs.getJwtFromHeaders(req);
  if (!access_token && baseUrl !== "auth")
    return funcs.sendError(res, "Authentication token not provided!", 401);

  verify(access_token, JWT_ACCESS_SECRET, (err: any, data: any) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        // throw {
        //   err_message: "Authentication token expired!",
        //   err_code: 401,
        // };
        return funcs.sendError(res, "Authentication token expired", 401);
      return funcs.sendError(res, "Invalid authentication token!", 401);
    }

    if (data?.version !== publicEnv.VERSION)
      return res
        .status(401)
        .json({ err_message: "Token Resetted!", err_code: 401 });

    delete data["exp"];
    delete data["iat"];
    req.body.jwt_data = data;
    next();
  });
  // };
};
