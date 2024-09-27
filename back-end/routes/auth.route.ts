import express from "express";
import { createUser, logIn, verifyOTP } from "../controller/auth.controller";
import { isAuthorized } from "../middleware/isValidUser";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", logIn);
router.post("/verify-otp", isAuthorized, verifyOTP);
export default router;
