import { PAYMENT_URL } from "../../constant";
import { MainApi } from "./ApiGateway";

const PaymenApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    pay: builder.query({
      query: (id) => ({
        url: `${PAYMENT_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),
  }),
});

export const { usePayQuery } = PaymenApi;
