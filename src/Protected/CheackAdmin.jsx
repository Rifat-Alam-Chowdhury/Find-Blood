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
  //   console.log(data?.data?.message);
  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (data?.data?.message === "admin access") {
    return children;
  } else {
    return <div>warning access deny</div>;
  }
}

export default CheackAdmin;
