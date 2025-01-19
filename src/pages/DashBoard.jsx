import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import Sidebar from "./Sidebar";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function DashBoard() {
  return (
    <div>
      <div className="flex h-screen rounded-xl">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
