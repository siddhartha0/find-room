import React, { useMemo } from "react";
import { Columns, Mail, Map, Phone, User } from "react-feather";
import {
  BreadCrumbLayout,
  BreadCrumbs,
  Button,
  HeaderInfoText,
  IconWithText,
  LoaderSpinner,
  ShowImg,
} from "../../../../units";
import { BrandDetails, RoomBookingDetails } from "../../../";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHostelByIdQuery } from "../../../../state-management/api/hostel-api";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { user } from "../../../../state-management/local/auth";
import classnames from "classnames";
import { useGetBookingByIdQuery } from "../../../../state-management/api/booking-api";

interface bookingType {
  user: {
    _id: string;
  };
}

export const RoomDetailsLayout = React.memo(() => {
  const { id } = useParams();

  const { data, isLoading } = useGetHostelByIdQuery(id);
  const { data: bookingDetails, isLoading: bookingLoading } =
    useGetBookingByIdQuery(id);
  const userInfo = useSelector(user);

  const alreadyBooked = useMemo(() => {
    return bookingDetails?.data.filter(
      (details: bookingType) => details?.user._id === userInfo?._id
    );
  }, [bookingDetails?.data, userInfo?._id]);

  const nav = useNavigate();

  return (
    <main className="flex flex-col p-8 gap-4">
      <Toaster />

      <header>
        <BreadCrumbs>
          <BreadCrumbLayout path="/rooms" title="Rooms" />
          <BreadCrumbLayout path="" title="Rooms-Details" current={true} />
        </BreadCrumbs>
      </header>

      {isLoading || bookingLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="flex flex-col gap-8">
          <HeaderInfoText title={data?.data?.hostelName} />
          <div className="flex justify-around">
            <ShowImg img={data?.data.imgUrl} height="550px" width="850px" />
            <div className="flex flex-col gap-8 w-72">
              {data?.data.ownerEmail === userInfo?.email ? (
                <div className="flex flex-col gap-4">
                  <Button
                    className="w-[80%]"
                    onClick={() => nav(`/booking-details/${data?.data._id}`)}
                  >
                    Booking Details
                  </Button>

                  <Button
                    className="w-[80%]"
                    onClick={() => nav(`/edit-room/${data?.data._id}`)}
                  >
                    Edit Room
                  </Button>
                </div>
              ) : alreadyBooked && alreadyBooked.length > 0 ? (
                <Button onClick={() => nav("/profile/your-booking")}>
                  See Details
                </Button>
              ) : (
                <RoomBookingDetails
                  frequency={data?.data.frequency}
                  price={data?.data.price}
                  _id={data?.data._id}
                  contact={data?.data.contact}
                  email={data?.data.email}
                  hostelName={data?.data.hostelName}
                  imgUrl={data?.data.imgUrl}
                  location={data?.data.location}
                  peopleNumber={data?.data.peopleNumber}
                  title={data?.data.title}
                  totalbed={data?.data.totalbed}
                />
              )}
              <BrandDetails />
            </div>
          </div>
          <HeaderInfoText
            title={data?.data?.title}
            className={classnames("-mt-40", {
              "mt-0": data?.data.ownerEmail === userInfo?.email,
              "mt-4": alreadyBooked && alreadyBooked.length > 0,
            })}
          />
          <div className="flex gap-10 place-items-center">
            <IconWithText icon={Mail} text={`${data?.data.email}`} />

            <IconWithText icon={Phone} text={`${data?.data.contact}`} />
            <IconWithText icon={Map} text={`${data?.data.location}`} />

            <IconWithText
              icon={User}
              text={`${data?.data.peopleNumber} people`}
            />

            <IconWithText icon={Columns} text={`${data?.data.totalbed} bed`} />
          </div>
        </section>
      )}
    </main>
  );
});
