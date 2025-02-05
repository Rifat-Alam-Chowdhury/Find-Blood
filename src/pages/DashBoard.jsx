import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AUthfirebase } from "../Auth/AuthApi";
import Sidebar from "./Sidebar";
import useAxiosPublic from "../Hooks/useAxiosPublic";

function DashBoard() {
  return (
    <>
      {" "}
      <Sidebar />
    </>
  );
}

export default DashBoard;
