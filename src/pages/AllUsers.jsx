import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";

function AllUsers() {
  const AxiosPublic = useAxiosPublic();
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all user"],
    queryFn: async () => {
      const res = await AxiosPublic();
      return res.data;
    },
  });

  const HandleBlock = async (e) => {
    const block = await AxiosPublic.post(`blockuser`, { id: e });
    if (block.status === 200) {
      refetch();
    }
    console.log(block.status);
  };
  const HandleUnBlock = async (e) => {
    const Unblock = await AxiosPublic.post(`Unblockuser`, { id: e });
    if (Unblock.status === 200) {
      refetch();
    }
  };
  const HandleChangeRole = async (e, _id) => {
    const ChangeRole = await AxiosPublic.post(`Changerole`, {
      id: _id,
      role: e,
    });
    if (ChangeRole.status === 200) {
      refetch();
    }
  };
  console.log(data); //status

  const filteredData =
    filterStatus === "all"
      ? data
      : data.filter((data) => data.status === filterStatus);

  return (
    <>
      <div className="flex justify-end mb-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className=" p-1 rounded-xl"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="Block">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-hidden h-screen">
        <table className="table font-extrabold">
          <thead className="text-center">
            <tr>
              <th>avatar</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Change</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredData?.map((donner) => (
              <tr key={donner._id}>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={donner.image}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>{donner?.name}</td>
                <td>{donner.email}</td>
                <td>{donner.role}</td>

                <td>
                  <select
                    disabled={donner.role === "admin"}
                    onChange={(e) => {
                      HandleChangeRole(e.target.value, donner._id);
                    }}
                    className="p-1 rounded-lg text-center"
                  >
                    <option value="" disabled selected>
                      {donner.role}
                    </option>
                    <option disabled={donner.role === "admin"} value="admin">
                      Admin
                    </option>
                    <option
                      disabled={donner.role === "Volunteer"}
                      value="volunteer"
                    >
                      Volunteer
                    </option>
                  </select>
                </td>
                <td>{donner.status}</td>

                {donner.role === "admin" ? (
                  <th>Admin</th>
                ) : (
                  <th>
                    {donner.status === "active" ? (
                      <button
                        onClick={() => {
                          HandleBlock(donner._id);
                        }}
                      >
                        block
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          HandleUnBlock(donner._id);
                        }}
                        className="btn btn-ghost btn-xs"
                      >
                        Unblock
                      </button>
                    )}
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllUsers;
