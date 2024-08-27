import { Request, Response, NextFunction } from "express";
import {
  CreateEntity,
  DeleteEntity,
  FetchOneEntityById,
  GetAllEntites,
} from "../crud-operation/common-crud";
import { RoomModel } from "../model";

export const createRoom = (req: Request, res: Response, next: NextFunction) => {
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
  // CreateEntity(req, res, next, RoomModel, req.body);
};

export const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
  DeleteEntity(req, res, next, RoomModel);
};
