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

  console.log(data.role);

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
              : data?.allBloodRe?.map((datas, index) => {
                  return (
                    <tr className="bg-base-200" key={index}>
                      <th>{index + 1}</th>
                      <td>{datas.recipientName}</td>
                      <td>{datas.recipientDistrict}</td>
                      <td>{datas.recipientUpazila}</td>
                      <td>{datas.donationDate}</td>
                      <td>{datas.donationTime}</td>

                      <td className="flex justify-center gap-6 ">
                        {datas.bloodGroup}

                        <button
                          disabled={data?.role === "Volunteer"}
                          onClick={(e) => {
                            SetOpenModal(datas);
                          }}
                          className="btn btn-xs btn-accent"
                        >
                          edit
                        </button>
                      </td>

                      <td>
                        {datas.donationStatus !== "Completed" ? (
                          <select
                            className="select select-xs select-primary"
                            value={datas.donationStatus}
                            onChange={(e) =>
                              HandleStatusChange(e.target.value, datas._id)
                            }
                          >
                            <option
                              value="Inprogress"
                              disabled={datas.donationStatus === "Inprogress"}
                            >
                              Inprogress
                            </option>
                            <option
                              value="Done"
                              disabled={datas.donationStatus === "Done"}
                            >
                              Done
                            </option>
                            <option
                              value="Canceled"
                              disabled={datas.donationStatus === "Canceled"}
                            >
                              Canceled
                            </option>
                          </select>
                        ) : (
                          "Completed"
                        )}
                      </td>

                      {datas.postedby === user.email ? (
                        <td> You</td>
                      ) : (
                        <td>{datas.postedby}</td>
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
