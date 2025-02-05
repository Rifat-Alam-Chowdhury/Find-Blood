import React, { useContext, useState } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal, { swal, sweetAlert } from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { MdOutlineDone } from "react-icons/md";
import sweetalert2 from "sweetalert2/dist/sweetalert2.js";
import { toast, ToastContainer } from "react-toastify";

function MyDonations() {
  const { user } = useContext(AUthfirebase);
  const Axiospublic = useAxiosPublic();

  // State for filtering by donation status
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleemailChange = (e) => {
    //(e);

    setSelectedEmail(e);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAcceptReject = async (e) => {
    if (selectedEmail) {
      const res = await Axiospublic.post(`acceptreject`, {
        selectedEmail: selectedEmail,
        status: status,
        _id: e,
      });
      //(res.data);

      if (res.data.modifiedCount === 1) {
        refetch();
        toast.success("Your Approval has been submitted");
      }
    } else {
      alert("Please select a recipient");
    }
  };

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

  //(MydonaitonData);

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
        const res = await Axiospublic.post(`deletePost`, {
          _id: e,
          email: user?.email,
        });
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
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await Axiospublic.post(`Cancel`, { _id: e });
        if (res.status === 200) {
          refetch();
          Swal.fire({
            title: "Canceled!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

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
      <div className="flex justify-around p-2 mb-5">
        <h1>You have posted ..</h1>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className=" p-1 border-2 rounded-xl"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="Cancel">Canceled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className=" rounded-xl text-xs ">
        <table className=" w-full p-4 text-xs mb-6">
          {/* Table Head */}
          <thead className="text-center bg-white ">
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
              <th>Applied</th>
              <th>Accept or Reject</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-cyan-200 overflow-x-hidden mb-5">
            {filteredData?.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={data?._id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{data?.recipientName}</td>
                  <td>{data?.recipientDistrict}</td>
                  <td>{data?.recipientUpazila}</td>
                  <td>{data?.donationDate}</td>
                  <td>{data?.donationTime}</td>
                  <td>{data?.bloodGroup}</td>
                  <td>{data?.postedby}</td>
                  <td>{data?.donationStatus}</td>
                  <td className=" ">
                    {data?.donationStatus === "Inprogress" ? (
                      <div className="">
                        <button
                          onClick={() => handledlt(data?._id)}
                          className="btn btn-xs py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            HandleCanle(data?._id);
                          }}
                          className="btn btn-xs py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <Link
                          to={`/DashBoard/editBloodreq/${data?._id}`}
                          className="btn btn-xs py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <select
                      className="bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name=""
                      id=""
                      onChange={(e) => handleemailChange(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        requested
                      </option>
                      {data?.WillingToDonate?.map((e, index) => (
                        <option key={index} value={e[0]}>
                          {e[0]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name=""
                      id=""
                      onChange={handleStatusChange}
                    >
                      <option value="" disabled selected hidden>
                        Y/N
                      </option>
                      <option value="accepted">Accept</option>
                      <option value="rejected">Reject</option>
                    </select>{" "}
                  </td>
                  <td>
                    <button onClick={(e) => handleAcceptReject(data?._id)}>
                      <MdOutlineDone />
                    </button>
                  </td>{" "}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>

          {/* Table Footer */}
          <tfoot>
            <tr>
              <td colSpan="10" className="text-center">
                This is all you have posted{" "}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default MyDonations;
