import toast, { Toaster } from "react-hot-toast";
import { InfoText, InputField, LoaderSpinner } from "../../units";
import { Mail, MapPin, Phone, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { updateCredentials, user } from "../../state-management/local/auth";
import { useState } from "react";
import { useUpdateUserMutation } from "../../state-management/api/user-api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorTypes } from "../../constant";

export const Profile = () => {
  const userDetails = useSelector(user);

  const [userInfo, setUserInfo] = useState({
    name: userDetails?.userName ?? userDetails?.name,
    address: userDetails?.address,
    email: userDetails?.email,
    contact: userDetails?.contact,
    role: userDetails?.role,
  });

  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const saveChanges = async () => {
    const newUpdatedValue = {
      userName: userInfo.name,
      address: userInfo.address,
      email: userInfo.email,
      contact: userInfo.contact,
      role: userInfo.role,
    };

    const userId = userDetails?._id;

    await updateUser({ id: userId, data: newUpdatedValue }).then((resp) => {
      if (resp.error) {
        console.log(resp.error);
        const error = resp.error as FetchBaseQueryError;
        if ("data" in error) {
          toast.error((error.data as errorTypes).message as string);
        }
        if ("error" in error) {
          toast.error("Server timed out. Please Try Again Later!!!");
        }
      }

      if (resp.data) {
        const toUpdate = {
          ...newUpdatedValue,
          _id: userId,
        };
        toast.success("Successfully updated!!");
        dispatch(updateCredentials(toUpdate));
      }
    });
  };

  const resetChanges = () => {
    setUserInfo({
      name: userDetails?.name,
      address: userDetails?.address,
      email: userDetails?.email,
      contact: userDetails?.contact,
      role: userDetails?.role,
    });
  };

  return (
    <main className="flex flex-col gap-8">
      <Toaster />

      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <section className="grid grid-cols-2 gap-12 p-4">
          <div className="flex flex-col gap-2">
            <InfoText title="Username" />
            <InputField
              iconname={User}
              inputType="text"
              inputValue={userInfo.name}
              inputName="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InfoText title="Mail" />
            <InputField
              iconname={Mail}
              inputType="text"
              inputValue={userInfo.email}
              inputName="email"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InfoText title="Contact" />
            <InputField
              iconname={Phone}
              inputName="contact"
              inputType="text"
              inputValue={userInfo.contact}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InfoText title="Address" />
            <InputField
              iconname={MapPin}
              inputType="text"
              inputValue={userInfo.address}
              inputName="address"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <InfoText title="Role" />
            <select
              name="role"
              id=""
              className="rounded-lg p-4   bg-input-bg justify-between"
              value={userInfo.role}
              onChange={handleChange}
            >
              <option value="owner">owner</option>
              <option value="student">student</option>
            </select>
          </div>

          <section className="col-span-2">
            <div className="flex gap-4  ">
              <button
                type="submit"
                className="rounded-md bg-brand px-3 py-2 text-sm text-other-white-100 font-semibold hover:animate-glow"
                onClick={saveChanges}
              >
                Save
              </button>
              <button
                type="button"
                className="text-sm bg-love px-3 py-2 rounded-md text-other-white-100 font-semibold hover:animate-glow"
                onClick={resetChanges}
              >
                Reset
              </button>
            </div>
          </section>
        </section>
      )}
    </main>
  );
};
