import React, { useContext } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AUthfirebase } from "../Auth/AuthApi";
import { useQuery } from "@tanstack/react-query";
import { FaQuestion } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

function ReqModal({ setModalOpen, ModalOpen, id, refetch }) {
  const { user } = useContext(AUthfirebase);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const HandleStatusChange = async () => {
    const res = await axiosPublic.post(`bloodreqeduser`, {
      user: user?.email,
      id: id,
    });
    //(res.data + "res");

    if (res.data.matchedCount === 1) {
      setModalOpen(false);

      toast.success("Request Has Gone to the Poster", {
        autoClose: 2000,
        onClose: () => {
          refetch();
          navigate("/BloodDonationrequests");
        },
      });
    }
  };

  return (
    <Dialog
      open={ModalOpen}
      onClose={setModalOpen}
      className="relative 1an-50 z-10"
    >
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-cyan-50 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-cyan-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <FaQuestion
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base flex gap-2 font-semibold text-gray-900"
                  >
                    <h1>Are You Sure</h1>
                    {user?.displayName}
                  </DialogTitle>
                  <div className="mt-2">{user?.email}</div>
                </div>
              </div>
            </div>
            <div className="bg-cyan-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={HandleStatusChange}
                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto"
              >
                Donate
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setModalOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ReqModal;
