import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Video Section */}
      <div className="w-full h-[45vh] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/f2f.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Discover Our Website
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
          Watch this short video to learn more about what we offer. Explore our platform, designed to provide the best experience for all your needs.
        </p>
        <Link
          className="px-8 py-4 bg-blue-600 text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          to="/commoditylisting"
        >
          Explore Our Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
