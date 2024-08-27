import mongoose from "mongoose";
import { user } from "../types";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});
const UserModel = mongoose.model<user & mongoose.Document>("User", userSchema);

export default UserModel;
