import React, { useState } from "react";
import {
  Button,
  HeaderInfoText,
  InfoText,
  InputField,
  LoaderSpinner,
  MediumInfoText,
} from "../../../../units";
import { useSelector } from "react-redux";
import { user } from "../../../../state-management/local/auth";
import { useBookHostelMutation } from "../../../../state-management/api/booking-api";
import toast, { Toaster } from "react-hot-toast";
import { errorTypes } from "../../../../constant";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageSquare } from "react-feather";
import { useGetOTPMutation } from "../../../../state-management/api/otp-api";

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
  const [localInputFieldValue, setLocalinputFieldValue] = useState({
    dateValue: "",
    otp: "",
    people: 0,
    otpLayout: false,
  });

  const userInfo = useSelector(user);

  const [bookHostel, { isLoading: bookingLoading }] = useBookHostelMutation();
  const [getOtp, { isLoading: optLoading }] = useGetOTPMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setLocalinputFieldValue({
      ...localInputFieldValue,
      [e.target.name]: value,
    });
  };

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
      checkInDate: localInputFieldValue.dateValue,
      otp: localInputFieldValue.otp,
      people: localInputFieldValue.people,
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

  const sendOtp = async () => {
    const userData = {
      userName: userInfo?.name ?? userInfo?.userName,
      address: userInfo?.address,
      email: userInfo?.email,
      contact: userInfo?.contact,
      role: userInfo?.role,
      _id: userInfo?._id,
    };

    await getOtp(userData).then((data) => {
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
        toast.success(data.data.msg);
        localStorage.setItem("booking-token", JSON.stringify(data.data.token));
        setLocalinputFieldValue({
          ...localInputFieldValue,
          otpLayout: true,
        });
      }
    });
  };

  if (localInputFieldValue.otpLayout) {
    return (
      <main className="flex flex-col gap-8 place-items-center p-8">
        <Toaster />
        {bookingLoading && <LoaderSpinner />}
        <MediumInfoText title="Verify OTP" className="uppercase" />
        <form onSubmit={bookRoom} className="flex flex-col gap-10 ">
          <div>
            <InputField
              iconname={MessageSquare}
              inputType="text"
              name="otp"
              inputValue={localInputFieldValue.otp}
              onChange={handleChange}
              placeholder="OTP...."
              required
            />
          </div>
          <Button type="submit">Verify OTP</Button>
        </form>
      </main>
    );
  }

  if (!localInputFieldValue.otpLayout)
    return (
      <main className="flex flex-col gap-5 bg-card-bg-brand p-6 rounded-lg">
        <Toaster />
        {optLoading && <LoaderSpinner />}
        <div className="flex place-items-end">
          <HeaderInfoText title={data.price} />
          <InfoText title={`/ ${data.frequency}`} />
        </div>
        <section className="flex flex-col gap-3">
          <div className="flex place-items-center gap-4">
            <InfoText title="Available Seat :" />
            <InfoText title="4" />
          </div>

          <InfoText title="Check-in" />

          <InputField
            inputType="date"
            name="dateValue"
            inputValue={localInputFieldValue.dateValue}
            onChange={handleChange}
          />
          <InfoText title="Total people" />
          <InputField
            inputType="number"
            name="people"
            inputValue={localInputFieldValue.people}
            onChange={handleChange}
          />
        </section>
        <Button onClick={sendOtp}>Verify</Button>
      </main>
    );
});
