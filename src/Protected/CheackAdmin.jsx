import React, { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoaderSpinner from "../components/LoaderSpinner";

function CheackAdmin({ children }) {
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
  //   //(data?.data?.message);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-auto">
        <LoaderSpinner />;
      </div>
    );
  }
  if (data?.data?.message === "admin access") {
    return children;
  }
  if (data?.data?.message === "volunteer access") {
    return children;
  } else {
    return (
      <div className="w-full flex justify-center my-auto">
        <LoaderSpinner />;
      </div>
    );
  }
}

export default CheackAdmin;
