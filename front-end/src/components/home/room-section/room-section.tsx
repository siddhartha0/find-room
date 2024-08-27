import { Columns, Heart, User } from "react-feather";
import { RoomData } from "../../../constant";
import {
  Button,
  HeaderInfoText,
  Icon,
  IconWithText,
  InfoText,
  MediumInfoText,
  RoomCard,
  ShowImg,
} from "../../../units";
import { roomLeft, roomMiddle1, roomMiddle2, roomRight } from "../../../assets";
import { useNavigate } from "react-router-dom";

export const RoomSection = () => {
  const nav = useNavigate();

  return (
    <main id="rooms" className="flex flex-col gap-10 mt-8 p-8">
      <header className="flex justify-between">
        <HeaderInfoText title="Hostel rooms" />
        <Button className="w-44 bg-bg-secondary" onClick={() => nav("/rooms")}>
          View Al Rooms
        </Button>
      </header>

      <div className="flex place-items-center justify-center gap-6">
        <section className="bg-bg-secondary w-[65%] flex gap-4 justify-around ">
          {RoomData.map((room) => (
            <RoomCard key={room.id} className="bg-bg-brand ">
              <div className="relative group/love ">
                <img
                  src={room.imgUrl}
                  alt="room"
                  className="hover:animate-pulsing h-[320px] w-[380px] "
                />
                <Icon
                  name={Heart}
                  iconSize={60}
                  textColor="white"
                  className="invisible group-hover/love:visible active:animate-glow absolute  top-0 translate-x-40 translate-y-32 "
                />
              </div>
              <MediumInfoText className="" title={room.title} />
              <div className="flex justify-between">
                <section className="flex place-items-center gap-4">
                  <IconWithText
                    icon={User}
                    text={`${room.features.peopleNumber} sleeps`}
                  />
                </section>

                <section className="flex place-items-center gap-4">
                  <IconWithText
                    icon={Columns}
                    text={`${room.features.totalbed} beds`}
                  />
                </section>
              </div>

              <Button className="mt-2">See full Details</Button>
            </RoomCard>
          ))}
        </section>

        <div className="flex flex-col gap-8 bg-brand rounded-xl p-6 max-w-[30%] ">
          <HeaderInfoText
            title="Stay Longer, Save More"
            className="text-other-white-200 w-[60%]"
          />
          <MediumInfoText
            title="It's Simple: search, explore & contact!"
            className="text-other-white-100"
          />
          <div className="flex flex-col gap-4  border-l-2 border-other-white-100 p-4 ">
            <InfoText
              title="Find the best room that fits your budget & personality"
              className="text-other-white-100 animate-fadeindown"
            />
            <InfoText
              title="Save upto 30%. Connect with the best in the game"
              className="text-other-white-100 animate-fadeindown"
            />
          </div>

          <Button className="bg-other-white-100 rounded-lg w-[40%] text-black font-semibold">
            Choose Room
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-8 place-items-center">
        <HeaderInfoText title="Photos of our collection" />
        <section className="grid grid-cols-3 w-[85%] gap-8 m-auto p-8 ">
          <ShowImg img={roomLeft} height="450px" />
          <div className="flex  flex-col justify-around ">
            <ShowImg img={roomMiddle1} height="200px" />
            <ShowImg img={roomMiddle2} height="200px" />
          </div>
          <ShowImg img={roomRight} height="450px" />
        </section>
      </div>
    </main>
  );
};
