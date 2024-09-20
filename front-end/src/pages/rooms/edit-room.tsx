import { memo } from "react";
import { EditRoom } from "../../components";
import { useParams } from "react-router-dom";
import { useGetHostelByIdQuery } from "../../state-management/api/hostel-api";

export const EditRoomPage = memo(() => {
  const { id } = useParams();

  const { data, isLoading } = useGetHostelByIdQuery(id);

  //
  return (
    <EditRoom
      contact={data?.data?.contact}
      email={data?.data?.email}
      ownerEmail={data?.data?.ownerEmail}
      frequency={data?.data?.frequency}
      hostelName={data?.data?.hostelName}
      imgUrl={data?.data?.imgUrl}
      location={data?.data?.location}
      peopleNumber={data?.data?.peopleNumber}
      price={data?.data?.price}
      title={data?.data?.title}
      totalbed={data?.data?.totalbed}
      loadData={isLoading}
      id={id}
    />
  );
});
