import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user-model";
import bcrypt from "bcrypt";
import { GenerateOtp, generateToken, sendMail } from "../utils";
import CustomError from "../middleware/CusomError";
import jwt from "jsonwebtoken";
import { user } from "../types";

interface customRequest extends Request {
  user?: user;
}

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

        const otpToSend = GenerateOtp().toString();

        const emailBody = ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50; text-align: center;">Your OTP Code</h2>
          <p style="font-size: 16px; color: #333;">Hi <strong>${userDetails.userName}</strong>,</p>
          <p style="font-size: 16px; color: #333;">Use the following OTP (One Time Password) to complete your sign-in process. This OTP is valid for the next 10 minutes.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #000;"> ${otpToSend}</p>
          </div>
          
          <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email or contact support.</p>
          <p style="font-size: 16px; color: #333;">Best Regards,</p>
          <p style="font-size: 16px; color: #333;"><strong>Girls Hostel</strong></p>
          <hr style="border-top: 1px solid #ddd; margin-top: 20px;">
          <p style="font-size: 12px; text-align: center; color: #999;">&copy; 2024 Girl Hostel. All rights reserved.</p>
        </div>
        `;

        await sendMail(userDetails.email, "Email Verification", emailBody);

        const createuser = new UserModel(newData);
        const user = await createuser.save();

        const payload = {
          userName: userDetails.userName,
          email: userDetails.email,
          contact: userDetails.contact,
          address: userDetails.address,
          password: userDetails.password,
          role: userDetails.role,
          _id: user._id,
          otp: otpToSend,
        };

        const token = generateToken(payload);

        res
          .status(200)
          .json({ msg: "Otp has been sent to you mail!!!", token: token });
      } else return CustomError.entityPropsMissingError(next);
    }
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as customRequest;
    const otp = req.body;

    if (!otp) {
      return CustomError.entityPropsMissingError(next);
    }
    if (otp.otp === user?.otp) {
      const userExists = await UserModel.findById(user?._id);
      if (!userExists) {
        return CustomError.searchEntityMissingError(next);
      }

      const updateValue = {
        userName: userExists.userName,
        email: userExists.email,
        contact: userExists.contact,
        address: userExists.address,
        password: userExists.password,
        role: userExists.role,
        isVerify: true,
      };

      await UserModel.findByIdAndUpdate(user?._id, updateValue);

      return res.status(200).json({ msg: "verified!!!" });
    }
    return CustomError.invalidField(next);
  } catch (error) {
    console.log(error);
    return CustomError.tryCatchError(next);
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

      if (!userExists) {
        return CustomError.searchEntityMissingError(next);
      }
      const hashedPwd = await bcrypt.compare(
        userDetails.password,
        userExists?.password ?? ""
      );
      if (!hashedPwd) {
        return CustomError.invalidField(next);
      }

      if (!userExists.isVerify) {
        return CustomError.notVerify(next);
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
