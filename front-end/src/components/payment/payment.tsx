import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useUpdateBookingMutation } from "../../state-management/api/booking-api";
import { usePayQuery } from "../../state-management/api/payment-api";
import { errorTypes } from "../../constant";
import toast from "react-hot-toast";

interface propTypes {
  user: {
    _id: string;
  };
  _id: string;
  paymentStatus: string;
  checkInDate: string;
  status: string;
  room: {
    ownerEmail: string;
    hostelName: string;
    email: string;
    contact: string;
    location: string;
    price: string;
    _id: string;
  };
}

export const Payment = (prop: propTypes) => {
  const { data } = usePayQuery(prop.room.price);

  const [udpateBooking] = useUpdateBookingMutation();

  const khalti = async () => {
    window.location.href = data.url;
    const updatedData = {
      ...prop,
      paymentStatus: "FullPayment",
    };
    await udpateBooking({ id: prop._id, data: updatedData }).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
        const error = resp.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error((error.data as errorTypes).message as string);
        }
        if ("error" in error) {
          toast.error("Server timed out. Please Try Again Later!!!");
        }
      }
      if (resp.data) {
        toast.success("Successfully updated!!");
      }
    });
  };
  return (
    <button
      type="submit"
      className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
      onClick={khalti}
    >
      Pay
    </button>
  );
};
