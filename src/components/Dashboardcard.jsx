import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdBloodtype, MdOutlineCurrencyExchange } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxios from "../Hooks/useAxios";

function Dashboardcard() {
  const axiosinterceptor = useAxios();
  const { data } = useQuery({
    queryKey: ["dashboardinfo"],
    queryFn: async () => {
      const res = await axiosinterceptor.post(`Dashboard/profile`);
      return res.data;
    },
  });
  //(data);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-800">Total Users</h3>
              <p className="text-4xl font-extrabold text-red-600">
                {data?.totoalUser}
              </p>
              <Link
                to="/DashBoard/AllUsers"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                View All Users
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <FaRegUser className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-800">Total Funding</h3>
              <p className="text-4xl font-extrabold text-red-600">
                ${data?.TotalFunding}
              </p>
              <Link
                to="/DashBoard/TotalFunding"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                View Funding
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <MdOutlineCurrencyExchange className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-800">
                Blood Requests
              </h3>
              <p className="text-4xl font-extrabold text-red-600">
                {data?.TotalBloodReq}
              </p>
              <Link
                to="/DashBoard/All-donation-requests"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                View Requests
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <MdBloodtype className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboardcard;
