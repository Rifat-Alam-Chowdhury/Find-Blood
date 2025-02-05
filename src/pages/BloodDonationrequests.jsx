import React, { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Form, useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AUthfirebase } from "../Auth/AuthApi";

function BloodDonationrequests() {
  const navigate = useNavigate();
  const { user } = useContext(AUthfirebase);
  const axiosPublic = useAxiosPublic();
  const {
    data: PendingBloodReqs = [],
    isLoading,
    refetch,
  } = useQuery({
    querykey: ["PendingBloodRequestsss"],
    queryFn: async () => {
      const res = await axiosPublic(`PendingBloodReq?email=${user?.email}`);
      return res.data;
    },
  });
  //(PendingBloodReqs);

  return (
    <>
      <div className="overflow-x-auto text-center h-screen lg:p-10 bg-cyan-50 ">
        <h1 className="p-6 font-extrabold">
          Urgent Blood Donation Requests <br /> Help Save Lives Today
        </h1>
        <div className="lg:rounded-xl rounded-lg mx-auto  overflow-hidden">
          <table className="lg:table text-center text-xs  lg:text-md lg:text-center font-extrabold w-full">
            <thead
              className="bg-white
            "
            >
              <tr className="">
                <th>#</th>
                <th>recipient name</th>
                <th>location</th>
                <th>blood group</th>
                <th>date</th>
                <th>time</th>

                <th>Posted by</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="bg-cyan-100 ">
              {/* row 1 */}
              {PendingBloodReqs?.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data?.recipientName}</td>
                  <td>{data?.fullAddress}</td>
                  <td>{data?.bloodGroup}</td>
                  <td>{data?.donationDate}</td>
                  <td>{data?.donationTime}</td>
                  {user?.email === data?.postedby ? (
                    <>
                      <td>you</td>
                    </>
                  ) : (
                    <td>{data?.postedby}</td>
                  )}

                  <th>
                    {user?.email === data?.postedby ? (
                      <button className="btn btn-ghost btn-xs bg-red-200">
                        x
                      </button>
                    ) : data?.WillingToDonate?.some((emails) =>
                        emails.includes(user?.email)
                      ) ? (
                      <button className="btn btn-ghost btn-xs bg-green-200">
                        applied
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate("/BloodreqDetailsPage", {
                            state: { _id: data?._id },
                          })
                        }
                        className="btn btn-ghost btn-xs bg-yellow-200"
                      >
                        Details
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BloodDonationrequests;
