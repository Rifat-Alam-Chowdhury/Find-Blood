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
  });

  const { data: Alldonner = [], isLoading } = useQuery({
    queryKey: ["allDonners", filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const response = await AxiosPublic(`alldoners?${params}`);
      return response.data;
    },
  });
  console.log(Alldonner);

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

  const handleRequest = async (e) => {
    const req = AxiosPublic.post("request", { email: user?.email, post: e });
    console.log(user?.email, "has requested on this", e);
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
            <div className="flex items-center border-2 justify-center h-96">
              <LoaderSpinner />
            </div>
          ) : (
            <div className="overflow-x-auto p-5 w-11/12 mx-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>District</th>
                    <th>Division</th>
                    <th>Date</th>
                    <th>Hospital</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {Alldonner?.map((donner) => (
                    <tr key={donner._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{donner.name}</div>
                            <div className="text-sm opacity-50">
                              {donner.bloodGroup}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{donner.recipientDistrict}</td>
                      <td>{donner.recipientUpazila}</td>
                      <td>{donner.donationDate}</td>
                      <td>{donner.hospitalName}</td>
                      <td>{donner.postedby}</td>
                      <th>
                        {donner.requestedPerson.email === user?.email ? (
                          <button className="btn btn-ghost btn-xs">
                            already requested
                          </button>
                        ) : (
                          <button
                            disabled={user?.email === donner.postedby}
                            onClick={() => {
                              handleRequest(donner._id);
                            }}
                            className="btn btn-ghost btn-xs"
                          >
                            Request
                          </button>
                        )}
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
