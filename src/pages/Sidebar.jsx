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

  return (
    <>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost p-2 m-2 lg:hidden text-red-500 hover:bg-red-50"
      >
        <CiMenuBurger className="w-6 h-6" />
      </label>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 w-64 border-r-2 border-red-200">
            <div className="p-4 bg-red-500 text-white border-b-2 border-red-600">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <BiSolidDonateBlood className="w-6 h-6" />
                Blood
              </h1>
              <div className="mt-2 text-sm">
                {data?.data?.message === "admin access" && (
                  <span className="badge badge-error">Admin Dashboard</span>
                )}
                {data?.data?.message === "Volunteer access" && (
                  <span className="badge badge-warning">Volunteer Panel</span>
                )}
                {data?.data?.message !== "admin access" &&
                  data?.data?.message !== "Volunteer access" && (
                    <span className="badge badge-success">Donor Profile</span>
                  )}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-red-500 text-white shadow-md"
                      : "hover:bg-red-100 text-red-800"
                  }`
                }
              >
                <FaHome className="w-5 h-5" />
                Home
              </NavLink>

              <NavLink
                to={"/DashBoard/profile"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-red-500 text-white shadow-md"
                      : "hover:bg-red-100 text-red-800"
                  }`
                }
              >
                <CgProfile className="w-5 h-5" />
                Profile
              </NavLink>

              <NavLink
                to={"/DashBoard"}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-red-500 text-white shadow-md"
                      : "hover:bg-red-100 text-red-800"
                  }`
                }
              >
                <MdDashboard className="w-5 h-5" />
                Dashboard
              </NavLink>

              {data?.data?.message === "admin access" && (
                <>
                  <div className="pt-4">
                    <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                      Admin Tools
                    </h3>
                    <div className="space-y-2">
                      <NavLink
                        to={"/DashBoard/AllUsers"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-red-500 text-white shadow-md"
                              : "hover:bg-red-100 text-red-800"
                          }`
                        }
                      >
                        <FaUsers className="w-5 h-5" />
                        All Users
                      </NavLink>

                      <NavLink
                        to={"All-donation-requests"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-red-500 text-white shadow-md"
                              : "hover:bg-red-100 text-red-800"
                          }`
                        }
                      >
                        <MdBloodtype className="w-5 h-5" />
                        Blood Requests
                      </NavLink>
                    </div>
                  </div>
                </>
              )}

              {data?.data?.message === "Volunteer access" && (
                <div className="pt-4">
                  <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                    Volunteer Tools
                  </h3>
                  <div className="space-y-2">
                    <NavLink
                      to={"content-management"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-red-500 text-white shadow-md"
                            : "hover:bg-red-100 text-red-800"
                        }`
                      }
                    >
                      <SiManageiq className="w-5 h-5" />
                      Manage Content
                    </NavLink>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                  Donation
                </h3>
                <div className="space-y-2">
                  <NavLink
                    to={"/DashBoard/create-donation-request"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-red-500 text-white shadow-md"
                          : "hover:bg-red-100 text-red-800"
                      }`
                    }
                  >
                    <VscGitStashApply className="w-5 h-5" />
                    Request Donation
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

{
  /* <>
  <label
    htmlFor="my-drawer-2"
    className="btn btn-ghost p-2 m-2 lg:hidden text-red-500 hover:bg-red-50"
  >
    <CiMenuBurger className="w-6 h-6" />
  </label>

  <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      <Outlet />
    </div>

    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

      <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 w-64 border-r-2 border-red-200">
      
        <div className="p-4 bg-red-500 text-white border-b-2 border-red-600">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BiSolidDonateBlood className="w-6 h-6" />
            Blood
          </h1>
          <div className="mt-2 text-sm">
            {data?.data?.message === "admin access" && (
              <span className="badge badge-error">Admin Dashboard</span>
            )}
            {data?.data?.message === "Volunteer access" && (
              <span className="badge badge-warning">Volunteer Panel</span>
            )}
            {data?.data?.message !== "admin access" &&
              data?.data?.message !== "Volunteer access" && (
                <span className="badge badge-success">Donor Profile</span>
              )}
          </div>
        </div>

        
        <div className="p-4 space-y-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "hover:bg-red-100 text-red-800"
              }`
            }
          >
            <FaHome className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink
            to={"/DashBoard/profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "hover:bg-red-100 text-red-800"
              }`
            }
          >
            <CgProfile className="w-5 h-5" />
            Profile
          </NavLink>

          <NavLink
            to={"/DashBoard"}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "hover:bg-red-100 text-red-800"
              }`
            }
          >
            <MdDashboard className="w-5 h-5" />
            Dashboard
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

     
          {data?.data?.message === "admin access" && (
            <>
              <div className="pt-4">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                  Admin Tools
                </h3>
                <div className="space-y-2">
                  <NavLink
                    to={"/DashBoard/AllUsers"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-red-500 text-white shadow-md"
                          : "hover:bg-red-100 text-red-800"
                      }`
                    }
                  >
                    <FaUsers className="w-5 h-5" />
                    All Users
                  </NavLink>

                  <NavLink
                    to={"All-donation-requests"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-red-500 text-white shadow-md"
                          : "hover:bg-red-100 text-red-800"
                      }`
                    }
                  >
                    <MdBloodtype className="w-5 h-5" />
                    Blood Requests
                  </NavLink>
                </div>
              </div>
            </>
          )}


          {data?.data?.message === "Volunteer access" && (
            <div className="pt-4">
              <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                Volunteer Tools
              </h3>
              <div className="space-y-2">
                <NavLink
                  to={"content-management"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-red-500 text-white shadow-md"
                        : "hover:bg-red-100 text-red-800"
                    }`
                  }
                >
                  <SiManageiq className="w-5 h-5" />
                  Manage Content
                </NavLink>
              </div>
            </div>
          )}

          <div className="pt-4">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
              Donation
            </h3>
            <div className="space-y-2">
              <NavLink
                to={"/DashBoard/create-donation-request"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-red-500 text-white shadow-md"
                      : "hover:bg-red-100 text-red-800"
                  }`
                }
              >
                <VscGitStashApply className="w-5 h-5" />
                Request Donation
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>; */
}

{
  /* <>
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
</> */
}
