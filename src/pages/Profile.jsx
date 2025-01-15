import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import LoaderSpinner from "../components/LoaderSpinner";
import { AUthfirebase } from "../Auth/AuthApi";

function Profile() {
  const axiosapi = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  console.log(user?.email); //

  const isloading = true;

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "userprofile",
    queryFn: async () => {
      const data = await axiosapi.post("Dashboard/profile", {
        email: user?.email,
      });
      return data.data;
    },

    enabled: !!user?.email,
  });
  console.log(data);

  return (
    <>
      <div className=" w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <LoaderSpinner />
          </div>
        ) : (
          <div className=" mt-5">
            <div className="mx-auto w-32 h-32 relative  border-4 border-red-500 rounded-full overflow-hidden">
              <img className="object-cover object-center " src={data?.image} />
            </div>
            <div className="text-center mt-2">
              <h2 className="font-semibold">{data?.name}</h2>
              <p className="text-gray-500">{data?.role}</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
              <li className="flex flex-col items-center justify-around">
                <div>{data?.district}</div>
              </li>
              <li className="flex flex-col items-center justify-around">
                <div>{data?.division}</div>
              </li>
              <li className="flex flex-col items-center justify-between">
                <div>{data?.bloodGroup}</div>
              </li>
              <li className="flex flex-col items-center justify-around">
                <div>{data?.status}</div>
              </li>
            </ul>
            <div className="p-4  mx-8 mt-2">
              <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
                Edi Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
