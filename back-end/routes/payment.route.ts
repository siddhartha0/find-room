import express from "express";
import { Payment } from "../controller/payment";

const router = express.Router();

router.get("/:id", Payment);

export default router;
