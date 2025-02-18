import React from "react";

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary-900 to-primary-800 h-screen flex lg:items-center justify-center ">
      <div className="absolute inset-0 opacity-10 ">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10h10v10H10zM30 30h10v10H30zM50 50h10v10H50zM70 70h10v10H70zM90 90h10v10H90z"
            fill="currentColor"
            className="text-primary-600"
          />
        </svg>
      </div>

      <div className=" mt-5 lg:mt-0 lg:w-9/12 mx-auto  lg:px-4 relative z-10 ">
        <div className="flex flex-col    lg:flex-row items-center justify-between">
          <div className="text-left  lg:w-1/2 mb-5 lg:p-0 w-11/12 mx-auto">
            <h1 className="text-2xl  md:text-6xl  font-bold text-white mb-6 leading-tight">
              Save Lives With Your
              <span className="text-primary-200 block">Blood Donation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Join thousands of life-saving heroes in our community. Your single
              donation can save up to 3 lives. Be the reason someone smiles
              today.
            </p>
            <button className="bg-white text-primary-900 lg:px-8 lg:py-4 px-4 py-2 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto lg:mx-0">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Donate Now
            </button>
          </div>

          <div className="lg:w-1/2  flex justify-center ">
            <div className="relative lg:w-64 lg:h-64 w-40 h-36 animate-pulse-slow">
              <div className="absolute inset-0 bg-primary-700 rounded-full opacity-30 blur-xl "></div>
              <svg
                className="w-full h-full text-primary-200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M100 15c-25 45-75 60-75 100 0 45 40 85 75 85s75-40 75-85c0-40-50-55-75-100z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="lg:mt-16 mt-5 grid grid-cols-2 lg:grid-cols-4   lg:gap-4 gap-1 w-11/12 mx-auto  ">
          {[
            { number: "10k+", label: "Donors Registered" },
            { number: "50k+", label: "Lives Saved" },
            { number: "100+", label: "Partners" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm"
            >
              <div className="lg:text-3xl font-bold text-center lg:text-left text-primary-200">
                {stat.number}
              </div>
              <div className="text-xs text-gray-200 text-center lg:text-left mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
