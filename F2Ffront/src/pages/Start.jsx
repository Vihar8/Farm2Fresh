import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="relative h-screen flex flex-col">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url(/farmerwithphone.jpg)]">
        <div className="absolute inset-0 bg-gradient-to-t from-green-800 via-green-700 to-green-500 opacity-60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        {/* Logo */}
        <img
          className="w-32 h-32 mb-6 animate-fadeIn rounded-full"
          src="/f2f.jpg"
          alt="Farm2Fresh Logo"
        />

        {/* Title and Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-lg animate-slideInUp">
          Get Fresh, Get Healthy <br /> with Farm2Fresh
        </h1>
        <p className="text-white text-xl sm:text-xl mt-4 max-w-md mx-auto drop-shadow-md animate-slideInUp delay-200">
          Experience the joy of farm-fresh produce delivered straight to your
          doorstep.
        </p>

        {/* Call-to-Action Button */}
        <Link
          to="/home"
          className="mt-8 px-10 py-4 text-lg sm:text-xl font-semibold text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 animate-slideInUp delay-400"
          aria-label="Continue to home page"
        >
          Continue
        </Link>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-4 text-white text-sm sm:text-base bg-black bg-opacity-50 backdrop-blur-md w-full text-center mt-auto">
        <p>
          Empowering Farmers, Enriching Lives -{" "}
          <a
            href="https://bodyshody.vercel.app/"
            className="underline hover:text-green-400"
          >
            Visit Farm2Fresh
          </a>
        </p>
      </div>
    </div>
  );
};

export default Start;
