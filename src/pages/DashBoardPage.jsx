import React, { useContext, useState } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import styled from "styled-components";
import Dashboardcard from "../components/Dashboardcard";
import Bloodreqeditmodal from "../components/Bloodreqeditmodal";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { CiMenuBurger } from "react-icons/ci";

("sweetalert2/src/sweetalert2.scss");

function DashBoardPage() {
  const { user } = useContext(AUthfirebase);
  const [doner, setdoner] = useState(null);
  const [Modal, setModal] = useState(false);

  const Axiospublic = useAxiosPublic();
  //welocme message er jonno
  const { data = [], isLoading } = useQuery({
    queryKey: "dashboarduser",
    queryFn: async () => {
      const res = await axios.post(
        `https://server-jade-kappa-83.vercel.app/Dashboard/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  //(data);

  //welocme message er jonno

  const {
    data: MydonaitonData = [],
    isLoading: toloading,
    refetch,
  } = useQuery({
    queryKey: "donation requests",
    queryFn: async () => {
      const res = await Axiospublic.post(`mydonation/${user?.email}`);
      return res.data;
    },
    enabled: data?.role === "Donor",
  });

  const recentDonations = MydonaitonData?.filter((item) => item.postedtime)
    .sort((a, b) => new Date(a.postedtime) - new Date(b.postedtime))
    .slice(-3);

  const handledlt = async (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await Axiospublic.post(`deletePost`, { _id: e });
        if (res.status === 200) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  const HandleCanle = async (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await Axiospublic.post(`Cancel`, { _id: e });
        if (res.status === 200) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      {isLoading && toloading ? (
        <>
          <div className="w-full flex justify-end">
            <LoaderSpinner />
          </div>
        </>
      ) : (
        <div className="p-2">
          <div className="font-extrabold flex justify-around gap-5  mb-5">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary border drawer-button lg:hidden"
            >
              <CiMenuBurger />
            </label>
            <h1>
              Welcome <span className="text-cyan-600">{data?.name}</span>
            </h1>
            <h1 className="text-cyan-600">{data?.role}</h1>

            {data?.role !== "admin" && data?.role !== "volunteer" && (
              <>
                <h1>Your Last Posted three requests are</h1>
              </>
            )}
          </div>

          {data?.role !== "admin" && data?.role !== "volunteer" ? (
            <div className="">
              {toloading ? (
                <>
                  <div className="flex justify-center items-center">
                    <LoaderSpinner />
                  </div>
                </>
              ) : MydonaitonData?.length > 0 ? (
                <>
                  <h1 className="text-red-600 flex justify-end">
                    ** only admin will approve Pending to In Progress
                  </h1>{" "}
                  <table className="table rounded-xl overflow-x-hidden shadow-lg">
                    {/* Table Head */}
                    <thead className="bg-white rounded-xl">
                      <tr className="rounded-xl text-center">
                        <th>#</th>
                        <th>Recipient Name</th>
                        <th>Recipient District</th>
                        <th>Recipient Upazila</th>
                        <th>Donation Date</th>
                        <th>Donation Time</th>
                        <th>Blood Group</th>
                        <th>Contact</th>
                        <th>Donation Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="bg-cyan-100">
                      {recentDonations?.map((data, index) => (
                        <tr key={index} className="text-center">
                          <th>{index + 1}</th>
                          <td>{data.recipientName}</td>
                          <td>{data.recipientDistrict}</td>
                          <td>{data.recipientUpazila}</td>
                          <td>{data.donationDate}</td>
                          <td>{data.donationTime}</td>
                          <td>{data.bloodGroup}</td>
                          <td>{data.postedby}</td>
                          <td>{data.donationStatus}</td>
                          <td>
                            {data?.donationStatus === "Inprogress" && (
                              <>
                                <div className="flex gap-5 items-center">
                                  <button
                                    className="bg-red-400 text-white p-1 rounded-lg"
                                    onClick={() => {
                                      handledlt(data?._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="bg-cyan-400 text-white p-1 rounded-lg"
                                    onClick={() => {
                                      HandleCanle(data?._id);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <Link
                                    className="bg-pink-300 text-white p-1 rounded-lg"
                                    to={`editBloodreq/${data?._id}`}
                                  >
                                    Edit
                                  </Link>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Table Footer */}
                    <tfoot>
                      <tr>
                        <td colSpan="10" className="text-center">
                          <Link to="/DashBoard/my-donation-requests">
                            View more
                          </Link>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </>
              ) : (
                <p className=" text-center font-extrabold lg:text-4xl  mt-52">
                  You have not created any blood requested post. <br /> To
                  create one,{" "}
                  <Link className="text-red-400" to={"create-donation-request"}>
                    click here
                  </Link>
                  .
                </p>
              )}
            </div>
          ) : (
            <>
              <Dashboardcard />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default DashBoardPage;
