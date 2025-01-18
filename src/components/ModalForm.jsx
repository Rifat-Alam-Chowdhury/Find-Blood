import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import uselocationapi from "../Hooks/uselocationapi";
import axios from "axios";

function ModalForm({ open, setopen, ModalInfo, refetch, role }) {
  const Axiospublic = useAxiosPublic();
  const axiosPublic = useAxiosPublic();
  const [Group, distric, Division] = uselocationapi();

  const HandleEdit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bloodGroup = form.bloodgroup.value;
    const donationDate = form.DonationDate.value;
    const donationTime = form.DonationTime.value;
    const donationStatus = form.DonationStatus.value;
    const fullAddress = form.fulladress.value;
    const hospitalName = form.hospital.value;
    const recipientName = form.name.value;
    const recipientDistrict = form.district.value;
    const recipientUpazila = form.upazila.value;
    const requestMessage = form["reqmessage"].value;
    const requestedPerson = Array.from(
      form.requestedperson.selectedOptions,
      (option) => option.value
    );
    const postedBy = form.psotedby.value;
    const id = form.id.value;

    const formData = {
      bloodGroup,
      donationDate,
      donationTime,
      donationStatus,
      fullAddress,
      hospitalName,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      requestMessage,
      requestedPerson,
      postedBy,
      id,
    };

    const res = await Axiospublic.put("adminEditdonetionpost", formData);
    console.log(res.data);

    if (res?.data?.acknowledged === true) {
      setopen(false);
      refetch();
    }

    console.log("Form Data:", formData);
  };
  return (
    <>
      <Dialog className="" open={open}>
        <DialogHeader>Its a simple modal.</DialogHeader>
        <div className="w-11/12 mx-auto h-96 overflow-y-auto p-4 border rounded-lg">
          <form onSubmit={HandleEdit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationStatus"
              >
                Blood Group
              </label>
              <select
                id="donationStatus"
                name="bloodgroup"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.bloodGroup}
                className="border border-gray-300 rounded w-full px-3 py-2"
              >
                {Group?.map((g) => {
                  return <option value={g.group}>{g.group}</option>;
                })}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationDate"
              >
                Donation Date
              </label>
              <input
                type="date"
                id="donationDate"
                disabled={role === "Volunteer"}
                name="DonationDate"
                defaultValue={ModalInfo?.donationDate || ""}
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationTime"
              >
                Donation Time
              </label>
              <input
                type="time"
                id="donationTime"
                disabled={role === "Volunteer"}
                name="DonationTime"
                defaultValue={ModalInfo?.donationTime || ""}
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationStatus"
              >
                Donation Status
              </label>
              <select
                id="donationStatus"
                name="DonationStatus"
                defaultValue={ModalInfo?.donationStatus || "Pending"}
                className="border border-gray-300 rounded w-full px-3 py-2"
              >
                <option value="Pending">Pending</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="fullAddress"
              >
                Full Address
              </label>
              <input
                type="text"
                id="fullAddress"
                name="fulladress"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.fullAddress || ""}
                placeholder="Enter Full Address"
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="hospital">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.hospitalName || ""}
                placeholder="Enter Hospital Name"
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="name">
                Recipient Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.recipientName || ""}
                placeholder="Enter Recipient Name"
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationStatus"
              >
                Recipient District
              </label>
              <select
                id="donationStatus"
                name="district"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.bloodGroup}
                className="border border-gray-300 rounded w-full px-3 py-2"
              >
                {distric?.map((g) => {
                  return <option value={g.name}>{g.name}</option>;
                })}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="donationStatus"
              >
                Recipient Upazila
              </label>
              <select
                id="donationStatus"
                name="upazila"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.bloodGroup}
                className="border border-gray-300 rounded w-full px-3 py-2"
              >
                {Division?.map((g) => {
                  return <option value={g.division}>{g.division}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="reqmessage">
                Request Message
              </label>
              <textarea
                id="reqmessage"
                name="reqmessage"
                disabled={role === "Volunteer"}
                defaultValue={ModalInfo?.requestMessage || ""}
                placeholder="Enter Request Message"
                className="border border-gray-300 rounded w-full px-3 py-2"
              ></textarea>
            </div>

            <div>
              <label
                className="block text-sm font-medium"
                htmlFor="requestedPerson"
              >
                Requested Persons
              </label>
              <select
                id="requestedPerson"
                name="requestedperson"
                disabled={role === "Volunteer"}
                className="border border-gray-300 rounded w-full px-3 py-2"
                multiple
                defaultValue={ModalInfo?.requestedperson || []}
              >
                {ModalInfo?.requestedperson?.map((person, index) => (
                  <option key={index} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="psotedby">
                Posted By
              </label>
              <input
                type="email"
                id="psotedby"
                name="psotedby"
                defaultValue={ModalInfo?.postedby || ""}
                disabled
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="id">
                ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                defaultValue={ModalInfo?._id || ""}
                disabled
                className="border border-gray-300 rounded w-full px-3 py-2"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setopen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default ModalForm;
