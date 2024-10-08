import { Server } from "socket.io";
import { SendOwnerNotification } from "./OwnerNotification";

const io = new Server({});

io.on("connection", (socket) => {
  console.log(socket);
  socket.to("asdf").emit("", SendOwnerNotification);
});

export default io;
