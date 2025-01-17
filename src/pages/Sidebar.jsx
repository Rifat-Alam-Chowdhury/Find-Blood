import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function Sidebar() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["isadmin"],
    queryFn: async () => {
      const res = await axiosPublic.post(`isadmin/${user?.email}`);
      return res;
    },
    enabled: !!user?.email,
  });
  // console.log(data);

  return (
    <div className=" h-screen w-20 lg:w-80">
      {/* controls */}
      <div className="flex flex-col p-0 lg:p-4 ">
        <Link to={"/"}>Home</Link>
        <Link to={"/DashBoard/profile"}>Profile</Link>
        <Link to={"DashBoard"}>Dashboard</Link>
        <Link to={"my-donation-requests"}>My DOnation Request</Link>
        {data?.data?.message === "admin access" ? (
          <>
            <Link to={"/DashBoard/AllUsers"}>All Users</Link>
            <Link to={"All-donation-requests"}>All Blood Requests</Link>
            <Link to={"dashboard/content-management"}>Mange Content</Link>
          </>
        ) : (
          ""
        )}
        {data?.data?.message === "Volunteer access" ? (
          <Link to={"dashboard/content-management"}>Mange Content</Link>
        ) : (
          ""
        )}
        <Link to={"/DashBoard/create-donation-request"}>Request Donation </Link>
      </div>
    </div>
  );
}

export default Sidebar;
