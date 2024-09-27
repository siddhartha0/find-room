import { Button, HeaderInfoText, InfoText } from "../../../units";
import { hero } from "../../../assets/";
import { useAuthContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { userToken } from "../../../state-management/local/auth";
import { useNavigate } from "react-router-dom";

export const HomeSection = () => {
  const bookingContext = useAuthContext();
  const nav = useNavigate();

  const token = useSelector(userToken);

  return (
    <main className="flex flex-col animate-fadeindown " id="home">
      <section className="flex justify-between ">
        <div
          className="flex flex-col  bg-bg-secondary rounded-lg m-auto w-[40%] p-10 gap-4"
          id="left-side"
        >
          <HeaderInfoText title="Girls Hostel - Far From Home Don't worry. It feels home here !" />
          <InfoText title="Amazing Collection of hostel. Find the best collection of hostel where you would have blast of fun & learning. " />
          <Button
            className="mt-5"
            onClick={() => {
              if (!token) {
                bookingContext?.setauthModalStatus({
                  ...bookingContext.authModalStatus,
                  loginMenu: true,
                });
              } else {
                nav("/rooms");
              }
            }}
          >
            Book Now
          </Button>
        </div>

        <div id="right-side">
          <img src={hero} alt="hero" width={800} />
        </div>
      </section>
    </main>
  );
};
