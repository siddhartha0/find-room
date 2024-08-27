import { user } from "./auth";
import { room } from "./room";

export interface booking {
  user: user;
  room: room;
  checkInDate: Date;
  checkOutDate: Date;
  status: string;
}
