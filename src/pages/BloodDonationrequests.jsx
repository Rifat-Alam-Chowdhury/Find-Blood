import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Form, useNavigate } from "react-router-dom";

function BloodDonationrequests() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    data: PendingBloodReq = [],
    isLoading,
    refetch,
  } = useQuery({
    queryFn: ["PendingBloodRequests"],
    queryFn: async () => {
      const res = await axiosPublic(`PendingBloodReq`);
      return res.data;
    },
  });
  console.log(PendingBloodReq);

  return (
    <>
      <div className="overflow-x-auto p-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>recipient name</th>
              <th>location</th>
              <th>blood group</th>
              <th>date</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {PendingBloodReq?.map((data) => (
              <tr>
                <td>{data?.recipientName}</td>
                <td>{data?.fullAddress}</td>
                <td>{data?.bloodGroup}</td>
                <td>{data?.donationDate}</td>
                <td>{data?.donationTime}</td>
                <th>
                  <button
                    onClick={() =>
                      navigate("/BloodreqDetailsPage", {
                        state: { _id: data?._id },
                      })
                    }
                    className="btn btn-ghost btn-xs"
                  >
                    View button
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BloodDonationrequests;
