import { useGetAllBookingQuery } from "../../state-management/api/booking-api";

export const ManageBookings = () => {
  const { data, isLoading } = useGetAllBookingQuery({});

  console.log(data);

  return <div></div>;
};
