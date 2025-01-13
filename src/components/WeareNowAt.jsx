import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";
function WeareNowAt() {
  return (
    <>
      {" "}
      <div className="text-center text-2xl lg:text-4xl mt-6">
        <h1>We're a network of</h1>
      </div>
      <div className="flex justify-between gap-5 w-9/12 mx-auto mt-6 items-center ">
        <div className=" text-center p-2">
          <span>
            <IoPeopleOutline size={60} color="red" />
          </span>
          700 Donors
        </div>
        <div className=" text-center p-2">
          <div>
            <span>
              <FaLocationDot size={55} color="red" />
            </span>
            64 District
          </div>
        </div>
        <div>
          <div>
            <span>
              <MdBloodtype size={60} color="red" />
            </span>
            8 Blood Groups
          </div>
        </div>
      </div>
    </>
  );
}

export default WeareNowAt;
