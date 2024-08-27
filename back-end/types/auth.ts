import { ObjectId } from "mongoose";

export interface user {
  userName: string;
  email: string;
  contact: string;
  address: string;
  password: string;
  role: string;
  _id: ObjectId;
}

export interface updateUser {
  userName?: string;
  email?: string;
  contact?: string;
  address?: string;
  password?: string;
  role?: string;
}
