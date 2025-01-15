import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bgimg from "././../Assets/Ellipse8.png";
import { motion } from "framer-motion";
import Searchdonner from "../components/Searchdonner";
import WeareNowAt from "../components/WeareNowAt";
import AboutUs from "../components/AboutUs";

import { AUthfirebase } from "../Auth/AuthApi";

function Home() {
  const { user } = useContext(AUthfirebase);

  return (
    <>
      <motion.div
        style={{
          width: "100%",
        }}
        animate={{
          backgroundColor: ["#6a0b37", "#ffffff", "#6a0b37", "#ffffff"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "backIn",
        }}
      >
        <div
          className=" p-5"
          style={{
            backgroundImage: `url(${bgimg})`,
            backgroundSize: "contain ",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="py-20 text-center ">
            <h1 className=" lg:text-4xl font-bold text-3xl text-white">
              Donate Blood,Save Lives
            </h1>
            <p className="lg:text-3xl text-white   mt-4 text-center ">
              Your blood can give someone a second chance at life. Join the
              movement and make a difference in Bangladesh today. Every drop
              matters.
            </p>
          </div>

          <div className=" ml-7 ">
            {user ? (
              <Link
                to={"/DashBoard"}
                className=" py-2 rounded-l-xl bg-[#6a0b37] mr-[2px] px-6 bg-red-950 text-white border-none "
              >
                Go To DashBoard
              </Link>
            ) : (
              <Link
                to={"/registration"}
                className=" py-2 rounded-l-xl bg-[#6a0b37] mr-[2px] px-6 bg-red-950 text-white border-none "
              >
                Join as a Donner
              </Link>
            )}

            <Link
              to={"Search-donner"}
              className=" py-2 rounded-r-xl bg-[#6a0b37] px-6 bg-red-950 text-white border-none "
            >
              Search Donner
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="lg:flex  justify-center gap-6 p-6">
        <div className=" mx-auto mb-6 text-center">
          <h1 className="font-extrabold text-2xl">What is Blood?</h1>
          <p className="text-justify w-full lg:w-1/2 mx-auto">
            Blood is an automated blood service that connects blood searchers
            with voluntary donors in a moment through SMS. Blood is always a
            free service for all.
          </p>
        </div>
        <div className="w-1/2 mx-auto text-center ">
          <h1 className="font-extrabold text-2xl">Why us?</h1>
          <ul className="">
            <li>100% Automated</li>
            <li>Always free</li>
            <li>24×7 service</li>
            <li>All data is secured</li>
          </ul>
        </div>
      </div>
      <div className="w-4/12 lg:w-2/12  mx-auto mb-6">
        <button className="flex mx-auto  bg-red-900 lg:px-6 py-1 px-2 rounded-md text-white ">
          Learn More
        </button>
      </div>
      <Searchdonner />
      <WeareNowAt />
      <AboutUs />
    </>
  );
}

export default Home;
