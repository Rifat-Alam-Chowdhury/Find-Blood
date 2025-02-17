import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bgimg from "././../Assets/Ellipse8.png";
import { motion } from "framer-motion";
import Searchdonner from "../components/Searchdonner";
import WeareNowAt from "../components/WeareNowAt";
import AboutUs from "../components/AboutUs";

import { AUthfirebase } from "../Auth/AuthApi";
import { ToastContainer } from "react-toastify";
import Hero from "./hero/Hero";

function Home() {
  const { user } = useContext(AUthfirebase);

  return (
    <>
      <Hero />
      <Searchdonner />
      <WeareNowAt />
      <AboutUs />
    </>
  );
}

export default Home;
