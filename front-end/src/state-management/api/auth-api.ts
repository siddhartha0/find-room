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

    logIn: builder.mutation({
      query: (data) => ({
        url: `${Auth_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation } = AuthApi;
