import { Server } from "socket.io";
import { SendOwnerNotification } from "./OwnerNotification";

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

export default io;
