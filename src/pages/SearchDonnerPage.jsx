import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import LoaderSpinner from "../components/LoaderSpinner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AUthfirebase } from "../Auth/AuthApi";

function SearchDonnerPage() {
  const location = useLocation();
  const [group, distric, Division] = uselocationapi([]);
  const { user } = useContext(AUthfirebase);
  const { name, district, date, division } = location.state || [];
  const AxiosPublic = useAxiosPublic();
  const [filters, setFilters] = useState({
    group: "",
    division: "",
    district: "",
    date: "",
    role: "Donor",
  });
  //(filters);

  const {
    data: Alldonner = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonners", filters],
    queryFn: async () => {
      const response = await AxiosPublic(`alldoners`, {
        params: { Filter: filters },
      });
      return response.data;
    },
  });
  //(Alldonner);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedFilters = {
      bloodGroup: formData.get("group") || "",
      recipientUpazila: formData.get("Divisions") || "",
      recipientDistrict: formData.get("district") || "",
      role: formData.get("Donor") || "Donor",
    };
    setFilters(updatedFilters);
  };

  const handleRequest = async (e) => {
    const req = AxiosPublic.post("request", { email: user?.email, post: e });
    refetch();
    //(user?.email, "has requested on this", e);
  };

  return (
    <>
      <div className="text-center">
        <h1>Search Donors</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="w-11/12 mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <select className="select w-full max-w-xs" name="group">
              <option value="">Group</option>
              {group?.map((grp, index) => (
                <option key={index} value={grp.group}>
                  {grp.group}
                </option>
              ))}
            </select>

            <select className="select w-full max-w-xs" name="Divisions">
              <option value="">Divisions</option>
              {Division?.map((div, index) => (
                <option key={index} value={div.division}>
                  {div.division}
                </option>
              ))}
            </select>

            <select className="select w-full max-w-xs" name="district">
              <option value="">District</option>
              {distric?.map((dist, index) => (
                <option key={index} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn">
              Search
            </button>
          </div>
        </form>

        <div>
          {isLoading ? (
            <div className="flex items-center border-2 justify-center h-96">
              <LoaderSpinner />
            </div>
          ) : (
            <div className="overflow-x-auto p-5 w-11/12 mx-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>District</th>
                    <th>Division</th>
                    <th>Contact</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Alldonner?.map((donner) => (
                    <tr>
                      <td>{donner?.recipientName}</td>
                      <td>{donner?.bloodGroup}</td>
                      <td>{donner?.recipientDistrict}</td>
                      <td>{donner?.recipientUpazila}</td>
                      <td>{donner?.postedby}</td>
                      <td>{donner?.donationStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {Alldonner.length === 0 && (
                <>
                  <h1 className="text-center">
                    No Donor Found From Your Search Try Another Search Option
                  </h1>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchDonnerPage;
