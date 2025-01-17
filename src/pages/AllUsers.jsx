import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";

function AllUsers() {
  const AxiosPublic = useAxiosPublic();

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

  return (
    <>
      <div className="overflow-x-auto p-5 w-11/12 mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>avatar</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((donner) => (
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
                    onChange={(e) => {
                      HandleChangeRole(e.target.value, donner._id);
                    }}
                    name=""
                    id=""
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
                  ""
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
