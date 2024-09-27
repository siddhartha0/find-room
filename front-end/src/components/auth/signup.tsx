import React, { useState } from "react";
import { Button, InfoText, MediumInfoText } from "../../units";
import { Lock, Mail, Navigation, Phone, User } from "react-feather";
import { InputField } from "../../units/input-field/input-field";
import { errorTypes, role } from "../../constant";
import { useSignUpMutation } from "../../state-management/api/auth-api";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../units/loader/loader-spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAuthContext } from "../../hooks";

export const SignUp = React.memo(() => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    contact: "",
    address: "",
    email: "",
    password: "",
    role: "",
  });

  const authContext = useAuthContext();

  const [create, { isLoading }] = useSignUpMutation();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await create(userDetails).then((data) => {
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
        console.log(data.data);
        toast.success(data.data.msg);
        localStorage.setItem("signuptoken", JSON.stringify(data?.data?.token));
        authContext?.setauthModalStatus({
          ...authContext.authModalStatus,
          otpSection: true,
        });
      }
    });
  };

  return (
    <main className="flex flex-col gap-4 place-items-center p-8">
      <Toaster />
      {isLoading && <LoaderSpinner />}

      <MediumInfoText title="Create Account" className="uppercase" />

      <form
        onSubmit={createAccount}
        className="grid grid-cols-2 gap-5 p-4 rounded-xl w-[110%]  justify-between"
      >
        <div>
          <InputField
            iconname={User}
            inputName="userName"
            inputType="text"
            inputValue={userDetails.userName}
            onChange={handleChange}
            placeholder="username..."
            required
          />
        </div>

        <div>
          <InputField
            iconname={Mail}
            inputName="email"
            inputType="text"
            inputValue={userDetails.email}
            onChange={handleChange}
            placeholder="email..."
            required
          />
        </div>

        <div>
          <InputField
            iconname={Phone}
            inputName="contact"
            inputType="text"
            inputValue={userDetails.contact}
            onChange={handleChange}
            placeholder="contact..."
            required
          />
        </div>

        <div>
          <InputField
            iconname={Navigation}
            inputName="address"
            inputType="text"
            inputValue={userDetails.address}
            onChange={handleChange}
            placeholder="address..."
            required
          />
        </div>
        <div>
          <div className="flex rounded-lg p-4   bg-input-bg justify-between">
            <select
              name="role"
              value={userDetails.role}
              className="bg-input-bg w-[100%] outline-none"
              onChange={handleChange}
              required
            >
              <option>Select a value</option>
              <option value="owner">{role.OWNER}</option>
              <option value="student">{role.STUDENT}</option>
            </select>
          </div>
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
        <Button className="grid col-span-2 w-full mt-2" type="submit">
          Sign Up
        </Button>
      </form>

      <hr className="bg-[#ADADAD] w-full bg-opacity-[.5] mt-4" />
      <div className="flex place-items-center gap-2">
        <InfoText title="Already Have An Account ?" />
        <InfoText
          title="Sign In"
          className="hover:animate-glow cursor-pointer"
          onClick={() =>
            authContext?.setauthModalStatus({
              ...authContext.authModalStatus,
              haveAccount: true,
              otpSection: false,
            })
          }
        />
      </div>
    </main>
  );
});
