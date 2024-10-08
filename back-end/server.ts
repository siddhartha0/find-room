import express from "express";
import cors from "cors";
import Logger from "./middleware/Logger";
import {
  AuthRoute,
  BookingRoute,
  UserRoute,
  RoomRoute,
  CloudeRoute,
  Payment,
  otp,
} from "./routes/";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const uri = process.env.MONGO_DB_URI ?? "";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to city-hostel server</h1>`);
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/book", BookingRoute);
app.use("/room", RoomRoute);
app.use("/otp", otp);
app.use("/cloudinary", CloudeRoute);
app.use("/payment", Payment);

const io = new Server({
  cors: {
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("Send Owner Notification", () => {
    console.log(socket.data);
  });
});

io.listen(3000);

app.use(Logger);

app.listen(3333, () => {
  console.log("Server has started");
});
