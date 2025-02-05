import React, { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ModalForm from "../components/ModalForm";
import { AUthfirebase } from "../Auth/AuthApi";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

function AdminAllBloodDonation() {
  const axiospublic = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  const [open, setopen] = useState(false);
  const [ModalInfo, setModalInfo] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // New state for filtering

  const SetOpenModal = (e) => {
    setopen(true);
    setModalInfo(e);
    //(e);
  };

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "all blood",
    queryFn: async () => {
      const res = await axiospublic.post(`All-BloodReq/${user?.email}`);
      return res.data;
    },
  });

  const HandleStatusChange = async (status, _id) => {
    const res = await axiospublic.post(`Status-Change-On-Blood-Req`, {
      status: status,
      id: _id,
    });

    if (res.data.matchedCount === 1) {
      refetch();
    }
  };

  // Filter data based on the selected status
  const filteredData =
    statusFilter === "All"
      ? data?.allBloodRe
      : data?.allBloodRe?.filter(
          (item) => item.donationStatus === statusFilter
        );
  //(filteredData);

  return (
    <>
      <div className="flex justify-between items-center p-2 mb-4">
        {" "}
        <div className=" border-t-red-900 font-extrabold">
          <h1>All blood requests from those in urgent need of donations.</h1>
        </div>
        <div className="">
          <select
            className="select select-primary select-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
            <option value="Cancel">Canceled</option>
          </select>
        </div>
      </div>

      <div className="p-2 min-h-screen rounded-xl ">
        <table className="table">
          <thead className="bg-white">
            <tr>
              <th>#</th>
              <th>Recipient Name</th>
              <th>Recipient District</th>
              <th>Recipient Upazila</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Posted By</th>
            </tr>
          </thead>
          <tbody className="bg-cyan-100">
            {filteredData?.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No requests found for the selected status.
                </td>
              </tr>
            ) : (
              filteredData?.map((datas, index) => (
                <tr className="" key={index}>
                  <th>{index + 1}</th>
                  <td>{datas.recipientName}</td>
                  <td>{datas.recipienTdistrict}</td>
                  <td>{datas.recipientUpazila}</td>
                  <td>{datas.donationDate}</td>
                  <td>{datas.donationTime}</td>
                  <td className="flex justify-center gap-6 ">
                    {datas.bloodGroup}
                    <button
                      disabled={data?.role === "volunteer"}
                      onClick={() => SetOpenModal(datas)}
                      className="btn btn-xs btn-accent"
                    >
                      Edit
                    </button>
                  </td>
                  {/* actions */}
                  <td>
                    <select
                      className="select select-xs select-primary"
                      value={datas.donationStatus}
                      onChange={(e) =>
                        HandleStatusChange(e.target.value, datas._id)
                      }
                    >
                      <option value={datas.donationStatus} disabled selected>
                        {datas.donationStatus}
                      </option>
                      <option
                        value="Pending"
                        disabled={datas.donationStatus === "Pending"}
                      >
                        Pending
                      </option>
                      <option
                        value="Inprogress"
                        disabled={datas.donationStatus === "Inprogress"}
                      >
                        Inprogress
                      </option>
                      <option
                        value="Done"
                        disabled={datas.donationStatus === "Done"}
                      >
                        Done
                      </option>
                      <option
                        value="Canceled"
                        disabled={datas.donationStatus === "Canceled"}
                      >
                        Canceled
                      </option>
                      <option
                        value="Completed"
                        disabled={datas.donationStatus === "Completed"}
                      >
                        Complete
                      </option>
                    </select>
                  </td>
                  <td>
                    {datas.postedby === user.email ? "You" : datas.postedby}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalForm
        open={open}
        setopen={setopen}
        ModalInfo={ModalInfo}
        refetch={refetch}
        role={data.role}
      />
    </>
  );
}

export default AdminAllBloodDonation;
