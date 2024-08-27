import express from "express";
import { createUser, logIn } from "../controller/auth.controller";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", logIn);
export default router;
