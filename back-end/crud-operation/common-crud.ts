import { NextFunction, Request, Response } from "express";
import { user, room, booking } from "../types";
import { Model } from "mongoose";
import { DataFoundMessage } from "../const";
import CustomError from "../middleware/CusomError";
import { ObjectId } from "mongodb";

export const CreateEntity = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>,
  data: user | room | booking
) => {
  try {
    const saveData = new model(data);
    console.log(data);
    await saveData.save();
    DataFoundMessage(res, saveData, "Entity created successfully!!!");
  } catch (error) {
    next(error);
  }
};

export const FetchOneEntity = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>,
  data: user | room | booking
) => {
  try {
    const saveData = new model(data);
    await saveData.save();
    DataFoundMessage(res, saveData, "Entity created successfully!!!");
  } catch (error) {
    next(error);
  }
};

export const FetchOneEntityById = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>
) => {
  try {
    const searchEntity = await model.findById(req.params.id);
    if (!searchEntity) {
      return CustomError.searchEntityMissingError(next);
    }
    DataFoundMessage(res, searchEntity);
  } catch (error) {
    next(error);
  }
};

export const GetAllEntites = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>
) => {
  try {
    const searchEntity = await model.find();
    if (!searchEntity) {
      return CustomError.searchEntityMissingError(next);
    }
    res.status(200).json({
      data: searchEntity,
      msg: "Entity has been fetched succesfully!!!",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateEntity = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>,
  callback: () => {}
) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const searchUser = await model.findById(userId);

    if (searchUser) {
      const updatedEntity = callback();
      console.log(updatedEntity);

      await model.findByIdAndUpdate(req.params.id, updatedEntity);
      res.status(200).json({ data: updatedEntity, msg: "Success" });
    } else {
      return CustomError.searchEntityMissingError(next);
    }
  } catch (error) {
    next(error);
  }
};

export const DeleteEntity = async <T extends user | room | booking>(
  req: Request,
  res: Response,
  next: NextFunction,
  model: Model<T>
) => {
  try {
    const searchForEntity = await model.findById(req.params.id);
    if (searchForEntity) {
      await model.deleteOne({ _id: req.params.id });
      res.status(200).send("Entity has been deleted successfully");
    } else {
      res.status(404).send("Sorry, the entity does not exist");
    }
  } catch (error) {
    next(error);
  }
};
