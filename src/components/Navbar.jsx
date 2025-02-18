import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthApi, { AUthfirebase } from "../Auth/AuthApi";
import Theme from "./Theme";

/**
 * will have a logo,
 * donation requests,
 *  blog, login,
 *  link before logged in.
 *
 *  funding links
 *   user avatar with dropdown(dashboard, logout button) after logged in.
 *
 */

function Navbar() {
  const { user, SignOutUser } = useContext(AUthfirebase);
  const NavOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "transform text-white scale-110  font-extrabold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/FindDonner"
          className={({ isActive }) =>
            isActive ? "transform scale-110 text-white font-extrabold" : ""
          }
        >
          Find Donner
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/Blogs"
          className={({ isActive }) =>
            isActive ? "transform scale-110 text-white font-extrabold" : ""
          }
        >
          Blog
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink
              to={"Funding"}
              className={({ isActive }) =>
                isActive ? "transform scale-110 text-white font-extrabold" : ""
              }
            >
              Help Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/DashBoard/profile"}
              className={({ isActive }) =>
                isActive ? "transform scale-110 text-white font-extrabold" : ""
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <Link
              onClick={SignOutUser}
              className={({ isActive }) =>
                isActive ? "transform scale-110 text-white font-extrabold" : ""
              }
            >
              Log Out
            </Link>
          </li>
        </>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "transform scale-110 text-white font-extrabold" : ""
            }
          >
            Log In
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar   lg:justify-around justify-stretch w-11/12 items-center mx-auto  ">
      {/* mobile */}
      <div className="drawer lg:hidden w-7 z-20">
        {/* mobile er menu icon */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* mobile er menu icon */}
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer">
            <svg
              xmlns={"http://www.w3.org/2000/svg"}
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <div className="drawer-side  w-full">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          {/* //linear-gradient(to right, #ffebed 0%, #e57373 100%) */}
          <ul className="menu bg-gradient-to-b from-[#ffebed] to-[#e57373] text-black min-h-full w-55 p-4 ">
            {/* Sidebar content here */}
            {NavOptions}
            <div className=" flex flex-col items-center mt-5   ">
              <button className=" p-2 text-primary-800 font-extrabold text-end border-t-2 item-center rounded-xl ">
                Emergency - 999
              </button>
              <Theme />
            </div>{" "}
          </ul>
        </div>
      </div>
      {/* mobile */}
      <div className="   ">
        <Link to={"/"} className=" text-xl font-extrabold">
          BLOOD
        </Link>
      </div>
      <div className="navbar-center hidden lg:block ">
        <ul className="flex justify-between gap-5 px-1">{NavOptions}</ul>
      </div>
      <div className=" hidden lg:flex lg:gap-2 lg:items-center  ">
        <Theme />
        <button className=" p-2 text-primary-200 font-extrabold text-end border-2 item-center rounded-xl ">
          Emergency - 999
        </button>
      </div>{" "}
    </div>
  );
}

export default Navbar;
