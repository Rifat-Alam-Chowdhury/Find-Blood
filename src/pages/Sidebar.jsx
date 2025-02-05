import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CiMenuBurger } from "react-icons/ci";

import {
  MdBloodtype,
  MdDashboard,
  MdOutlinePresentToAll,
  MdPendingActions,
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
  //(data?.data?.message);

  return (
    <>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary border drawer-button lg:hidden"
      >
        <CiMenuBurger />
      </label>
      <div className="drawer  lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet />
        </div>
        <div className=" drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex flex-col gap-10 min-h-screen bg-white  ">
            <div className="">
              {" "}
              {data?.data?.message === "admin access" && (
                <h1 className=" font-extrabold p-2">Welcome Admin</h1>
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
            </div>
            <div className="flex flex-col space-y-8 p-4">
              <Link to={"/"}>
                <div className="flex items-center justify-center gap-2">
                  <FaHome size={20} />
                  <h1 className="">Home</h1>
                </div>
              </Link>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                    : "bg-transparent p-2 text-cyan-900"
                }
                to={"/DashBoard/profile"}
              >
                <div className="flex items-center  justify-center gap-2">
                  <CgProfile size={20} />
                  <h1 className="">Profile</h1>
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                    : "bg-transparent p-2 text-cyan-900"
                }
                to={"/DashBoard"}
                end
              >
                <div className="flex items-center justify-center gap-2">
                  <MdDashboard size={20} />
                  <h1 className="">Dashboard</h1>
                </div>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                    : "bg-transparent p-2 text-cyan-900"
                }
                to={"/DashBoard/my-appiled-posts"}
                end
              >
                <div className="flex items-center justify-center gap-2">
                  <MdPendingActions size={20} />
                  <h1 className="">My Applied post </h1>
                </div>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                    : "bg-transparent p-2 text-cyan-900"
                }
                to={"my-donation-requests"}
              >
                <div className="flex items-center justify-center gap-2">
                  <BiSolidDonateBlood size={20} />
                  <h1 className="">My Donation Request</h1>
                </div>
              </NavLink>
              {data?.data?.message === "admin access" && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                        : "bg-transparent p-2 text-cyan-900"
                    }
                    to={"/DashBoard/AllUsers"}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaUsers size={20} />
                      <h1 className="">All Users</h1>
                    </div>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                        : "bg-transparent p-2 text-cyan-900"
                    }
                    to={"All-donation-requests"}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MdBloodtype size={20} />
                      <h1 className="">All Blood Requests</h1>
                    </div>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                        : "bg-transparent p-2 text-cyan-900"
                    }
                    to={"content-management"}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <SiManageiq size={20} />
                      <h1 className="">Manage Content</h1>
                    </div>
                  </NavLink>
                </>
              )}
              {/* //// */}
              {data?.data?.message === "volunteer access" && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                        : "bg-transparent p-2 text-cyan-900"
                    }
                    to={"content-management"}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <SiManageiq size={20} />
                      <h1 className="">Manage Content</h1>
                    </div>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                        : "bg-transparent p-2 text-cyan-900"
                    }
                    to={"All-donation-requests"}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MdBloodtype size={20} />
                      <h1 className="">All Blood Requests</h1>
                    </div>
                  </NavLink>
                </>
              )}
              {/* ///// */}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-black bg-red-300 p-2 pl-2 border-2 rounded-xl"
                    : "bg-transparent p-2 text-cyan-900"
                }
                to={"/DashBoard/create-donation-request"}
              >
                <div className="flex items-center justify-center gap-2">
                  <VscGitStashApply size={20} />
                  <h1 className="">Request Donation</h1>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
