import { NextFunction, Request, Response } from "express";
import { CreateEntity } from "../crud-operation/common-crud";
import UserModel from "../model/user-model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils";
import CustomError from "../middleware/CusomError";
import jwt from "jsonwebtoken";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = req.body;
    if (userDetails) {
      if (userDetails.userName && userDetails.contact && userDetails.email) {
        const alreadyExists = await UserModel.findOne({
          email: userDetails.email,
        });
        if (alreadyExists) {
          return CustomError.entityAlreadyExistsError(next);
        }
        const hashedPwd = (await bcrypt.hash(req.body.password, 10)).toString();
        const newData = {
          ...userDetails,
          password: hashedPwd,
        };
        CreateEntity(req, res, next, UserModel, newData);
      } else return CustomError.entityPropsMissingError(next);
    }
  } catch (error) {
    next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = req.body;
    if (userDetails) {
      const userExists = await UserModel.findOne({
        email: userDetails.email,
      });

      console.log(userExists);
      if (!userExists) {
        return CustomError.searchEntityMissingError(next);
      }
      const hashedPwd = await bcrypt.compare(
        userDetails.password,
        userExists.password
      );
      if (!hashedPwd) {
        return CustomError.invalidField(next);
      }
      const token = generateToken(userExists);
      const decode = jwt.verify(token, "SecretKey");

      console.log("from loggined", decode);
      res.status(200).json({
        token: token,
        user: decode,
        msg: "Logged in Successfully!!!",
      });
    } else {
      return CustomError.entityPropsMissingError(next);
    }
  } catch (error) {
    next(error);
  }
};
