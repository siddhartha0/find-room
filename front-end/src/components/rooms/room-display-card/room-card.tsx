import React from "react";
import { Columns, MapPin, User } from "react-feather";
import {
  Button,
  Icon,
  InfoText,
  MediumInfoText,
  NavigateLink,
  ShowImg,
} from "../../../units";
import { roomdispalyCardPropTypes } from "../../../constant";
import { useSelector } from "react-redux";
import { user } from "../../../state-management/local/auth";
import { useNavigate } from "react-router-dom";

export const RoomDisplayCard = React.memo((data: roomdispalyCardPropTypes) => {
  const userInfo = useSelector(user);

  const nav = useNavigate();

  return (
    <main className="flex bg-[#FBFBFB] gap-8 p-5 justify-between rounded-lg ">
      <ShowImg img={data.imgUrl} height="180px" width="30%" />

      <section
        className="flex flex-col justify-around place-items-start w-[50%]"
        id="middle-info-section"
      >
        <div className="flex flex-col gap-3" id="hostel-name-and-location">
          <NavigateLink
            title={data.hostelName}
            path={`/room-details/${data._id}`}
            className="cursor-pointer text-xl hover:animate-glow"
          />
          <section className="flex place-items-center gap-3">
            <Icon name={MapPin} />
            <InfoText title={`${data.location} `} />
          </section>
        </div>

        <InfoText title={data.title} />

        <div className="flex justify-between gap-6" id="room-info">
          <section className="flex place-items-center gap-4">
            <Icon name={User} />
            <InfoText title={`${data.peopleNumber} people`} />
          </section>

          <section className="flex place-items-center gap-4">
            <Icon name={Columns} />
            <InfoText title={`${data.totalbed} beds`} />
          </section>
        </div>
      </section>

      <section className="flex flex-col justify-around" id="price-button">
        <MediumInfoText title={`Rs. ${data.price}`} />
        {userInfo?.email === data.ownerEmail ? (
          <Button
            className="w-[100%] p-2 rounded-xl"
            onClick={() => nav(`/booking-details/${data?._id}`)}
          >
            See Details
          </Button>
        ) : (
          <Button className="w-[100%] p-2 rounded-xl"> Book Now</Button>
        )}
      </section>
    </main>
  );
});
