import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoaderSpinner from "../components/LoaderSpinner";
import { AUthfirebase } from "../Auth/AuthApi";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import uselocationapi from "../Hooks/uselocationapi";

function Profile() {
  const axiosapi = useAxiosPublic();
  const [Group, distric, Division] = uselocationapi();

  const { user } = useContext(AUthfirebase);
  const [Edit, setEdit] = useState(false);
  //global
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "userprofile",
    queryFn: async () => {
      const data = await axiosapi.post("Dashboard/profile", {
        email: user?.email,
      });
      return data.data;
    },

    enabled: !!user?.email,
  });

  const isloading = true;

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.username.value;

    const division = e.target.division.value;
    const district = e.target.district.value;
    const bloodgroup = e.target.bloodgroup.value;

    const patch = {
      email: user?.email,
      name: name || data?.name,
      division: division || data?.division,
      district: district || data?.district,
      bloodGroup: bloodgroup || data?.bloodGroup,
    };

    //api call dite hobe patch
    const response = await axios.patch(
      "http://localhost:3000/Dashboard/profile/UserUpdate",
      {
        info: patch,
      }
    );

    if (response.status === 200) {
      refetch();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className=" flex justify-center mx-auto my-auto ">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="border-2 w-full p-3 ">
          <form onSubmit={HandleFormSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">Welcome</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                        <input
                          disabled={!Edit}
                          id="username"
                          name="username"
                          type="text"
                          placeholder={data?.name}
                          className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {data?.image ? (
                        <img
                          src={data?.image}
                          alt="User Profile"
                          className="size-12 text-gray-300 rounded-full object-cover"
                        />
                      ) : (
                        <UserCircleIcon
                          aria-hidden="true"
                          className="size-12 text-gray-300"
                        />
                      )}

                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          name="image"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Address
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="district"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      District
                    </label>
                    <select
                      disabled={!Edit}
                      id="division"
                      name="division"
                      autoComplete="division-name"
                      defaultValue={data?.division}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      {Division?.map((group) => (
                        <option key={group?.division} value={group?.division}>
                          {group?.division}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="district"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      District
                    </label>
                    <select
                      disabled={!Edit}
                      id="distric"
                      name="district"
                      autoComplete="distric-name"
                      defaultValue={data?.district}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      {distric?.map((group) => (
                        <option key={group?.name} value={group?.name}>
                          {group?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data?.email}
                        disabled
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="bloodgroup"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Blood Group
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        disabled={!Edit}
                        id="bloodgroup"
                        name="bloodgroup"
                        autoComplete="bloodgroup-name"
                        defaultValue={data?.bloodGroup}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        {Group?.map((group) => (
                          <option key={group?.group} value={group?.group}>
                            {group?.group}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>

              {Edit ? (
                <button
                  type="submit"
                  onClick={() => setEdit(false)}
                  className="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Profile;
