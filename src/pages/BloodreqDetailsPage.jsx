import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import ReqModal from "../components/reqModal";
import { ToastContainer } from "react-toastify";
import { AUthfirebase } from "../Auth/AuthApi";

function BloodreqDetailsPage() {
  const location = useLocation();
  const { _id } = location.state || {};
  const axiosPublic = useAxiosPublic();
  const [ModalOpen, setModalOpen] = useState(false);
  const [Id, setId] = useState(null);
  const { user } = useContext(AUthfirebase);
  const {
    data: Bloodreq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["single blood req"],
    queryFn: async () => {
      const res = await axiosPublic.post(`singleBloodReq/${_id}`);
      return res.data;
    },
  });

  //(Bloodreq?.WillingToDonate?.map((e) => //(e)));
  const isSame =
    Bloodreq?.WillingToDonate?.some((e) => e === user?.email) || true;
  //(isSame);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className=" h-screen bg-cyan-50 p-6">
        <div className="lg:flex  lg:justify-center justify-start  ">
          <div className=" flex items-center p-2 justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Blood Group</h3>
            <p className="text-base text-gray-900">{Bloodreq?.bloodGroup}</p>
          </div>
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">District</h3>
            <p className="text-base text-gray-900">
              {Bloodreq?.recipientUpazila}
            </p>
          </div>{" "}
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Division</h3>
            <p className="text-base text-gray-900">
              {Bloodreq?.recipientDistrict}
            </p>
          </div>{" "}
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Address</h3>
            <p className="text-base text-gray-900">{Bloodreq?.fullAddress}</p>
          </div>
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Date</h3>
            <p className="text-base text-gray-900">{Bloodreq?.donationDate}</p>
          </div>
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Time</h3>
            <p className="text-base text-gray-900">{Bloodreq?.donationTime}</p>
          </div>
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">hospitalName</h3>
            <p className="text-base text-gray-900">{Bloodreq?.hospitalName}</p>
          </div>{" "}
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Donation Status</h3>
            <p className="text-base text-gray-900">
              {Bloodreq?.donationStatus}
            </p>
          </div>{" "}
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Name</h3>
            <p className="text-base text-gray-900">{Bloodreq?.recipientName}</p>
          </div>{" "}
          <div className=" flex items-center justify-around  lg:block lg:p-6 text-center lg:space-y-5 lg:overflow-x-auto font-extrabold text-nowrap">
            <h3 className="">Contact</h3>
            <p className="text-base text-gray-900">{Bloodreq?.postedby}</p>
          </div>
          <button
            disabled={
              Bloodreq?.WillingToDonate?.some((e) => e === user?.email) || false
            }
            onClick={() => {
              setModalOpen(true);
              setId(Bloodreq?._id);
            }}
            className="btn bg-red-300 hover:bg-red-400 mt-9"
          >
            {Bloodreq?.donationStatus === "Pending"
              ? "Waiting for admin approval"
              : Bloodreq?.donationStatus === "Inprogress"
              ? "Donate"
              : "Donated"}
          </button>
        </div>
        <div className="flex items-center justify-around">
          <div className=" space-y-5 mt-5">
            <h1 className="lg:text-2xl font-extrabold ">
              Hi,This Is My humble Request
            </h1>
            <h2 className="font-extrabold ">{Bloodreq?.requestMessage}</h2>
          </div>
        </div>
      </div>

      <ReqModal
        ModalOpen={ModalOpen}
        id={Bloodreq?._id}
        setModalOpen={setModalOpen}
        refetch={refetch}
      />
    </>
  );
}

export default BloodreqDetailsPage;
