import React, { useContext, useState } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

function MyDonations() {
  const { user } = useContext(AUthfirebase);
  const Axiospublic = useAxiosPublic();

  // State for filtering by donation status
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data: MydonaitonData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "donation requests",
    queryFn: async () => {
      const res = await Axiospublic.post(`mydonation/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const filteredData =
    filterStatus === "all"
      ? MydonaitonData
      : MydonaitonData.filter((data) => data.donationStatus === filterStatus);

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
      <div className="flex justify-end">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className=" p-1 rounded-xl"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* Table Head */}
          <thead className="text-center">
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
            {filteredData?.map((data, index) => (
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
                        <Link to={`/DashBoard/editBloodreq/${data?._id}`}>
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
                <Link to="/DashBoard/my-donation-requests">View more</Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default MyDonations;
