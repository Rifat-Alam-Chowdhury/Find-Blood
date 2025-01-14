import React from "react";
import { Link, NavLink } from "react-router-dom";

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
  const NavOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-700" : "")}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/donner"
          className={({ isActive }) => (isActive ? "text-red-700" : "")}
        >
          Donner
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "text-red-700" : "")}
        >
          Blog
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "text-red-700" : "")}
        >
          Log In
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar justify-between bg-[#6a0b37] text-white">
      {/* todo:mobile */}
      <div className="drawer lg:hidden w-7 z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <label htmlFor="my-drawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {NavOptions}
          </ul>
        </div>
      </div>

      <div className=" ">
        <Link to={"/"} className=" text-xl">
          Blood
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex justify-between gap-5 px-1">{NavOptions}</ul>
      </div>

      {/* //search */}
      <div className="hidden lg:block   ">
        <div>
          <label className=" flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className=" border-2 ml-2 p-1 rounded-lg "
              placeholder="Search Blood Group"
            />
          </label>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">DashBoard</a>
          </li>
          <button className="">Log Out</button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
