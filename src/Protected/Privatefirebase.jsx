import React, { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import LoaderSpinner from "../components/LoaderSpinner";
import { Navigate, useLocation } from "react-router-dom";

function Privatefirebase({ children }) {
  const { user, isloading } = useContext(AUthfirebase);
  const location = useLocation();

  if (isloading) {
    return <LoaderSpinner />;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}

export default Privatefirebase;
