import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
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

  return (
    <div className=" h-screen w-64 text-center  pt-9 space-y-11 ">
      {data?.data?.message === "admin access" && <h1>Hello Admin</h1>}
      {data?.data?.message === "Volunteer access" && <h1>Hello Volunteer</h1>}
      {data?.data?.message !== "admin access" &&
        data?.data?.message !== "Volunteer access" && <h1>Hello Donor</h1>}
      {/* controls */}
      <div className="flex flex-col  space-y-8 ">
        <Link to={"/"}>Home</Link>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white bg-red-300     p-2 rounded-xl "
              : "bg-transparent "
          }
          to={"/DashBoard/profile"}
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white bg-red-300   p-2 rounded-xl   "
              : "bg-transparent "
          }
          to={"/DashBoard"}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white bg-red-300   p-2 rounded-xl   "
              : "bg-transparent "
          }
          to={"my-donation-requests"}
        >
          My DOnation Request
        </NavLink>
        {data?.data?.message === "admin access" ? (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-red-300   p-2 rounded-xl   "
                  : "bg-transparent "
              }
              to={"/DashBoard/AllUsers"}
            >
              All Users
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-red-300   p-2 rounded-xl   "
                  : "bg-transparent "
              }
              to={"All-donation-requests"}
            >
              All Blood Requests
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-red-300   p-2 rounded-xl   "
                  : "bg-transparent "
              }
              to={"dashboard/content-management"}
            >
              Mange Content
            </NavLink>
          </>
        ) : (
          ""
        )}
        {data?.data?.message === "Volunteer access" ? (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-red-300   p-2 rounded-xl   "
                  : "bg-transparent "
              }
              to={"content-management"}
            >
              Mange Content
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-red-300   p-2 rounded-xl   "
                  : "bg-transparent "
              }
              to={"All-donation-requests"}
            >
              All Blood Requests
            </NavLink>
          </>
        ) : (
          ""
        )}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white bg-red-300   p-2 rounded-xl   "
              : "bg-transparent "
          }
          to={"/DashBoard/create-donation-request"}
        >
          Request Donation{" "}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
