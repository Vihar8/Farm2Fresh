import React from 'react';
import { Users, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "100% Organic",
    description: "All products are organic and naturally grown"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Direct from Farmers",
    description: "Connect and buy directly from local farmers"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "For Buyers",
    description: "Looking to buy fresh produce? Make an inquiry today!"
  }
];

const categories = [
  {
    name: "Fresh Vegetables",
    image: "/download.webp"
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
      <div className="relative h-[500px] bg-gradient-to-b from-gray-900 via-gray-700 to-gray-600">
  <video
    src="/farm2freshhomeupdated.mp4"
    autoPlay
    muted
    loop
    className="absolute inset-0 w-full h-full object-cover"
    style={{ opacity: '0.5' }}
  />
  <div className="relative flex items-center justify-center h-full">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center px-4">
      Revolutionize Your <span className="text-blue-300">Farming</span> Journey <br />
      with <span className="text-yellow-400">Farm2Fresh</span>
    </h1>
  </div>
</div>


      {/* Categories Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {categories.map((category, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-4 bg-green-200 rounded-full mb-6 ">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
