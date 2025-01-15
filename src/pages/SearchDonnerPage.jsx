import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import LoaderSpinner from "../components/LoaderSpinner";

function SearchDonnerPage() {
  const location = useLocation();
  const [group, distric, Division] = uselocationapi([]);
  const { name, district, date, division } = location.state || [];
  console.log(name, district, date, division);
  const [filters, setFilters] = useState({
    group: "",
    division: "",
    district: "",
    date: "",
  });

  const { data: Alldonner = [], isLoading } = useQuery({
    queryKey: ["allDonners", filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `${import.meta.env.VITE_URL}alldoners?${params}`
      );
      return response.data;
    },
  });
  console.log(isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedFilters = {
      group: formData.get("group") || "",
      division: formData.get("Divisions") || "",
      district: formData.get("district") || "",
      date: formData.get("date") || "",
    };
    setFilters(updatedFilters);
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

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="date"
                className="grow"
                name="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </label>
            <button type="submit" className="btn">
              Search
            </button>
          </div>
        </form>

        <div>
          {isLoading ? (
            <LoaderSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Alldonner?.map((donner) => (
                    <tr key={donner._id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={donner.image} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{donner.name}</div>
                            <div className="text-sm opacity-50">
                              {donner.bloodGroup}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {donner.district}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {donner.role}
                        </span>
                      </td>
                      <td>{donner.status}</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          Request
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchDonnerPage;
