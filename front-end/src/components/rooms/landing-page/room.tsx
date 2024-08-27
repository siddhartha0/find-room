import React, { useMemo, useState } from "react";
import { Search } from "react-feather";
import {
  BreadCrumbLayout,
  BreadCrumbs,
  Button,
  HeaderInfoText,
  InputField,
  Pagination,
  LoaderSpinner,
} from "../../../units";
import { RoomDisplayCard, FilterSection } from "../../";
import { roomdispalyCardPropTypes } from "../../../constant";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../state-management/local/auth";
import { useGetAllHostelQuery } from "../../../state-management/api/hostel-api";
import { Toaster } from "react-hot-toast";

export const RoomsLandingPage = React.memo(() => {
  const nav = useNavigate();
  const userDetails = useSelector(user);

  const { data: hostelData, isLoading } = useGetAllHostelQuery({});

  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sliderValue, setSlidervalue] = useState(0);

  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(() => {
    let hostels = hostelData?.data;
    if (hostels) {
      if (filterValue) {
        hostels = hostels?.filter(
          (value: roomdispalyCardPropTypes) =>
            value?.hostelName
              ?.toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            value?.location?.toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      if (sliderValue) {
        hostels = hostels?.filter(
          (value: roomdispalyCardPropTypes) => +value?.price <= sliderValue
        );
      }

      if (searchValue) {
        hostels = hostels?.filter(
          (value: roomdispalyCardPropTypes) =>
            value?.hostelName
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            value?.location?.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }

    return hostels?.slice(indexOfFirstItem, indexOfLastItem);
  }, [
    filterValue,
    hostelData?.data,
    indexOfFirstItem,
    indexOfLastItem,
    searchValue,
    sliderValue,
  ]);

  const totalPages = Math.ceil(
    hostelData?.data ? hostelData?.data?.length / itemsPerPage : 0
  );

  const handleNavigationClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    direction: string
  ) => {
    event.preventDefault();

    const totalPages = Math.ceil(
      hostelData?.data ? hostelData?.data?.length / itemsPerPage : 0
    );

    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
    }
  };

  return (
    <main className="flex flex-col p-6 gap-6 ">
      <Toaster />
      <BreadCrumbs>
        <BreadCrumbLayout path="/rooms" title="Rooms" current={true} />
      </BreadCrumbs>

      <header className="flex justify-between">
        <HeaderInfoText title="Available Rooms" />
        {userDetails?.role === "owner" && (
          <Button className="w-52" onClick={() => nav("/add-room")}>
            Add Room
          </Button>
        )}
      </header>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="flex gap-8">
          <div>
            <FilterSection
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              sliderValue={sliderValue}
              setSliderValue={setSlidervalue}
            />
          </div>
          <div className="flex flex-col gap-6 flex-1 p-2">
            <section className="w-[60%]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <InputField
                  iconname={Search}
                  inputType="text"
                  placeholder="Search your result..."
                  inputValue={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
            </section>

            {hostelData && hostelData?.data?.length > 0 ? (
              <section className="flex flex-col gap-5">
                {currentItems.map(
                  (room: roomdispalyCardPropTypes, id: number) => (
                    <RoomDisplayCard
                      _id={room._id}
                      ownerEmail={room.ownerEmail}
                      peopleNumber={room.peopleNumber}
                      totalbed={room.totalbed}
                      hostelName={room.hostelName}
                      imgUrl={room.imgUrl}
                      location={room.location}
                      price={room.price}
                      title={room.title}
                      key={room.title + id}
                      frequency={room.frequency}
                    />
                  )
                )}
              </section>
            ) : (
              <div>
                <HeaderInfoText title="No data was found" />
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handleNavigationClick={handleNavigationClick}
            />
          </div>
        </section>
      )}
    </main>
  );
});
