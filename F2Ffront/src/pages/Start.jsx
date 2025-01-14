// import React from "react";
// import { Link } from "react-router-dom";

// const Start = () => {
//   return (
//     <div className="relative h-screen flex flex-col">
//       {/* Background Image with Gradient Overlay */}
//       <div className="absolute inset-0 bg-cover bg-center bg-[url(/farmerwithphone.jpg)]">
//         <div className="absolute inset-0 bg-gradient-to-t from-green-800 via-green-700 to-green-500 opacity-60"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
//         {/* Logo */}
//         <img
//           className="w-32 h-32 mb-6 animate-fadeIn rounded-full"
//           src="/f2f.jpg"
//           alt="Farm2Fresh Logo"
//         />

//         {/* Title and Subtitle */}
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-lg animate-slideInUp">
//           Get Fresh, Get Healthy <br /> with Farm2Fresh
//         </h1>
//         <p className="text-white text-xl sm:text-xl mt-4 max-w-md mx-auto drop-shadow-md animate-slideInUp delay-200">
//           Experience the joy of farm-fresh produce delivered straight to your
//           doorstep.
//         </p>

//         {/* Call-to-Action Button */}
//         <Link
//           to="/home"
//           className="mt-8 px-10 py-4 text-lg sm:text-xl font-semibold text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 animate-slideInUp delay-400"
//           aria-label="Continue to home page"
//         >
//           Continue
//         </Link>
//       </div>

//       {/* Footer */}
//       <div className="relative z-10 py-4 text-white text-sm sm:text-base bg-black bg-opacity-50 backdrop-blur-md w-full text-center mt-auto">
//         <p>
//           Empowering Farmers, Enriching Lives -{" "}
//           <a
//             href="https://farm2fresh-omega.vercel.app/home"
//             className="underline hover:text-green-400"
//           >
//             Visit Farm2Fresh
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Start;

import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1495570689269-d883b1224443?auto=format&fit=crop&q=80"
            alt="Organic Vegetables Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-700/80 to-gray-600/80"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="bg-green-500 p-2 rounded-full shadow-xl">
              <img
                src="/f2f.jpg"
                alt="Farm2Fresh Logo"
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
                Where Buyers and Sellers
                <span className="block text-green-300">Meet and Deal</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto">
                Discover a platform that connects you directly with buyers and sellers, 
                making deals easier, faster, and more convenient.
              </p>
            </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/home"
                className="mt-8 px-10 py-4 text-lg sm:text-xl font-semibold text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 hover:scale-40 focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:translate-y-[-5px]"
                aria-label="Continue to home page"
              >
                Continue
              </Link>
            </div>

            </div>
          </div>
        </div>
      </div>
  );
};

export default Start;