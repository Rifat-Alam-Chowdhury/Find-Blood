import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  MdBloodtype,
  MdDashboard,
  MdOutlinePresentToAll,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { SiManageiq } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";

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
    <div className=" h-screen lg:w-64 w-10 text-center  pt-9 space-y-11 ">
      {data?.data?.message === "admin access" && (
        <h1 className="text-xs text-center font-extrabold p-2">
          Welcome Admin
        </h1>
      )}
      {data?.data?.message === "Volunteer access" && (
        <h1 className="text-xs text-center font-extrabold p-2">
          Welcome Volunteer
        </h1>
      )}
      {data?.data?.message !== "admin access" &&
        data?.data?.message !== "Volunteer access" && (
          <h1 className="text-xs text-center font-extrabold p-2">
            Welcome Donor
          </h1>
        )}
      {/* controls */}
      <div className="flex flex-col space-y-8">
        <Link to={"/"}>
          <div className="flex items-center justify-center gap-2">
            <FaHome size={20} />
            <h1 className="hidden lg:block">Home</h1>
          </div>
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
              : "bg-transparent p-2"
          }
          to={"/DashBoard/profile"}
        >
          <div className="flex items-center  justify-center gap-2">
            <CgProfile size={20} />
            <h1 className="hidden lg:block">Profile</h1>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
              : "bg-transparent p-2"
          }
          to={"/DashBoard"}
          end
        >
          <div className="flex items-center justify-center gap-2">
            <MdDashboard size={20} />
            <h1 className="hidden lg:block">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
              : "bg-transparent p-2"
          }
          to={"my-donation-requests"}
        >
          <div className="flex items-center justify-center gap-2">
            <BiSolidDonateBlood size={20} />
            <h1 className="hidden lg:block">My Donation Request</h1>
          </div>
        </NavLink>
        {data?.data?.message === "admin access" && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
                  : "bg-transparent p-2"
              }
              to={"/DashBoard/AllUsers"}
            >
              <div className="flex items-center justify-center gap-2">
                <FaUsers size={20} />
                <h1 className="hidden lg:block">All Users</h1>
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
                  : "bg-transparent p-2"
              }
              to={"All-donation-requests"}
            >
              <div className="flex items-center justify-center gap-2">
                <MdBloodtype size={20} />
                <h1 className="hidden lg:block">All Blood Requests</h1>
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
                  : "bg-transparent p-2"
              }
              to={"content-management"}
            >
              <div className="flex items-center justify-center gap-2">
                <SiManageiq size={20} />
                <h1 className="hidden lg:block">Manage Content</h1>
              </div>
            </NavLink>
          </>
        )}
        {data?.data?.message === "Volunteer access" && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
                  : "bg-transparent p-2"
              }
              to={"content-management"}
            >
              <div className="flex items-center justify-center gap-2">
                <SiManageiq size={20} />
                <h1 className="hidden lg:block">Manage Content</h1>
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
                  : "bg-transparent p-2"
              }
              to={"All-donation-requests"}
            >
              <div className="flex items-center justify-center gap-2">
                <MdBloodtype size={20} />
                <h1 className="hidden lg:block">All Blood Requests</h1>
              </div>
            </NavLink>
          </>
        )}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-cyan-300 bg-red-300 p-2 pl-2 border-2 rounded-xl"
              : "bg-transparent p-2"
          }
          to={"/DashBoard/create-donation-request"}
        >
          <div className="flex items-center justify-center gap-2">
            <VscGitStashApply size={20} />
            <h1 className="hidden lg:block">Request Donation</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
