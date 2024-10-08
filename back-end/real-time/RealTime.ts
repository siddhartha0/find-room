import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

export const app = express();

export const serverInstance = createServer(app);

export const io = new Server(serverInstance, {
  cors: {
    origin: ["http://localhost:5173", "https://city-hostel-zeta.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connect to Socket server", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server", socket.id);
  });
});
