import {
  Activity,
  Columns,
  DollarSign,
  Home,
  Image,
  Mail,
  Navigation,
  Phone,
  User,
  X,
} from "react-feather";
import {
  BreadCrumbLayout,
  BreadCrumbs,
  HeaderInfoText,
  Icon,
  InputField,
} from "../../../units";
import React, { useRef, useState } from "react";
import { useCreateHostelMutation } from "../../../state-management/api/hostel-api";
import { useCloudinarySotrageMutation } from "../../../state-management/api/upload-pics";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorTypes } from "../../../constant";
import toast, { Toaster } from "react-hot-toast";
import LoaderSpinner from "../../../units/loader/loader-spinner";
import { useSelector } from "react-redux";
import { user } from "../../../state-management/local/auth";
import { useNavigate } from "react-router-dom";

export const RoomAdd = React.memo(() => {
  const userInfo = useSelector(user);

  const [details, setDetails] = useState({
    title: "",
    hostelName: "",
    imgUrl: "",
    location: "",
    price: "",
    frequency: "",
    peopleNumber: 0,
    totalbed: 0,
    email: "",
    contact: 0,
    ownerEmail: userInfo?.email,
  });

  const nav = useNavigate();

  const [img, setImg] = useState<string | ArrayBuffer | null>(null);

  const imgRef = useRef<HTMLInputElement | null>(null);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const docs = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(docs);
      reader.onloadend = function () {
        if (reader.result) {
          setImg(reader.result);
        }
      };
    }
  };

  const [createHostel] = useCreateHostelMutation();

  const [uploadToCloud, { isLoading }] = useCloudinarySotrageMutation();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setDetails({ ...details, [e.target.name]: value });
  };

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (img) {
      const toSend = {
        img: img,
      };
      const picsUrl = await uploadToCloud(toSend);

      const toPost = {
        ...details,
        imgUrl: picsUrl.data?.imgUrl,
      };
      await createHostel(toPost).then((data) => {
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
        }
      });
    }
  };

  return (
    <main className="flex flex-col p-8 gap-8">
      <Toaster />
      <BreadCrumbs>
        <BreadCrumbLayout path="/rooms" title="Rooms" />
        <BreadCrumbLayout path="/add-room" title="Add-Rooms" current={true} />
      </BreadCrumbs>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <form onSubmit={createRoom} className="flex flex-col w-[80%] m-auto">
          <div>
            <div className="border-b border-gray-900/10 pb-12">
              <HeaderInfoText title="Hostel & Rooms Information" />

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hostel or room photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    {img ? (
                      <div className="flex flex-col gap-2">
                        <Icon
                          name={X}
                          className="flex place-self-end"
                          onClick={() => setImg(null)}
                        />
                        {typeof img === "string" && (
                          <img src={img} alt="Preview" />
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Icon
                          name={Image}
                          className="mx-auto h-12 w-12 text-gray-300"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              ref={imgRef}
                              onChange={handleImg}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hostel Name
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="hostel-name"
                      inputName="hostelName"
                      inputType="text"
                      inputValue={details.hostelName}
                      iconname={Home}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Room title
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="room-name"
                      inputName="title"
                      inputType="text"
                      iconname={Activity}
                      inputValue={details.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="email"
                      inputName="email"
                      inputType="email"
                      inputValue={details.email}
                      onChange={handleChange}
                      iconname={Mail}
                      required
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="location"
                      inputName="location"
                      inputType="text"
                      inputValue={details.location}
                      onChange={handleChange}
                      iconname={Navigation}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-1 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="price"
                      inputName="price"
                      inputType="number"
                      inputValue={details.price}
                      onChange={handleChange}
                      iconname={DollarSign}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-1 ">
                  <label
                    htmlFor="bed"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Total bed
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="bed"
                      inputName="totalbed"
                      inputType="number"
                      inputValue={details.totalbed}
                      onChange={handleChange}
                      iconname={Columns}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="People"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Total Prople that can reside
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="people"
                      inputName="peopleNumber"
                      inputType="number"
                      inputValue={details.peopleNumber}
                      onChange={handleChange}
                      iconname={User}
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="Contact"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact
                  </label>
                  <div className="mt-2">
                    <InputField
                      id="contact"
                      inputName="contact"
                      inputType="number"
                      inputValue={details.contact}
                      onChange={handleChange}
                      iconname={Phone}
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price Paying Frequency
                  </label>
                  <div className="mt-2 rounded-lg p-4 bg-input-bg justify-between">
                    <select
                      id="frequency"
                      name="frequency"
                      onChange={handleChange}
                      className="bg-input-bg w-full outline-none"
                      required
                    >
                      <option>Select a value</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm bg-love px-3 py-2 rounded-md text-other-white-100 font-semibold hover:animate-glow"
              onClick={() => nav("/rooms")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </main>
  );
});
