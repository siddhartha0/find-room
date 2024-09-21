import express from "express";
import { isAuthorized, isOwner } from "../middleware/isValidUser";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingByRoomId,
  getBookingByUserId,
  updateBooking,
} from "../controller/booking.controller";

const router = express();

router.post("/", isAuthorized, createBooking);
router.get("/", isAuthorized, getAllBooking);

router.get("/byUser/:id", isAuthorized, getBookingByUserId);

router
  .route("/:id")
  .delete(isAuthorized, deleteBooking)
  .get(isOwner, getBookingByRoomId)
  .put(isAuthorized, updateBooking);

export default router;
