import { verify } from "jsonwebtoken";
import { publicEnv } from "../../env";

const funcs = require("./funcs");

const JWT_ACCESS_SECRET = publicEnv.ACCESS_TOKEN_SECRET || "access secret";

export const jwtManager = () => {
  return (
    req: { baseUrl: string; jwt_data: any },
    res: any,
    next: () => void
  ) => {
    const baseUrl = req.baseUrl.split("/").reverse()[0];
    const access_token = funcs.getJwtFromHeaders(req);

    if (!access_token && baseUrl !== "auth")
      return funcs.sendError(res, "Authentication token not provided!", 401);

    verify(access_token, JWT_ACCESS_SECRET, (err: any, data: any) => {
      if (err) {
        if (err.name === "TokenExpiredError")
          throw {
            err_message: "Authentication token expired!",
            err_code: 401,
          };
        throw { err_message: "Invalid authentication token!", err_code: 401 };
      }

      if (data.version !== publicEnv.VERSION)
        throw { err_message: "Token Resetted!", err_code: 401 };

      delete data["exp"];
      delete data["iat"];
      req.jwt_data = data;
      next();
    });
  };
};
