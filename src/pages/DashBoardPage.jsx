import React, { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function DashBoardPage() {
  const { user } = useContext(AUthfirebase);

  const { data = [], isLoading } = useQuery({
    queryKey: "dashboarduser",
    queryFn: async () => {
      const res = await axios.post(
        `http://localhost:3000/Dashboard/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <>
      <div>
        <h1>
          Welcome {data?.name} your are a {data?.role}
        </h1>
      </div>
    </>
  );
}

export default DashBoardPage;
