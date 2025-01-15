import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import InfoTable from "../components/InfoTable";

function UserDonation() {
  const { user } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: "userdonation",
    queryFn: async () => {
      const res = await axios.post(`${import.meta.env.VITE_URL}donnerdetails`, {
        email: user,
      });
      return res.data;
    },
  });

  return <InfoTable data={data} />;
}

export default UserDonation;
