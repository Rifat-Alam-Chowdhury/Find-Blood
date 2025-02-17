import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthApi, { AUthfirebase } from "../Auth/AuthApi";

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
            isActive ? "text-red-700 transform  scale-110 font-extrabold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/FindDonner"
          className={({ isActive }) =>
            isActive ? "text-red-700 transform  scale-110 font-extrabold" : ""
          }
        >
          Find Donner
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/Blogs"
          className={({ isActive }) =>
            isActive ? "text-red-700 transform  scale-110 font-extrabold" : ""
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
                isActive
                  ? "text-red-700 transform  scale-110 font-extrabold"
                  : ""
              }
            >
              Help Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/DashBoard/profile"}
              className={({ isActive }) =>
                isActive
                  ? "text-red-700 transform  scale-110 font-extrabold"
                  : ""
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <Link
              onClick={SignOutUser}
              className={({ isActive }) =>
                isActive
                  ? "text-red-700 transform  scale-110 font-extrabold"
                  : ""
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
              isActive
                ? "text-red-700 transform  scale-110 font-extrabold "
                : ""
            }
          >
            Log In
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar lg:justify-around justify-stretch w-11/12 items-center mx-auto  ">
      {/* mobile */}
      <div className="drawer lg:hidden w-7 z-10">
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
          <ul className="menu bg-base-200 text-base-content min-h-full w-55 p-4">
            {/* Sidebar content here */}
            {NavOptions}
            <div className=" mx-auto mt-10">
              <button className=" px-2 py-3 bg-red-500 text-white rounded-xl ">
                Emergency
              </button>
            </div>
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

      <div className=" hidden lg:block">
        <button className=" p-2 bg-red-500 text-black font-extrabold text-sm rounded-xl ">
          Emergency
        </button>
      </div>
    </div>
  );
}

export default Navbar;
