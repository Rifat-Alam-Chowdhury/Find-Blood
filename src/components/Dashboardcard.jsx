import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdBloodtype, MdOutlineCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";

function Dashboardcard() {
  const { data } = useQuery({
    queryKey: ["dashboardinfo"],
    queryFn: async () => {
      const res = await axios.post(`http://localhost:3000/Dashboard/profile`);
      return res.data;
    },
  });
  console.log(data);

  return (
    <>
      <div className="flex">
        <div className="card p-6 card-compact  w-96 shadow-xl">
          <div className="card-body  ">
            <div className="  flex justify-around">
              <div className="  p-3 ">
                <FaRegUser size={100} />
              </div>
              <div className=" text-2xl font-extrabold text-center space-y-6">
                <h2 className="card-title">Total User</h2>
                <p>{data?.totoalUser}</p>{" "}
              </div>
            </div>
            <Link className="text-center btn" to={"/DashBoard/AllUsers"}>
              All User
            </Link>
          </div>
        </div>
        {/* card2 */}
        <div className="card p-6 card-compact w-96 shadow-xl">
          <div className="card-body">
            <div className="flex justify-around">
              <div className="p-3">
                <MdOutlineCurrencyExchange size={100} />
              </div>
              <div className="text-2xl font-extrabold text-center space-y-6">
                <h2 className="card-title">Total Funding</h2>
                <p>{data?.totoalUser}</p>
              </div>
            </div>
            <Link className="text-center btn" to={"/DashBoard/TotalFunding"}>
              Total Funding
            </Link>
          </div>
        </div>

        {/* card3 */}
        <div className="card p-6 card-compact w-96 shadow-xl">
          <div className="card-body">
            <div className="flex justify-around">
              <div className="p-3">
                <MdBloodtype size={100} />
              </div>
              <div className="text-2xl font-extrabold text-center space-y-6">
                <h2 className="card-title">Total Blood Request</h2>
                <p>{data?.TotalBloodReq}</p>
              </div>
            </div>
            <Link
              className="text-center btn"
              to={"/DashBoard/All-donation-requests"}
            >
              Total Blood Request
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboardcard;
