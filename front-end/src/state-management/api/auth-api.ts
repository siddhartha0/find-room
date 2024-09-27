import { Auth_URL } from "../../constant";
import { MainApi } from "./ApiGateway";

const AuthApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `${Auth_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${Auth_URL}/verify-otp`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("signuptoken") as string
          )}`,
        },
      }),
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: `${Auth_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation, useVerifyOTPMutation } =
  AuthApi;
