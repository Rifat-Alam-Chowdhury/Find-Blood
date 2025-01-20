import React from "react";
import { useState, useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoaderSpinner from "../components/LoaderSpinner";
import uselocationapi from "../Hooks/uselocationapi";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function DonationCreate() {
  const { user } = useContext(AUthfirebase);
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading } = useQuery({
    queryKey: "dashboarduser",
    queryFn: async () => {
      const res = await axios.post(
        `http://localhost:3000/Dashboard/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data);

  const isloading = true;
  const [, distric, Division] = uselocationapi();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    donationStatus: "Pending",
    postedby: data?.email,
    postedtime: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    api();
  };

  const api = async () => {
    const res = await axios.post("http://localhost:3000/Dashboard/blood/Req", {
      Info: formData,
    });

    console.log(res.status);
    if (res.status === 200) {
      alert("Post Created");
    }
  };

  return (
    <>
      {data?.status === "active" ? (
        <div className="w-full ">
          <form onSubmit={handleFormSubmit}>
            <div className=" border-gray-900/10 ">
              <div className="text-center">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Donation Request Form
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Please provide the following details for the blood donation
                  request.
                </p>
              </div>

              {isLoading ? (
                <div className=" flex justify-center">
                  <LoaderSpinner />
                </div>
              ) : (
                <div>
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="requesterName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Requester Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="requesterName"
                        name="requesterName"
                        type="text"
                        value={data?.name}
                        readOnly
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="requesterEmail"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Requester Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="requesterEmail"
                        name="requesterEmail"
                        type="email"
                        value={data?.email}
                        readOnly
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Recipient er Name */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="recipientName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Recipient Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Recipient  er District */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="recipientDistrict"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Recipient District
                    </label>
                    <div className="mt-2">
                      <select
                        id="recipientDistrict"
                        name="recipientDistrict"
                        value={formData.recipientDistrict}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      >
                        <option value="">Select District</option>

                        {distric?.map((district) => {
                          return (
                            <option key={district.name} value={district.name}>
                              {district.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Recipient er Upazila */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="recipientUpazila"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Recipient Upazila
                    </label>
                    <div className="mt-2">
                      <select
                        id="recipientUpazila"
                        name="recipientUpazila"
                        value={formData.recipientUpazila}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      >
                        <option value="">Select Upazila</option>
                        {Division?.map((division) => {
                          return (
                            <option value={division.division}>
                              {division.division}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Hospital er Name */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="hospitalName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Hospital Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="hospitalName"
                        name="hospitalName"
                        type="text"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Full  Address */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="fullAddress"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="fullAddress"
                        name="fullAddress"
                        type="text"
                        value={formData.fullAddress}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="bloodGroup"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Blood Group
                    </label>
                    <div className="mt-2">
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>

                  {/* Donation Date */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="donationDate"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Donation Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="donationDate"
                        name="donationDate"
                        type="date"
                        value={formData.donationDate}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Donation er Time */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="donationTime"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Donation Time
                    </label>
                    <div className="mt-2">
                      <input
                        id="donationTime"
                        name="donationTime"
                        type="time"
                        value={formData.donationTime}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Request Message here */}
                  <div className="  p-2 font-extrabold">
                    <label
                      htmlFor="requestMessage"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Request Message
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="requestMessage"
                        name="requestMessage"
                        rows={3}
                        value={formData.requestMessage}
                        onChange={handleInputChange}
                        className="block w-full py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 bg-gray-100 border border-gray-300 rounded-md sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* form er Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent text-sm/6 font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className=" flex justify-center font-extrabold p-20 lg:text-4xl">
            Sorry Your Are Blocked... <br /> ...please contact Admin
          </div>
        </>
      )}
    </>
  );
}

export default DonationCreate;
