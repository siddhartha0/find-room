import { NextFunction, Request, Response } from "express";
import { GenerateOtp, generateToken, sendMail } from "../utils";
import CustomError from "../middleware/CusomError";

export const SendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const otp = GenerateOtp();
    const payload = {
      userName: data.userName,
      role: data.role,
      email: data.email,
      contact: data.contact,
      address: data.address,
      _id: data._id,
      otp: otp.toString(),
    };

    const emailBody = ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #4CAF50; text-align: center;">Your OTP Code</h2>
  <p style="font-size: 16px; color: #333;">Hi <strong>${data.userName}</strong>,</p>
  <p style="font-size: 16px; color: #333;">Use the following OTP (One Time Password) to complete your booking process.</p>
  
  <div style="text-align: center; margin: 20px 0;">
    <p style="font-size: 24px; font-weight: bold; color: #000;"> ${otp}</p>
  </div>
  
  <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email or contact support.</p>
  <p style="font-size: 16px; color: #333;">Best Regards,</p>
  <p style="font-size: 16px; color: #333;"><strong>Girls Hostel</strong></p>
  <hr style="border-top: 1px solid #ddd; margin-top: 20px;">
  <p style="font-size: 12px; text-align: center; color: #999;">&copy; 2024 Girl Hostel. All rights reserved.</p>
</div>
`;
    const token = generateToken(payload);
    await sendMail(data.email, "Booking Verfication", emailBody);
    return res.status(200).json({
      msg: "OTP has been sent to your mail!!!",
      token: token,
    });
  } catch (error) {
    return CustomError.tryCatchError(next);
  }
};
