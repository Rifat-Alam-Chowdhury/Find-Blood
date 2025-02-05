import React from "react";
import { MdBloodtype } from "react-icons/md";

function LoaderSpinner() {
  return (
    <>
      <div className=" flex justify-center mx-auto my-auto ">
        <MdBloodtype size={100} className="text-red-300 animate-ping" />
      </div>
    </>
  );
}

export default LoaderSpinner;
