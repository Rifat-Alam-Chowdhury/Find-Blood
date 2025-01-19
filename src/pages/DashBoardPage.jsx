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
        `http://localhost:3000/Dashboard/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
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

  return (
    <>
      {isLoading && toloading ? (
        <>
          <div className="w-full flex justify-end">
            <LoaderSpinner />
          </div>
        </>
      ) : (
        <div className="w-full p-7 ">
          <div className="font-extrabold lg:flex justify-around">
            <h1>Welcome {data?.name}</h1>
            <h1>{data?.role}</h1>
            <h1>Your Last Posted three requests are</h1>
          </div>

          {data?.role !== "admin" ? (
            <div className="p-8">
              {toloading ? (
                <>
                  <div className="flex justify-center items-center">
                    <LoaderSpinner />
                  </div>
                </>
              ) : MydonaitonData?.length > 0 ? (
                <table className="table">
                  {/* Table Head */}
                  <thead>
                    <tr>
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
                  <tbody>
                    {recentDonations?.map((data, index) => (
                      <tr className="bg-base-200" key={index}>
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
                                  onClick={() => {
                                    handledlt(data?._id);
                                  }}
                                >
                                  Delete
                                </button>
                                <button>Cancel</button>
                                <Link to={`editBloodreq/${data?._id}`}>
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
                      <td colSpan="8" className="text-center">
                        <Link to="/DashBoard/my-donation-requests">
                          View more
                        </Link>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p>
                  You have not created any blood requested post. <br /> To
                  create one,{" "}
                  <Link to={"create-donation-request"}>click here</Link>.
                </p>
              )}
            </div>
          ) : (
            <>
              <Dashboardcard />
              <div>hello admin</div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default DashBoardPage;
