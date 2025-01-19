import React, { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ModalForm from "../components/ModalForm";
import { AUthfirebase } from "../Auth/AuthApi";

function AdminAllBloodDonation() {
  const axiospublic = useAxiosPublic();
  const { user } = useContext(AUthfirebase);
  const [open, setopen] = useState(false);
  const [ModalInfo, setModalInfo] = useState(null);
  const SetOpenModal = (e) => {
    setopen(true);
    setModalInfo(e);
    console.log(e);
  };
  // console.log(ModalInfo);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "all blood",
    queryFn: async () => {
      const res = await axiospublic.post(`All-BloodReq/${user?.email}`);
      return res.data;
    },
  });

  console.log(data);

  const HandleStatusChange = async (status, _id) => {
    const res = await axiospublic.post(`Status-Change-On-Blood-Req`, {
      status: status,
      id: _id,
    });

    if (res.data.matchedCount === 1) {
      refetch();
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>recipient name</th>
              <th>recipient district</th>
              <th>recipient upazila</th>
              <th>donation date</th>
              <th>donation time</th>
              <th>blood group</th>

              <th>donation status</th>
              <th>Posted By</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {data?.allBloodRe?.length === 0
              ? "You have not made any requests"
              : data?.allBloodRe?.map((data, index) => {
                  return (
                    <tr className="bg-base-200" key={index}>
                      <th>{index + 1}</th>
                      <td>{data.recipientName}</td>
                      <td>{data.recipientDistrict}</td>
                      <td>{data.recipientUpazila}</td>
                      <td>{data.donationDate}</td>
                      <td>{data.donationTime}</td>

                      <td className="flex justify-center gap-6 ">
                        {data.bloodGroup}
                        <button
                          onClick={(e) => {
                            SetOpenModal(data);
                          }}
                          className="btn btn-xs btn-accent"
                        >
                          edit
                        </button>
                      </td>
                      {/* <td>
                        <select name="" id="">
                          {data.requestedperson?.map((person, index) => (
                            <option key={index} value={person}>
                              {person}
                            </option>
                          ))}
                        </select>
                      </td> */}

                      <td>
                        {data.donationStatus !== "Completed" ? (
                          <>
                            <button
                              disabled={data.donationStatus === "Inprogress"}
                              className="btn btn-xs btn-primary"
                              onClick={() =>
                                HandleStatusChange("Inprogress", data._id)
                              }
                            >
                              Inprogress
                            </button>
                            <button
                              disabled={data.donationStatus === "Done"}
                              className="btn btn-xs btn-primary"
                              onClick={() =>
                                HandleStatusChange("Done", data._id)
                              }
                            >
                              Done
                            </button>
                            <button
                              disabled={data.donationStatus === "Cancel"}
                              className="btn btn-xs btn-primary"
                              onClick={() =>
                                HandleStatusChange("cancel", data._id)
                              }
                            >
                              canceled
                            </button>
                          </>
                        ) : (
                          "Completed"
                        )}
                      </td>
                      {data.postedby === user.email ? (
                        <td> You</td>
                      ) : (
                        <td>{data.postedby}</td>
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <ModalForm
        open={open}
        setopen={setopen}
        ModalInfo={ModalInfo}
        refetch={refetch}
        role={data.role}
      />
    </>
  );
}

export default AdminAllBloodDonation;
