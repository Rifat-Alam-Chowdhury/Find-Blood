import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Dashboardcard() {
  const { data } = useQuery({
    queryKey: ["dashboardinfo"],
    queryFn: async () => {
      const res = await axios.post(`http://localhost:3000/Dashboard/profile`);
      return res.data;
    },
  });
  console.log(data);

  return (
    <>
      <div className="flex">
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img src={" "} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Total User</h2>
            <p>{data?.totoalUser}</p>
          </div>
          <Link to={"/DashBoard/AllUsers"}>All User</Link>
        </div>
        {/* card2 */}
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img src={" "} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Total User</h2>
            <p>{data?.totoalUser}</p>
          </div>
        </div>
        {/* card3 */}
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img src={" "} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Total Blood request</h2>
            <p>{data?.TotalBloodReq}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboardcard;
