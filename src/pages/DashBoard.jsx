import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import Sidebar from "./Sidebar";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function DashBoard() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["alldata", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosPublic.post(`Dashboard`, { email: user?.email });
  //     return res.data;
  //   },
  //   enabled: !!user?.email,
  // });

  // const {
  //   status = "",
  //   role = "",
  //   name = "",
  //   image = "",
  //   email = "",
  //   district = "",
  //   bloodGroup = "",
  // } = data?.data || {};

  return (
    <div>
      <div className="flex">
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
