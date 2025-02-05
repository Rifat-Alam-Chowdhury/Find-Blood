import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxios from "../Hooks/useAxios";
import { AUthfirebase } from "../Auth/AuthApi";

function MyAppiledPosts() {
  const axiossecure = useAxios();
  const { user } = useContext(AUthfirebase);
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myAppliedPosts"],
    queryFn: async () => {
      const res = await axiossecure.post(`myAppliedPosts/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  //(data);

  return (
    <>
      <div className="container mx-auto mt-10 p-5">
        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-white    ">
            <tr>
              <th className="p-3">Recipient Name</th>
              <th className="p-3">Recipient District</th>
              <th className="p-3">Recipient Upazila</th>
              <th className="p-3">Hospital Name</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Donation Date</th>
              <th className="p-3">Donation Time</th>
              <th className="p-3">Request Message</th>
              <th className="p-3">Full Address</th>
              <th className="p-3">Posted By</th>
              <th className="p-3">your request</th>
            </tr>
          </thead>
          <tbody className="bg-cyan-100">
            {data?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.recipientName}</td>
                <td className="p-3">{item.recipientDistrict}</td>
                <td className="p-3">{item.recipientUpazila}</td>
                <td className="p-3">{item.hospitalName}</td>
                <td className="p-3">{item.bloodGroup}</td>
                <td className="p-3">{item.donationDate}</td>
                <td className="p-3">{item.donationTime}</td>
                <td className="p-3">{item.requestMessage}</td>
                <td className="p-3">{item.fullAddress}</td>
                <td className="p-3">{item.postedby}</td>
                {item.WillingToDonate.map((donation, index) =>
                  donation[0] === user.email ? (
                    <td className="text-red-400 p-3" key={index}>
                      {donation[1] ? donation[1] : "Pending"}
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyAppiledPosts;
