import { NextFunction, Request, Response } from "express";
import {
  DeleteEntity,
  FetchOneEntityById,
  GetAllEntites,
  UpdateEntity,
} from "../crud-operation/common-crud";
import { UserModel } from "../model";
import bcrypt from "bcrypt";

export const getAllUser = (req: Request, res: Response, next: NextFunction) => {
  return GetAllEntites(req, res, next, UserModel);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  FetchOneEntityById(req, res, next, UserModel);
};

export const updateUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let newHasedPwd = "";
  const data = req.body.data;
  console.log(data);

  if (data.password)
    newHasedPwd = (await bcrypt.hash(req.body.password, 10)).toString();
  let updatedUserDetails = req.body;

  return UpdateEntity(req, res, next, UserModel, () => {
    if (data.password) {
      updatedUserDetails = {
        userName: data.userName,
        email: data.email,
        contact: data.contact,
        address: data.address,
        password: newHasedPwd,
        role: data.role,
      };
    }
    updatedUserDetails = {
      userName: data.userName,
      email: data.email,
      contact: data.contact,
      address: data.address,
      role: data.role,
    };

    return updatedUserDetails;
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  return DeleteEntity(req, res, next, UserModel);
};
