import { Request, Response, NextFunction } from "express";
import { DeleteEntity, UpdateEntity } from "../crud-operation/common-crud";
import { Booking } from "../model";
import CustomError from "../middleware/CusomError";
import { DataFoundMessage } from "../const";
import { BookingNotification, sendMail } from "../utils";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const saveData = new Booking(data);
    await saveData.save();

    const body = BookingNotification(
      data.ownerEmail,
      data.user.userName,
      data.room.imgUrl,
      data.user.email,
      data.user.contact,
      data.user.address,
      data.people,
      data.room.hostelName,
      data.room.location,
      data.room.peopleNumber,
      data.room.price
    );

    await sendMail(data.ownerEmail, "Booking Reservation", body);
    return DataFoundMessage(res, saveData, "Entity created successfully!!!");
  } catch (error) {
    return CustomError.tryCatchError(next);
  }
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
