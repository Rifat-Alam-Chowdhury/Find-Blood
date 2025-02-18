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
import Statcs from "./Statatics/Statcs";
import Howweworks from "./How we works/Howweworks";
import Donnerreg from "./DonnerReg/Donnerreg";
import Bloodreqlanding from "./Bloodreq/Bloodreqlanding";
import Testimonials from "./Testimonials/Testimonials";
import FAQs from "./FAQS/FAQs";
import Aboutus from "./About us/Aboutus";

function Home() {
  const { user } = useContext(AUthfirebase);

  return (
    <>
      <Hero />
      <Statcs />
      <Howweworks />
      <Donnerreg />
      <Bloodreqlanding />
      <Testimonials />
      <FAQs />
      <Aboutus />
      {/* <Searchdonner />
      <WeareNowAt />
      <AboutUs /> */}
    </>
  );
}

export default Home;
