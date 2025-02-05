import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../Hooks/useAxios";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

function TotalFunds() {
  const axiosInterface = useAxios();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["TotalFunds"],
    queryFn: async () => {
      const res = await axiosInterface.post("TotalFunding");
      return res.data;
    },
  });

  //(data);

  return (
    <>
      <div className="overflow-x-hidden h-screen rounded-xl text-center font-extrabold">
        <table className="table">
          <thead className="bg-red-300 ">
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr className=" bg-cyan-200" key={item.transactionId}>
                <td>{item.email}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>{" "}
                {/* Format date */}
                <td>{item.price}</td>
                <td>{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TotalFunds;
