import { memo, useMemo } from "react";
import {
  useDeleteBookingMutation,
  useGetAllBookingQuery,
} from "../../state-management/api/booking-api";
import { useSelector } from "react-redux";
import { user } from "../../state-management/local/auth";
import { LoaderSpinner } from "../../units";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast, { Toaster } from "react-hot-toast";
import { errorTypes } from "../../constant";

interface bookingTypes {
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

export const YourBooking = memo(() => {
  const { data, isLoading } = useGetAllBookingQuery({});

  const userInfo = useSelector(user);
  const nav = useNavigate();

  const [deleteBooking, { isLoading: deleteLoading }] =
    useDeleteBookingMutation();

  const yourBookingDetails = useMemo(() => {
    if (data) {
      return data?.data.filter(
        (booking: bookingTypes) => booking.user._id === userInfo?._id
      );
    }
  }, [data, userInfo?._id]);

  const cancel = async (id: string) => {
    await deleteBooking(id).then((resp) => {
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

  if (isLoading || deleteLoading) return <LoaderSpinner />;

  if (yourBookingDetails && yourBookingDetails?.length < 0)
    return <div>You have not book any hostel yet.</div>;

  return (
    <div className="relative   rounded-md">
      <Toaster />
      <table className="table-auto  text-left">
        <thead className=" text-black">
          <tr>
            <td className="py-4 border text-center  p-4">Hostel</td>
            <td className="py-4 border text-center  p-4">Email</td>
            <td className="py-4 border text-center  p-4">Contact</td>
            <td className="py-4 border text-center  p-4">Address</td>
            <td className="py-4 border text-center  p-4">Price</td>
            <td className="py-4 border text-center  p-4">Booked Date</td>
            <td className="py-4 border text-center  p-4">Payment</td>
            <td className="py-4 border text-center  p-4">Status</td>
            <td className="py-4 border text-center  p-4">Action</td>
          </tr>
        </thead>

        {yourBookingDetails.map((detail: bookingTypes) => (
          <tbody className="text-black  " key={detail._id}>
            <tr className="py-4">
              <td
                className="py-4 border text-center   p-4"
                onClick={() => nav(`/room-details/${detail.room._id}`)}
              >
                {detail.room.hostelName}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.room.ownerEmail}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.room.contact}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.room.location}
              </td>
              <td className="py-4 border text-center  p-4">
                {detail.room.price}
              </td>
              <td className="py-4 border text-center cursor-pointer  p-4">
                {detail.checkInDate.toString().slice(0, 10)}
              </td>

              <td className="py-4 border text-center  p-4">
                {detail.paymentStatus}
              </td>
              <td className="py-4 border text-center cursor-pointer  p-4">
                {detail.status}
              </td>

              {detail.status !== "cancelled" ? (
                <td className="py-4 border text-center  p-4">
                  <div className="flex flex-col gap-4  ">
                    <button
                      type="button"
                      className="text-sm bg-love px-3 py-2 rounded-md text-other-white-100 font-semibold hover:animate-glow"
                      onClick={() => cancel(detail._id)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
                    >
                      Pay
                    </button>
                  </div>
                </td>
              ) : (
                <td className="py-4 border text-center cursor-pointer  p-4">
                  No Action Available
                </td>
              )}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
});
