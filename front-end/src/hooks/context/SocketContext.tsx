import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

export const SocketContent = createContext<SocketContextType>({
  socket: null,
});

export const SocketContext = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3333/", {
      withCredentials: true,
    });
    setSocket(socket);
  }, []);

  return (
    <SocketContent.Provider value={{ socket }}>
      {children}
    </SocketContent.Provider>
  );
};

export const UseSocketContext = () => {
  const socketContext = useContext(SocketContent);

  if (!socketContext) {
    throw new Error("Must be wrapped");
  }
  return socketContext.socket;
};
