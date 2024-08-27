import { Briefcase, MapPin, MoreHorizontal, Wifi } from "react-feather";
import {
  Button,
  HeaderInfoText,
  Icon,
  InfoText,
  ShowImg,
} from "../../../units";
import { about1 } from "../../../assets";

export const AboutUs = () => {
  return (
    <main id="about" className="flex flex-col gap-5  mt-4 bg-bg-secondary p-4">
      <section className="flex justify-between">
        <div className="flex flex-col gap-10 m-auto w-[35%] ">
          <header className="flex flex-col gap-4">
            <HeaderInfoText title="We have everything you need" />
            <InfoText title="Finest collection of hostel with some of the features listed: " />
          </header>
          <section className="grid grid-cols-2 mt-2 gap-8 w-[80%]">
            <div className="flex place-items-center gap-6 ">
              <Icon name={Wifi} iconSize={50} />
              <InfoText title="Free available high speed wifi" />
            </div>

            <div className="flex place-items-center gap-6">
              <Icon name={MapPin} iconSize={50} />
              <InfoText title="Spread across the city" />
            </div>
            <div className="flex place-items-center gap-6">
              <Icon name={Briefcase} iconSize={50} />
              <InfoText title="Free Storage of luggage" />
            </div>

            <div className="flex place-items-center gap-6">
              <Icon name={MoreHorizontal} iconSize={50} />
              <InfoText title="Many More" />
            </div>
          </section>
          <Button>Explore More</Button>
        </div>
        <div className="w-[50%]">
          <ShowImg img={about1} height="450px" />
        </div>
      </section>
      <section></section>
    </main>
  );
};
