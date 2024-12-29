import { useEffect, useState } from 'react';
import api from '../api/axios';
import FarmingLoaderSun from '../commoncomponents/FarmingLoaderSun';
import { User } from 'lucide-react';


const SellerCommodities = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommodities = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get('/api/getSellerCommodities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommodities(response.data);
      } catch (error) {
        console.error('Error fetching seller commodities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommodities();
  }, []);

  if (loading) return <FarmingLoaderSun/> ;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-green-600 text-center font-bold mb-6">Seller Commodities</h1>
      {commodities.length === 0 ? (
        <p className="text-gray-500 text-center">No Seller commodities found.</p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {commodities.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
          >
            {/* Date */}
            <div className="px-4 py-2 bg-gray-100 text-sm text-gray-600">
              Date: {new Date(item.createdAt).toLocaleDateString('en-GB')}
            </div>
            {/* Image */}
            <div
                className={`relative grid ${
                  item.images.length === 1
                    ? 'grid-cols-1'
                    : item.images.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-2 sm:grid-cols-3'
                } gap-2 p-2 bg-gray-50`}
              >
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg shadow-md"
                  >
                    <img
                      src={image}
                      alt={`${item.commodity} image ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </div>
                ))}

              {/* Share Button */}
              {/* <button className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded shadow-md hover:bg-green-700">
    Share
  </button> */}
            </div>
            {/* Commodity Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
                {item.commodity} for sale in {item.district}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745" width="32px" height="32px">
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 5.325 7 11.5 7 11.5s7-6.175 7-11.5c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                {item.state}, {item.district}
              </p>
              <p className="text-sm font-semibold text-green-700 mb-1">
                Selling Price: <span className="text-black font-bold">₹{item.price} / {item.totalIn}</span>
              </p>
              <p className="text-sm font-semibold text-green-700">
                Trade Volume: <span className="text-black font-bold">{item.quantity} {item.totalIn}</span>
              </p>
            </div>
            {/* Seller Info and Contact */}
            <div className="flex items-center px-4 py-2 bg-gray-50">
              <div className="flex items-center gap-2 flex-grow">
                <User className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.seller.name}</p>
                  <p className="text-xs text-gray-500">
                    <span className="inline-flex items-center px-1 py-1 bg-green-100 text-green-700 font-medium rounded-full border border-green-300 shadow-sm">
                      {item.buyer.user_type || 'Farmer'}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">Mobile: {item.seller.mobile || 'N/A'}</p> {/* Mobile number */}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                {/* Call Icon */}
                <a href={`tel:${item.seller.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center w-[25px] h-[25px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-[35px] h-[35px] sm:w-7 sm:h-7 fill-green-500"
                >
                    <path d="M6.62 10.79a15.07 15.07 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21 11.36 11.36 0 0 0 3.57.72 1 1 0 0 1 1 1v3.26a1 1 0 0 1-1 1A18 18 0 0 1 3.5 5a1 1 0 0 1 1-1H7.75a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .72 3.57 1 1 0 0 1-.21 1.11z" />
                  </svg>
                </a>

                {/* WhatsApp Icon */}
                <a href={`https://wa.me/${item.seller.mobile}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center w-[25px] h-[25px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                 </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default SellerCommodities;
