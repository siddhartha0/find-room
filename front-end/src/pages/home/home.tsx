import React from "react";
import {
  AboutUs,
  Footer,
  HomeSection,
  RoomSection,
  AuthLayout,
} from "../../components";
import classNames from "classnames";
import { Icon, Modal } from "../../units";
import { X } from "react-feather";
import { useOutsideClick } from "../../hooks";
import { useAuthContext } from "../../hooks";

export const Home = React.memo(() => {
  const bookingContext = useAuthContext();

  const bookingRef = useOutsideClick(() =>
    bookingContext?.setauthModalStatus({
      ...bookingContext.authModalStatus,
      loginMenu: false,
    })
  );

  return (
    <div>
      <main
        className={classNames("flex flex-col", {
          "blur-2xl  fixed": bookingContext?.authModalStatus.loginMenu,
        })}
      >
        <HomeSection />
        <RoomSection />
        <AboutUs />
        <Footer />
      </main>

      {bookingContext?.authModalStatus.loginMenu && (
        <Modal
          classname="bg-other-white-100 p-3 animate-glow z-50 "
          ref={bookingRef}
        >
          <Icon
            name={X}
            className="absolute right-2"
            textColor="#ADADAD"
            onClick={() =>
              bookingContext?.setauthModalStatus({
                ...bookingContext.authModalStatus,
                loginMenu: false,
              })
            }
          />
          <AuthLayout />
        </Modal>
      )}
    </div>
  );
});
