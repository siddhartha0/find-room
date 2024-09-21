import { Request, Response, NextFunction } from "express";
import {
  CreateEntity,
  DeleteEntity,
  UpdateEntity,
} from "../crud-operation/common-crud";
import { Booking } from "../model";
import CustomError from "../middleware/CusomError";
import { DataFoundMessage } from "../const";

export const createBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CreateEntity(req, res, next, Booking, req.body);
};

export const updateBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  UpdateEntity(req, res, next, Booking, () => {
    return req.body.data;
  });
};

export const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingDetails = await Booking.find()
      .populate("user")
      .populate("room");

    if (!bookingDetails) return CustomError.searchEntityMissingError(next);

    return DataFoundMessage(res, bookingDetails);
  } catch (error) {
    next(error);
  }
};

export const getBookingByRoomId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingDetails = await Booking.find({ room: req.params.id })
      .populate("user")
      .populate("room");

    if (!bookingDetails) return CustomError.searchEntityMissingError(next);

    return DataFoundMessage(res, bookingDetails);
  } catch (error) {
    next(error);
  }
};

export const getBookingByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingDetails = await Booking.find({ user: req.params.id })
      .populate("user")
      .populate("room");

    if (!bookingDetails) return CustomError.searchEntityMissingError(next);

    return DataFoundMessage(res, bookingDetails);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  DeleteEntity(req, res, next, Booking);
};
