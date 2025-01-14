import React from "react";
import { useLocation } from "react-router-dom";
import uselocationapi from "../Hooks/uselocationapi";

function SearchDonnerPage() {
  const location = useLocation();
  const [group, distric] = uselocationapi([]);
  const { name, district, date } = location.state || [];
  console.log(name, district, date);

  return (
    <>
      <div className="text-center">
        <h1>Search Donors</h1>
      </div>
      <form className="w-11/12 mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <select className="select w-full max-w-xs" name="group">
            <option disabled selected>
              {name ? name : "Group"}
            </option>
            {group?.map((group, index) => (
              <option key={index} value={group.group}>
                {group.group}
              </option>
            ))}
          </select>

          <select className="select w-full max-w-xs" name="district">
            <option disabled selected>
              {district ? district : "District"}
            </option>
            {distric?.map((district, index) => (
              <option key={index} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <label className="input input-bordered flex items-center gap-2">
            <input
              type="date"
              className="grow"
              name="date"
              placeholder="Date"
              value={date || new Date().toISOString().split("T")[0]}
            />
          </label>
          <button type="submit" className="btn">
            search
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchDonnerPage;
