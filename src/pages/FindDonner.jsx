import React, { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Form, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AUthfirebase } from "../Auth/AuthApi";

function FindDonner() {
  const navigate = useNavigate();
  const { user } = useContext(AUthfirebase);
  const axiosPublic = useAxiosPublic();
  const {
    data: Alldonners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ALL-Donners"],
    queryFn: async () => {
      const res = await axiosPublic(`ALL_DONNERS`);
      return res.data;
    },
  });
  console.log(Alldonners);

  <>
    [
    {/* {
    _id: new ObjectId('67b36be936aaf4a5ff784c67'),
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: [Object],
      gender: 'Male',
      weight: 70,
      photo: 'profile_picture.jpg'
    },
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1-234-567-8901',
      address: [Object]
    },
    medicalInfo: { bloodGroup: 'O+', lastDonationDate: [Object] },
    consent: { agreed: true, timestamp: [Object] }
  } */}
    ]
  </>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Alldonners.map((donor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Profile  */}
              <div className="p-6  bg-red-50 flex items-center space-x-4">
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

              {/* medical Infos */}
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

              {/* Contact and Location */}
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
                  {/* last donation */}
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

              {/* requested*/}
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
