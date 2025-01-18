import React, { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function MyDonations() {
  const { user } = useContext(AUthfirebase);
  const Axiospublic = useAxiosPublic();
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
  console.log(MydonaitonData);

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

              <th>donation status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {MydonaitonData.length === 0
              ? "You have not made any requests"
              : MydonaitonData?.map((data, index) => {
                  return (
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
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyDonations;
