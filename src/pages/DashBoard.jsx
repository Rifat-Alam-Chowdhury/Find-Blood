import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function DashBoard() {
  const { data, isLoading } = useQuery({
    queryKey: "alldata",
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}`);
      return res.data;
    },
  });
  console.log(data);
  return <div>DashBoard</div>;
}

export default DashBoard;
