import { Request, Response, NextFunction } from "express";
import {
  CreateEntity,
  DeleteEntity,
  FetchOneEntityById,
  GetAllEntites,
  UpdateEntity,
} from "../crud-operation/common-crud";
import { RoomModel } from "../model";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recaptchaToken = req.body.recaptchaToken;

  const verificationResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: process.env.GOOGLE_SECRET_KEY_CAPTCHA,
        response: recaptchaToken,
      },
    }
  );

  const { success, score } = verificationResponse.data;

  if (!success || (score && score < 0.5)) {
    return res.status(400).json({ message: "Failed reCAPTCHA verification" });
  }

  CreateEntity(req, res, next, RoomModel, req.body);
};

export const getAllRoom = (req: Request, res: Response, next: NextFunction) => {
  GetAllEntites(req, res, next, RoomModel);
};

export const getRoomById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  FetchOneEntityById(req, res, next, RoomModel);
};

export const updateRoom = (req: Request, res: Response, next: NextFunction) => {
  let updatedDetails = {};
  const {
    title,
    hostelName,
    imgUrl,
    location,
    price,
    frequency,
    peopleNumber,
    totalbed,
    email,
    contact,
    ownerEmail,
  } = req.body.data;

  UpdateEntity(req, res, next, RoomModel, () => {
    if (req.body.data) {
      updatedDetails = {
        title: title,
        hostelName: hostelName,
        imgUrl: imgUrl,
        location: location,
        price: price,
        frequency: frequency,
        peopleNumber: peopleNumber,
        totalbed: totalbed,
        email: email,
        contact: contact,
        ownerEmail: ownerEmail,
      };
    }
    return updatedDetails;
  });
};

export const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
  DeleteEntity(req, res, next, RoomModel);
};
