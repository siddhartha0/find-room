import toast, { Toaster } from "react-hot-toast";
import { Button, InputField, LoaderSpinner, MediumInfoText } from "../../units";
import { MessageSquare } from "react-feather";
import { useState } from "react";
import { useVerifyOTPMutation } from "../../state-management/api/auth-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorTypes } from "../../constant";
import { useAuthContext } from "../../hooks";

export const Otp = () => {
  const [verifyOtpApi, { isLoading: optLoading }] = useVerifyOTPMutation();
  const authContext = useAuthContext();
  const [otp, setOtp] = useState("");
  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendData = {
      otp: otp,
    };

    await verifyOtpApi(sendData).then((data) => {
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
        toast.success(data.data.msg);
        authContext?.setauthModalStatus({
          ...authContext.authModalStatus,
          otpSection: false,
          haveAccount: true,
        });
      }
    });
  };

  return (
    <main className="flex flex-col gap-8 place-items-center p-8">
      <Toaster />
      {optLoading && <LoaderSpinner />}
      <MediumInfoText title="Verify OTP" className="uppercase" />
      <form onSubmit={verifyOtp} className="flex flex-col gap-10 ">
        <div>
          <InputField
            iconname={MessageSquare}
            inputType="text"
            inputValue={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP...."
            required
          />
        </div>
        <Button type="submit">Verify OTP</Button>
      </form>
    </main>
  );
};
