// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Home = () => {
// //   return (
// //     <div className="relative w-full min-h-screen bg-gray-100">
// //       {/* Video Section */}
// //       <div className="relative w-full h-[45vh] overflow-hidden">
// //         <video className="w-full h-full object-cover" autoPlay loop muted>
// //           <source src="/farm2fresh.mp4" type="video/mp4" />
// //           Your browser does not support the video tag.
// //         </video>
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pt-72 flex items-center justify-center">
// //           <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center tracking-tight leading-tight shadow-2xl">
// //             Revolutionize Farming With Farm2Fresh
// //           </h2>
// //         </div>
// //       </div>


// //       {/* Content Section */}
// //       <div className="flex flex-col items-center justify-center py-12">
// //         <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
// //           Discover Our Website
// //         </h1>
// //         <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
// //           Watch this short video to learn more about what we offer. Explore our platform, designed to provide the best experience for all your needs.
// //         </p>
// //         <Link
// //           className="px-8 py-4 bg-blue-600 text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
// //           to="/commoditylisting"
// //         >
// //           Explore
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;



import React from 'react';
import { Truck, Users, Shield, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "100% Organic",
    description: "All products are certified organic and naturally grown"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Direct from Farmers",
    description: "Connect and buy directly from local farmers"
  },
  // {
  //   icon: <Truck className="h-6 w-6" />,
  //   title: "Fast Delivery",
  //   description: "Same day delivery for maximum freshness"
  // },
  // {
  //   icon: <Shield className="h-6 w-6" />,
  //   title: "Secure Payments",
  //   description: "Safe and secure payment options"
  // }
];

const categories = [
  {
    name: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Organic Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Seasonal Products",
    image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-green-50 to-green-100">
        <div className="absolute inset-0">
          <video
            src="/farm2fresh.mp4"
            autoPlay
            muted
            loop
            className="w-full h-[400px] md:h-full object-cover"
            style={{ opacity: '0.80' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-end h-full space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white ">
              Revolutionize Farming With Farm2Fresh
            </h1>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-semibold p-6">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}