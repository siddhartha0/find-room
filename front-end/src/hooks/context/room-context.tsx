import { createContext, useContext, useState } from "react";
import { roomdispalyCardPropTypes } from "../../constant";

interface roomcontextPropTypes {
  roomDetails: roomdispalyCardPropTypes | null;
  setRoomDetails: React.Dispatch<
    React.SetStateAction<roomdispalyCardPropTypes | null>
  >;
}

const roomContext = createContext<roomcontextPropTypes | null>(null);

export const RoomContent = ({ children }: { children: React.ReactNode }) => {
  const [roomDetails, setRoomDetails] =
    useState<roomdispalyCardPropTypes | null>({
      _id: "",
      title: "",
      hostelName: "",
      imgUrl: "",
      location: "",
      price: "",
      frequency: "",
      peopleNumber: 0,
      totalbed: 0,
    });

  return (
    <roomContext.Provider value={{ roomDetails, setRoomDetails }}>
      {children}
    </roomContext.Provider>
  );
};

export const useRoomContent = () => {
  const context = useContext(roomContext);
  return context;
};
