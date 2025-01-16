import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import Sidebar from "./Sidebar";

function DashBoard() {
  const { user } = useContext(AUthfirebase);
  const { data = [], isLoading } = useQuery({
    queryKey: ["alldata", user?.email], // Include email in the queryKey
    queryFn: async () => {
      // const res = await axios.post(
      //   `${import.meta.env.VITE_URL}Dashboard`,
      //   { email: user?.email } // Pass email as an object
      // );
      return res.data;
    },
    enabled: !!user?.email, // Only run query when email is defined
  });

  const {
    status = "",
    role = "",
    name = "",
    image = "",
    email = "",
    district = "",
    bloodGroup = "",
  } = data?.data || {};

  return (
    <div>
      {/* //Dashboard Navbar */}
      <div className="navbar bg-red-500 text-black flex justify-around">
        <button className="btn btn-ghost text-xl">DashBoard</button>
        <h1>
          Welcome {role} {name}
        </h1>
      </div>
      {/* //Dashboard Navbar */}

      <div className="flex">
        <Sidebar data={data?.data || {}} />

        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
