import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { publicEnv } from "../../env";
import { Request } from "express";

const JWT_ACCESS_SECRET = publicEnv.ACCESS_TOKEN_SECRET || "access secret";
const ACCESS_EXPIRY_TIME = publicEnv.ACCESS_EXPIRY_TIME || "1h";

const sendError = (
  res: {
    req: any;
    set: (arg0: string, arg1: string) => void;
    status: (arg0: any) => void;
    json: (arg0: { code: any; status: string; message: any }) => void;
    end: () => void;
  },
  err: string,
  resCode: number
) => {
  err = err || "Internal server error";
  resCode = resCode || 500;
  const req = res.req;
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  var user_agent = req.headers["user-agent"] || "No user agent";
  const err_message = { code: resCode || 500, message: err };
  console.error(
    `${ip} - - [${getDateTime()}] "${req.method} ${
      req.originalUrl
    }" ${resCode} "${user_agent}"`,
    err_message
  );
  if (typeof err !== "string") err = "Internal server error!";
  let message = {
    code: resCode,
    status: "error",
    message: err,
  };
  res.set("X-Content-Type-Options", "nosniff");
  res.status(resCode);
  res.json(message);
  res.end();
  return res;
};

const sendSuccess = (
  res: {
    set: (arg0: string, arg1: string) => void;
    status: (arg0: any) => void;
    json: (arg0: { code: any; status: string; data: any }) => void;
    end: () => void;
  },
  data: undefined | any,
  resCode: number | undefined,
  access_token: any | undefined
) => {
  resCode = resCode || 200;
  data = data === undefined ? {} : data;
  let message = {
    code: resCode,
    status: "success",
    data: data,
    access_token: "",
    refresh_token: "",
  };
  if (access_token) message["access_token"] = access_token;

  res.set("X-Content-Type-Options", "nosniff");
  res.status(resCode);
  res.json(message);
  res.end();
};

const getDateTime = () => {
  return new Date()
    .toLocaleString("en-in", { timeZone: "Asia/Kolkata" })
    .toUpperCase();
};

const getTimeStamp = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const genRandomString = (size: number, charset = "0123456789abcdef") => {
  let randString = "";
  for (let i = 0; i < size; i++) {
    randString += charset[Math.floor(Math.random() * charset.length)];
  }
  return randString;
};

const genJWT = (
  data: string | object,
  access_secret = JWT_ACCESS_SECRET,
  access_expire = ACCESS_EXPIRY_TIME
) => {
  const access_token = sign(data, access_secret, { expiresIn: access_expire });

  return access_token;
};

const get_hash = (passwd: string | Buffer) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(passwd, salt);
};

const getJwtFromHeaders = (req: Request) => {
  const access_token = req.headers["x-dev-profile-access-token"] || "";
  return typeof access_token === "string" ? access_token : access_token[0];
};

export const funcs = {
  genJWT,
  genRandomString,
  getDateTime,
  getJwtFromHeaders,
  getTimeStamp,
  get_hash,
  sendError,
  sendSuccess,
};
