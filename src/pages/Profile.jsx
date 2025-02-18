import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoaderSpinner from "../components/LoaderSpinner";
import { AUthfirebase } from "../Auth/AuthApi";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import uselocationapi from "../Hooks/uselocationapi";
import Loading from "../components/Loading";

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
      const data = await axiosapi.post("profilepage", {
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

    const patcha = {
      email: user?.email,
      name: name || data?.name,
      division: division || data?.division,
      district: district || data?.district,
      bloodGroup: bloodgroup || data?.bloodGroup,
    };

    //api call dite hobe patch
    const response = await axios.patch(
      "https://server-jade-kappa-83.vercel.app/Dashboard/profile/UserUpdate",
      {
        info: patcha,
      }
    );

    if (response.status === 200) {
      refetch();
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-6">
          <form onSubmit={HandleFormSubmit} className="space-y-8">
            <div className="flex justify-between items-center bg-red-50 p-4 rounded-lg border border-red-200">
              <div>
                <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                  <UserCircleIcon className="w-8 h-8 text-red-600" />
                  Profile Settings
                </h2>
                <p className="text-sm text-red-600 mt-1">
                  {data?.role} Dashboard • Blood Group:{" "}
                  {data?.bloodGroup || "Not specified"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {Edit ? (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEdit(false)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-6 flex items-center gap-2">
                <UserCircleIcon className="w-6 h-6 text-red-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Full Name
                  </label>
                  <input
                    disabled={!Edit}
                    id="username"
                    name="username"
                    type="text"
                    placeholder={data?.name}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      Edit
                        ? "border-red-300 focus:ring-2 focus:ring-red-500"
                        : "border-gray-200 bg-gray-50"
                    } transition-all`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data?.email}
                    disabled
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {data?.image ? (
                        <img
                          src={data?.image}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-2 border-red-200"
                        />
                      ) : (
                        <UserCircleIcon className="w-20 h-20 text-red-200" />
                      )}
                      <label
                        htmlFor="file-upload"
                        className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-red-200 cursor-pointer hover:bg-red-50"
                      >
                        <PhotoIcon className="w-5 h-5 text-red-600" />
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <span className="text-sm text-red-600">
                      {Edit
                        ? "Click the camera icon to update your photo"
                        : "Verified donor profile"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Medical Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    disabled={!Edit}
                    id="bloodgroup"
                    name="bloodgroup"
                    defaultValue={data?.bloodGroup}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      Edit
                        ? "border-red-300 focus:ring-2 focus:ring-red-500"
                        : "border-gray-200 bg-gray-50"
                    } transition-all`}
                  >
                    {Group?.map((group) => (
                      <option key={group?.group} value={group?.group}>
                        {group?.group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-red-100 p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Address Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Division
                  </label>
                  <select
                    disabled={!Edit}
                    id="division"
                    name="division"
                    defaultValue={data?.division}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      Edit
                        ? "border-red-300 focus:ring-2 focus:ring-red-500"
                        : "border-gray-200 bg-gray-50"
                    } transition-all`}
                  >
                    {Division?.map((group) => (
                      <option key={group?.division} value={group?.division}>
                        {group?.division}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    District
                  </label>
                  <select
                    disabled={!Edit}
                    id="distric"
                    name="district"
                    defaultValue={data?.district}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      Edit
                        ? "border-red-300 focus:ring-2 focus:ring-red-500"
                        : "border-gray-200 bg-gray-50"
                    } transition-all`}
                  >
                    {distric?.map((group) => (
                      <option key={group?.name} value={group?.name}>
                        {group?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Profile;
