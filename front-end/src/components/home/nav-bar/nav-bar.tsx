import React, { useState } from "react";
import { companyLogo } from "../../../assets";
import { HeaderPath } from "../../../constant";
import { Button, Guider, Icon, InfoText } from "../../../units";
import { useAuthContext, useOutsideClick } from "../../../hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userToken } from "../../../state-management/local/auth";
import { LogOut, Menu, User } from "react-feather";

export const NavBar = React.memo(() => {
  const authContext = useAuthContext();

  const [dropDownProfileMenu, setDropDownProfileMenu] = useState(false);

  const dropDownMenuRef = useOutsideClick(() => setDropDownProfileMenu(false));

  const nav = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector(userToken);

  return (
    <main>
      <nav className="flex justify-between place-items-center bg-bg-brand p-4">
        <section id="left-side">
          <img
            src={companyLogo}
            alt="logo"
            width={70}
            onClick={() => nav("/")}
          />
        </section>

        <section
          id="middle-side"
          className="flex place-items-center justify-between w-[35%]"
        >
          {HeaderPath.map((header) => (
            <Guider
              path={header.path}
              title={header.title}
              key={header.id}
              className="hover:animate-glow active:underline"
            />
          ))}
        </section>

        {token ? (
          <section id="middle-side" className="flex relative  gap-10 ">
            <Icon name={Menu} onClick={() => setDropDownProfileMenu(true)} />
            {dropDownProfileMenu && (
              <section
                className="flex flex-col absolute right-0 top-10 z-10 bg-other-white-200 rounded-lg p-4 min-w-40 gap-8"
                ref={dropDownMenuRef}
              >
                <div
                  className="flex  gap-4  cursor-pointer"
                  onClick={() => {
                    nav("/profile");
                    setDropDownProfileMenu(false);
                  }}
                >
                  <Icon name={User} iconSize={22} />
                  <InfoText title="Profile" />
                </div>

                <div
                  className="flex gap-4  cursor-pointer "
                  onClick={() => {
                    dispatch(logOut());
                    setDropDownProfileMenu(false);
                  }}
                >
                  <Icon name={LogOut} iconSize={22} />
                  <InfoText title="Log out" />
                </div>
              </section>
            )}
          </section>
        ) : (
          <Button
            className="w-32"
            onClick={() =>
              authContext?.setauthModalStatus({
                ...authContext.authModalStatus,
                loginMenu: true,
              })
            }
          >
            Log In
          </Button>
        )}
      </nav>

      <Outlet />
    </main>
  );
});
