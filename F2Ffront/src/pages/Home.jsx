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
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Home;



// import React from 'react';
// import { Search, UserCheck, ShoppingCart, Users } from 'lucide-react';

// const Home = () => {
//   // Static data for seller commodities
//   const commodities = [
//     {
//       _id: '1',
//       createdAt: '2023-11-01T00:00:00Z',
//       images: ['sample-image-1.jpg', 'sample-image-2.jpg'],
//       commodity: 'Soybeans',
//       district: 'Mysore',
//       state: 'Karnataka',
//       price: 5000,
//       totalIn: 'quintals',
//       quantity: 10,
//       seller: {
//         name: 'Rajesh Kumar',
//         role: 'Farmer',
//         mobile: '1234567890',
//       },
//     },
//     {
//       _id: '2',
//       createdAt: '2023-10-15T00:00:00Z',
//       images: ['sample-image-3.jpg', 'sample-image-4.jpg'],
//       commodity: 'Wheat',
//       district: 'Jaisalmer',
//       state: 'Rajasthan',
//       price: 3000,
//       totalIn: 'quintals',
//       quantity: 20,
//       seller: {
//         name: 'Sita Devi',
//         role: 'Farmer',
//         mobile: '0987654321',
//       },
//     },
//     // Add more static items as needed
//   ];

//   return (
//     <div className="relative w-full min-h-screen bg-gray-50">
//       {/* Video Section */}
//       <div className="relative w-full h-[45vh] overflow-hidden">
//         <video className="w-full h-full object-cover" autoPlay loop muted>
//           <source src="/f2f.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Hero Section */}
//       <div className="flex flex-col items-center justify-center py-3 text-center bg-gradient-to-b from-white to-gray-50">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//           For Buyers and Sellers
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl">
//           Seamlessly connect with trusted buyers and sellers across India. Find the best deals in commodities and grow your business.
//         </p>
//         <div className="mt-8 flex items-center w-full max-w-lg mx-auto bg-gray-200 rounded-lg shadow-md overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search Commodities"
//             className="w-full px-4 py-3 text-gray-800 bg-transparent outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//           />
//           <button className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition-colors">
//             <Search className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Seller Commodities Section */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <h1 className="text-3xl text-green-600 text-center font-bold mb-6">
//          Latest Leads 
//         </h1>
//         {commodities.length === 0 ? (
//           <p className="text-gray-500 text-center">No Seller commodities found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {commodities.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
//               >
//                 {/* Date */}
//                 <div className="px-4 py-2 bg-gray-100 text-sm text-gray-600">
//                   Date: {new Date(item.createdAt).toLocaleDateString('en-GB')}
//                 </div>
//                 {/* Image */}
//                 <div className="relative grid grid-cols-2 gap-2 p-2 bg-gray-50">
//                   {item.images.map((image, index) => (
//                     <div
//                       key={index}
//                       className="relative group overflow-hidden rounded-lg shadow-md"
//                     >
//                       {/* Image */}
//                       <img
//                         src={`${import.meta.env.VITE_API_URL}/${image}`}
//                         alt={`${item.commodity} image ${index + 1}`}
//                         className="w-full h-32 object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 {/* Commodity Details */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
//                     {item.commodity} for sale in {item.district}
//                   </h3>
//                   <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745" width="20px" height="20px">
//                       <path d="M12 2C8.134 2 5 5.134 5 9c0 5.325 7 11.5 7 11.5s7-6.175 7-11.5c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
//                     </svg>
//                     {item.state}, {item.district}
//                   </p>
//                   <p className="text-sm font-semibold text-green-700 mb-1">
//                     Selling Price: <span className="text-black font-bold">₹{item.price} / {item.totalIn}</span>
//                   </p>
//                   <p className="text-sm font-semibold text-green-700">
//                     Trade Volume: <span className="text-black font-bold">{item.quantity} {item.totalIn}</span>
//                   </p>
//                 </div>
//                 {/* Seller Info and Contact */}
//                 <div className="flex items-center px-4 py-2 bg-gray-50">
//                   <div className="ml-3 flex-grow">
//                     <p className="text-sm font-medium text-gray-800">{item.seller.name}</p>
//                     <p className="text-xs text-gray-500">{item.seller.role || 'Farmer'}</p>
//                     <p className="text-xs text-gray-500">Mobile: {item.seller.mobile || 'N/A'}</p>
//                   </div>
//                   <div className="flex flex-col gap-2 items-center">
//                     {/* Call Icon */}
//                     <a href={`tel:${item.seller.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-[25px] h-[25px]">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745" className="flex items-center w-[25px] h-[25px]">
//                         <path d="M6.62 10.79a15.07 15.07 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.36 11.36 0 0 0 3.57.72 1 1 0 0 1 1 1v3.26a1 1 0 0 1-1 1A18 18 0 0 1 3.5 5a1 1 0 0 1 1-1H7.75a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .72 3.57 1 1 0 0 1-.21 1.11z" />
//                       </svg>
//                     </a>
//                     {/* WhatsApp Icon */}
//                     <a href={`https://wa.me/${item.seller.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-[25px] h-[25px]">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25d366" className="flex items-center w-[25px] h-[25px]">
//                         <path d="M12 2a10 10 0 0 0-7.47 16.91l-.6 3.58 3.67-.96A10 10 0 1 0 12 2zm5.41 14.24c-.26.73-1.32 1.21-1.81 1.24-.48.03-1.09.38-3.67-.88-2.87-1.3-4.74-4.38-4.87-4.6-.13-.22-1.16-1.52-1.16-2.89s.73-2 .99-2.26.55-.32.74-.32h.56c.18 0 .42-.07.65.5s.78 1.64.85 1.76.06.26.03.35c-.02.09-.13.23-.23.35l-.02.02c-.1.11-.2.22-.29.33-.1.11-.18.22-.08.42s.45.78.97 1.27a4.57 4.57 0 0 0 1.63 1.02c.3.1.47.08.65-.05.18-.14.63-.74.79-1 .16-.26.32-.21.55-.12.23.09 1.48.7 1.73.82.25.12.4.18.47.28.06.1.06.56-.19 1.24z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;