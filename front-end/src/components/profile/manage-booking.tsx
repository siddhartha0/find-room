import { memo, useMemo } from "react";
import {
  useGetAllBookingQuery,
  useUpdateBookingMutation,
} from "../../state-management/api/booking-api";
import { useSelector } from "react-redux";
import { user } from "../../state-management/local/auth";
import { InfoText, LoaderSpinner } from "../../units";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorTypes } from "../../constant";
import toast from "react-hot-toast";

interface bookingTypes {
  user: {
    email: string;
    contact: string;
    userName: string;
    address: string;
    _id: string;
  };
  _id: string;
  paymentStatus: string;
  createdAt: string;
  checkInDate: string;
  room: {
    ownerEmail: string;
    hostelName: string;
    price: string;
    _id: string;
  };
}

export const ManageBookings = memo(() => {
  const { data, isLoading } = useGetAllBookingQuery({});

  const [udpateBooking, { isLoading: bookingUpdate }] =
    useUpdateBookingMutation();

  const userInfo = useSelector(user);
  const nav = useNavigate();

  const ownerHosteBookingDetails = useMemo(() => {
    if (data) {
      return data?.data.filter(
        (booking: bookingTypes) => booking.room.ownerEmail === userInfo?.email
      );
    }
  }, [data, userInfo?.email]);

  if (isLoading || bookingUpdate) return <LoaderSpinner />;

  const makeDecision = async (label: string, _id: string) => {
    const newUpdatedValue = ownerHosteBookingDetails.filter(
      (data: bookingTypes) => data._id === _id
    );
    const updatedData = {
      ...newUpdatedValue[0],
      status: label,
    };
    await udpateBooking({ id: _id, data: updatedData }).then((resp) => {
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

  if (ownerHosteBookingDetails && ownerHosteBookingDetails?.length < 0)
    return <div>No User Has Booked Yet.</div>;

  return (
    <div className="relative   rounded-md">
      <table className="table-auto  text-left">
        <thead className=" text-black">
          <tr>
            <td className="py-4 border text-center  p-4">User</td>
            <td className="py-4 border text-center  p-4">Contact</td>
            <td className="py-4 border text-center  p-4">Address</td>
            <td className="py-4 border text-center  p-4">Arrival Date</td>
            <td className="py-4 border text-center  p-4">Submitted Date</td>
            <td className="py-4 border text-center  p-4">Hostel</td>
            <td className="py-4 border text-center  p-4">Price</td>
            <td className="py-4 border text-center  p-4">Payment</td>
            <td className="py-4 border text-center  p-4">Action</td>
          </tr>
        </thead>

        {ownerHosteBookingDetails.map((detail: bookingTypes) => (
          <tbody className="text-black  " key={detail._id}>
            <tr className="py-4">
              <td className="py-4 border text-center   p-4">
                <InfoText title={detail.user.userName} />
                <InfoText title={detail.user.email} />
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.user.contact}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.user.address}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.checkInDate.toString().slice(0, 10)}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.createdAt.toString().slice(0, 10)}
              </td>
              <td
                className="py-4 border text-center cursor-pointer  p-4"
                onClick={() => nav(`/room-details/${detail.room._id}`)}
              >
                {detail.room.hostelName}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.room.price}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.paymentStatus}
              </td>
              <td className="py-4 border text-center  p-4">
                <div className="flex flex-col gap-4  ">
                  <button
                    type="button"
                    className="text-sm bg-love px-3 py-2 rounded-md text-other-white-100 font-semibold hover:animate-glow"
                    onClick={() => makeDecision("cancelled", detail._id)}
                  >
                    Reject
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
                    onClick={() => makeDecision("confirmed", detail._id)}
                  >
                    Accept
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
});
