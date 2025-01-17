import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function AdminAllBloodDonation() {
  const axiospublic = useAxiosPublic();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "all blood",
    queryFn: async () => {
      const res = await axiospublic.post(`All-BloodReq`);
      return res.data;
    },
  });

  console.log(data);

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>recipient name</th>
              <th>recipient district</th>
              <th>recipient upazila</th>
              <th>donation date</th>
              <th>donation time</th>
              <th>blood group</th>
              <th>requestedperson</th>
              <th>donation status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {data.length === 0
              ? "You have not made any requests"
              : data?.map((data, index) => {
                  return (
                    <tr className="bg-base-200" key={index}>
                      <th>{index + 1}</th>
                      <td>{data.recipientName}</td>
                      <td>{data.recipientDistrict}</td>
                      <td>{data.recipientUpazila}</td>
                      <td>{data.donationDate}</td>
                      <td>{data.donationTime}</td>
                      <td>{data.bloodGroup}</td>
                      <td>
                        <select name="" id="">
                          {data.requestedperson?.map((person, index) => (
                            <option key={index} value={person}>
                              {person}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>{data.donationStatus}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminAllBloodDonation;
