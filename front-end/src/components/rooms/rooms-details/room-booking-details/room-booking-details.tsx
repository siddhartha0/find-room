import React, { useState } from "react";
import {
  Button,
  HeaderInfoText,
  InfoText,
  InputField,
} from "../../../../units";
import { useSelector } from "react-redux";
import { user } from "../../../../state-management/local/auth";
import { useBookHostelMutation } from "../../../../state-management/api/booking-api";
import toast, { Toaster } from "react-hot-toast";
import { errorTypes } from "../../../../constant";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface bookingPropTypes {
  price: string;
  frequency: string;
  contact: number;
  email: string;
  hostelName: string;
  imgUrl: string;
  location: string;
  peopleNumber: number;
  title: string;
  totalbed: number;
  _id: string;
}

export const RoomBookingDetails = React.memo((data: bookingPropTypes) => {
  const [dateValue, setValue] = useState("");

  const userInfo = useSelector(user);

  const [bookHostel] = useBookHostelMutation();

  const bookRoom = async () => {
    const userDetails = {
      userName: userInfo?.name ?? userInfo?.userName,
      address: userInfo?.address,
      email: userInfo?.email,
      contact: userInfo?.contact,
      role: userInfo?.role,
      _id: userInfo?._id,
    };

    const roomDetails = {
      frequency: data.frequency,
      price: data.price,
      _id: data._id,
      contact: data.contact,
      email: data.email,
      hostelName: data.hostelName,
      imgUrl: data.imgUrl,
      location: data.location,
      peopleNumber: data.peopleNumber,
      title: data.title,
      totalbed: data.totalbed,
    };

    const bookingDetails = {
      user: userDetails,
      room: roomDetails,
      checkInDate: dateValue,
    };

    await bookHostel(bookingDetails).then((data) => {
      if (data.error) {
        console.log(data.error);
        const error = data.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error((error.data as errorTypes).message as string);
        }

        if ("error" in error) {
          toast.error("Server timed out. Please Try Again Later!!!");
        }
      }

      if (data.data) {
        toast.success(
          "Thank you for booking with us. You will be updated soon!!"
        );
      }
    });
  };

  return (
    <main className="flex flex-col gap-5 bg-card-bg-brand p-6 rounded-lg">
      <Toaster />
      <div className="flex place-items-end">
        <HeaderInfoText title={data.price} />
        <InfoText title={`/ ${data.frequency}`} />
      </div>
      <section className="flex flex-col gap-3">
        <InfoText title="Check-in" />
        <InputField
          inputType="date"
          inputValue={dateValue}
          onChange={(e) => setValue(e.target.value)}
        />
      </section>
      <Button onClick={bookRoom}>Book Now</Button>
    </main>
  );
});
