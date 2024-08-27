import { NextFunction, Request, Response } from "express";
import { user } from "../types";
import jwt from "jsonwebtoken";
import CustomError from "./CusomError";

interface CustomRequest extends Request {
  user?: user;
}

export const isOwner = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return CustomError.noTokenError(next);
  try {
    const decode = jwt.verify(token, "SecretKey");

    req.user = decode as user;
    if (req.user.role === "owner") {
      next();
    } else {
      CustomError.unAuthorizedError(next);
    }
  } catch (error) {
    next(error);
  }
};

export const isAuthorized = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return CustomError.unAuthorizedError(next);
  }
  try {
    const decode = jwt.verify(token, "SecretKey");
    req.user = decode as user;
    next();
  } catch (err) {
    return CustomError.noTokenError(next);
  }
};
