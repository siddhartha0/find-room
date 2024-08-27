import { Response } from "express";
import { room, user, booking } from "../../types";

export const DataFoundMessage = (
  res: Response,
  data: user | room | booking | null | user[] | room[] | booking[],
  msg?: string
) => {
  msg = "Success!!! ";
  res.status(200).json({
    data: data,
    msg: msg,
  });
};
