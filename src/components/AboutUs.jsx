import React from "react";

function AboutUs() {
  return (
    <>
      <div className="bg-base-200 p-5">
        <div className="text-center p-6">
          <div>
            <h1 className="font-extrabold">About Us</h1>
            <p className="">
              Blood is an automated blood service that connects blood searchers
              with voluntary blood donors in a moment through SMS. Blood is a
              not-for-profit initiative to aware people of voluntary blood
              donation in Bangladesh.
            </p>
          </div>
        </div>
        <div className="w-4/12 lg:w-2/12  mx-auto mb-6">
          <button className="flex mx-auto  bg-red-900 lg:px-6 py-1 px-2 rounded-md ">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
