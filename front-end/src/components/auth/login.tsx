import React, { useState } from "react";
import { Button, InfoText, MediumInfoText } from "../../units";
import { Lock, Mail } from "react-feather";
import { InputField } from "../../units/input-field/input-field";
import { authPropTypes } from "./layout";
import { useDispatch } from "react-redux";
import { useLogInMutation } from "../../state-management/api/auth-api";
import { logIn } from "../../state-management/local/auth";
import { useAuthContext } from "../../hooks";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../units/loader/loader-spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorTypes } from "../../constant";

export const LogIn = React.memo(({ setHaveAccount }: authPropTypes) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const authContext = useAuthContext();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLogInMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const loginFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(userDetails).then((data) => {
      if (data.error) {
        const error = data.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error((error.data as errorTypes).message as string);
        }
        if ("error" in error) {
          toast.error("Server timed out. Please Try Again Later!!!");
        }
      }

      if (data.data) {
        const toStore = {
          token: data?.data?.token,
          user: data?.data?.user ?? null,
        };
        dispatch(logIn(toStore));
        authContext?.setauthModalStatus(false);
      }
    });
  };

  return (
    <main className="flex flex-col gap-4 place-items-center p-8">
      <Toaster />
      {isLoading && <LoaderSpinner />}

      <MediumInfoText title="Sign In" className="uppercase" />

      <form
        onSubmit={loginFunc}
        className="flex flex-col gap-5 p-4 rounded-xl w-[110%]  justify-between"
      >
        <div>
          <InputField
            iconname={Mail}
            inputName="email"
            inputType="text"
            inputValue={userDetails.email}
            onChange={handleChange}
            placeholder="username..."
            required
          />
        </div>
        <div>
          <InputField
            iconname={Lock}
            inputName="password"
            inputType="password"
            inputValue={userDetails.password}
            onChange={handleChange}
            placeholder="password..."
            required
          />
        </div>
        <Button className="w-full mt-2" type="submit">
          Log In
        </Button>
      </form>

      <hr className="bg-[#ADADAD] w-full bg-opacity-[.5] mt-4" />
      <div className="flex place-items-center gap-2">
        <InfoText title="New Here ?" />
        <InfoText
          title="Sign up"
          className="hover:animate-glow cursor-pointer"
          onClick={() => setHaveAccount(false)}
        />
      </div>
    </main>
  );
});
