import { Booking_URL } from "../../constant/url/url";
import { MainApi } from "./ApiGateway";

const BookingApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    bookHostel: builder.mutation({
      query: (data) => ({
        url: `${Booking_URL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    getAllBooking: builder.query({
      query: () => ({
        url: `${Booking_URL}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    getBookingById: builder.query({
      query: (id) => ({
        url: `${Booking_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    getBookingByUserId: builder.query({
      query: (id) => ({
        url: `${Booking_URL}/byUser/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    updateBooking: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "PUT",
        body: body,
        url: `${Booking_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${Booking_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") as string
          )}`,
        },
      }),
    }),
  }),
});

export const {
  useBookHostelMutation,
  useDeleteBookingMutation,
  useGetAllBookingQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} = BookingApi;
