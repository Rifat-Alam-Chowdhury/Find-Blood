import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loading from "../components/Loading";

function FindDonner() {
  const axiosPublic = useAxiosPublic();
  const [searchFilters, setSearchFilters] = useState({});
  console.log(searchFilters);

  const {
    data: Alldonners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ALL-Donners", searchFilters],
    queryFn: async () => {
      const res = await axiosPublic.get("ALL_DONNERS", {
        params: searchFilters,
      });
      return res.data;
    },
  });
  console.log(Alldonners);

  const [formData, setFormData] = useState({
    bloodGroup: "",
    city: "",
    donationDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v || undefined])
    );
    setSearchFilters(filters);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* search form */}
        <div className="mb-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-sm mb-1 block">Blood Group*</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full pl-4 pr-8 py-3 bg-white bg-opacity-5 rounded-lg border border-red-400 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                >
                  <option value="" disabled>
                    Select Blood Type
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="relative">
                <label className="text-sm mb-1 block">City*</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full pl-4 pr-8 py-3 bg-white bg-opacity-5 rounded-lg border border-red-400 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                >
                  <option disabled value="">
                    Select City
                  </option>
                  <option value={"Chatagong"}>Chatagong</option>
                  <option value={"Dhaka"}>Dhaka</option>
                  <option value={"Mirpur"}>Mirpur</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mx-auto bg-white text-primary-900 px-5 py-2 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-6 border-2 border-red-400 animate-spin"
            >
              <MagnifyingGlassIcon
                className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`}
              />
              Search Donors
            </button>
          </form>
        </div>
        {/* search form  endss*/}
        {isLoading && (
          <div className="  flex justify-center items-center">
            <Loading />
          </div>
        )}
        {Alldonners?.length === 0 && (
          <div className="text-3xl text-center  ">Currently no donor found</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Alldonners?.map((donor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6  bg-primary-200 flex items-center space-x-4">
                <img
                  src={donor?.personalInfo?.photo}
                  alt={`${donor?.personalInfo?.firstName}'s profile`}
                  className="w-16 h-16 rounded-full border-2 border-red-200"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {donor?.personalInfo?.firstName}{" "}
                    {donor?.personalInfo?.lastName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {new Date().getFullYear() -
                      new Date(
                        donor?.personalInfo?.dateOfBirth?.$date
                      ).getFullYear()}{" "}
                    years
                  </p>
                </div>
              </div>

              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-red-600">
                      {donor?.medicalInfo?.bloodGroup}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      Blood Group
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-600"
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
                        d="M15 11a3 3 0 11-6 0 3 3 0z"
                      />
                    </svg>

                    <div className="text-gray-700  rounded-md px-3 py-1 flex flex-row flex-wrap gap-x-2">
                      <span>{donor?.contactInfo?.address?.street},</span>
                      <span>{donor?.contactInfo?.address?.city},</span>
                      <span>{donor?.contactInfo?.address?.state},</span>
                      <span>{donor?.contactInfo?.address?.postalCode},</span>
                      <span>{donor?.contactInfo?.address?.country}</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Last donated{" "}
                      {new Date().getFullYear() -
                        new Date(
                          donor?.medicalInfo?.lastDonationDate?.$date
                        ).getFullYear()}{" "}
                      days ago
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    Request Donation
                  </button>
                  <span className="text-sm text-gray-500">
                    {donor.consent.agreed
                      ? "Consent verified"
                      : "Pending consent"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FindDonner;
