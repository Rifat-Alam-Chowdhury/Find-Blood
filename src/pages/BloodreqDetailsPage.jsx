import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import ReqModal from "../components/reqModal";

function BloodreqDetailsPage() {
  const location = useLocation();
  const { _id } = location.state || {};
  const axiosPublic = useAxiosPublic();
  const [ModalOpen, setModalOpen] = useState(false);
  const [Id, setId] = useState(null);

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

  return (
    <>
      <div className="bg-white">
        <div className="">
          <div className="mx-auto   max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            {/* // */}
            <div className="lg:col-span-2 ml-16 space-y-5 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Hey..
              </h1>
              <h2>{Bloodreq?.requestMessage}</h2>
            </div>
            {/* // */}
            <button
              onClick={() => {
                setModalOpen(true);
                setId(Bloodreq?._id);
              }}
              className="mt-10 flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {Bloodreq?.donationStatus === "Pending"
                ? "Pending"
                : Bloodreq?.donationStatus === "inprogress"
                ? "In Progress"
                : "Unknown"}
            </button>
            {/* // */}
            <div className="py-10 flex lg:col-span-3 p-6 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Blood Group</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.bloodGroup}
                </p>
              </div>
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">District</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.recipientUpazila}
                </p>
              </div>{" "}
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Division</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.recipientDistrict}
                </p>
              </div>{" "}
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Address</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.fullAddress}
                </p>
              </div>
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Date</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.donationDate}
                </p>
              </div>
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Time</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.donationTime}
                </p>
              </div>
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">hospitalName</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.hospitalName}
                </p>
              </div>{" "}
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Donation Status</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.donationStatus}
                </p>
              </div>{" "}
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Name</h3>
                <p className="text-base text-gray-900">
                  {Bloodreq?.recipientName}
                </p>
              </div>{" "}
              <div className=" p-6 text-center space-y-5 overflow-x-auto font-extrabold text-nowrap">
                <h3 className="">Contact</h3>
                <p className="text-base text-gray-900">{Bloodreq?.postedby}</p>
              </div>{" "}
            </div>
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
