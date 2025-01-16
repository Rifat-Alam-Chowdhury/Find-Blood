import React, { useContext, useState } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import styled from "styled-components";

function DashBoardPage() {
  const { user } = useContext(AUthfirebase);
  const [doner, setdoner] = useState(null);
  const urlemail = useParams();

  console.log(urlemail);

  const Axiospublic = useAxiosPublic();

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
  console.log(data); // logiing admin

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
  console.log(MydonaitonData);

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <div className="border-2 w-full p-7 border-green-300">
          <div className="font-extrabold flex justify-around">
            <h1>Welcome {data?.name}</h1>
            <h1>{data?.role}</h1>
          </div>

          {data?.role !== "admin" ? (
            <div className="p-8">
              <h1>You have requested on...</h1>

              {MydonaitonData?.length > 0 ? (
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
                      <th>Donation Status</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {MydonaitonData.map((data, index) => (
                      <tr className="bg-base-200" key={index}>
                        <th>{index + 1}</th>
                        <td>{data.recipientName}</td>
                        <td>{data.recipientDistrict}</td>
                        <td>{data.recipientUpazila}</td>
                        <td>{data.donationDate}</td>
                        <td>{data.donationTime}</td>
                        <td>{data.bloodGroup}</td>
                        <td>{data.donationStatus}</td>
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
                <p>No donation requests found.</p>
              )}
            </div>
          ) : (
            <div>hello</div>
          )}
        </div>
      )}
    </>
  );
}

export default DashBoardPage;
