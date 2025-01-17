import React, { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import LoaderSpinner from "../components/LoaderSpinner";

function CheackVolunteer({ children }) {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["isvolunteer"],
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
  if (data?.data?.message === "Volunteer access") {
    return children;
  } else {
    return <div>warning access deny from check vlunteer</div>;
  }
}

export default CheackVolunteer;
