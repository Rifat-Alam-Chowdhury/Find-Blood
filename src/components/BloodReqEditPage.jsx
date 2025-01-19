import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import uselocationapi from "../Hooks/uselocationapi";

function BloodReqEditPage() {
  const { id } = useParams();
  const [Group, distric, Division] = uselocationapi();
  const [formData, setFormData] = useState({
    bloodGroup: "",
    donationDate: "",
    donationStatus: "",
    donationTime: "",
    fullAddress: "",
    hospitalName: "",
    postedby: "",
    postedtime: "",
    recipientDistrict: "",
    recipientName: "",
    recipientUpazila: "",
    requestMessage: "",
  });
  const Navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const { data: EditBloodReqStatus = [] } = useQuery({
    queryKey: ["get blood req"],
    queryFn: async () => {
      const res = await axiosPublic.post(`/singleBloodReq/${id}`, {
        formData: formData,
      });
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (EditBloodReqStatus) {
      setFormData({
        bloodGroup: EditBloodReqStatus.bloodGroup || "",
        donationDate: EditBloodReqStatus.donationDate || "",
        donationStatus: EditBloodReqStatus.donationStatus || "",
        donationTime: EditBloodReqStatus.donationTime || "",
        fullAddress: EditBloodReqStatus.fullAddress || "",
        hospitalName: EditBloodReqStatus.hospitalName || "",
        postedby: EditBloodReqStatus.postedby || "",
        postedtime: EditBloodReqStatus.postedtime || "",
        recipientDistrict: EditBloodReqStatus.recipientDistrict || "",
        recipientName: EditBloodReqStatus.recipientName || "",
        recipientUpazila: EditBloodReqStatus.recipientUpazila || "",
        requestMessage: EditBloodReqStatus.requestMessage || "",
      });
    }
  }, [EditBloodReqStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosPublic.post(`Edit-Blood-Req/${id}`, {
      formData: formData,
    });

    if (res.status === 200) {
      Navigate("/DashBoard/my-donation-requests");
    }
  };

  return (
    <div className="container mx-auto mt-12 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Edit Blood Request
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              className="input input-bordered w-full p-3 text-lg"
            />
          </div>

          <div className="form-control">
            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="select select-bordered w-full p-3 text-lg"
            >
              <option value="">Select Blood Group</option>
              {Group.map((item, index) => (
                <option key={index} value={item.group}>
                  {item.group}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="input input-bordered w-full p-3 text-lg"
            />
          </div>

          <div className="form-control">
            <label className="label">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              className="input input-bordered w-full p-3 text-lg"
            />
          </div>

          <div className="form-control">
            <label className="label">Recipient District</label>
            <select
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              className="select select-bordered w-full p-3 text-lg"
            >
              <option value="">Select District</option>
              {distric.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">Recipient Division</label>
            <select
              name="recipientDistrict"
              value={formData.recipientUpazila}
              onChange={handleChange}
              className="select select-bordered w-full p-3 text-lg"
            >
              <option value="">Select Division</option>
              {Division.map((district) => (
                <option key={district.id} value={district.division}>
                  {district.division}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">Full Address</label>
            <input
              type="text"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              className="input input-bordered w-full p-3 text-lg"
            />
          </div>

          <div className="form-control">
            <label className="label">Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              className="input input-bordered w-full p-3 text-lg"
            />
          </div>

          <div className="form-control">
            <label className="label">Request Message</label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              className="textarea textarea-bordered w-full p-3 text-lg"
              rows="4"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button type="submit" className="btn btn-primary w-1/3 py-3 text-lg">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-secondary w-1/3 py-3 text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BloodReqEditPage;
