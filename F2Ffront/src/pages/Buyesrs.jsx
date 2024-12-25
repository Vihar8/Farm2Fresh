import { useEffect, useState } from 'react';
import api from '../api/axios';

const BuyerCommodities = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommodities = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await api.get('/api/getbuyercommodities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommodities(response.data);
      } catch (error) {
        console.error('Error fetching buyer commodities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommodities();
  }, []);

  if (loading) return <p>Loading commodities...</p>;

  return (
    <div>
      <h1 className="text-3xl text-green-600 text-center font-bold mb-6">Buyer Commodities</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {commodities.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-r from-pink-100 via-teal-100 to-yellow-100 shadow-lg rounded-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            style={{ padding: '20px', border: '1px solid #e0e0e0' }}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/${item.images[0]}`}
              alt={item.commodity}
              className="w-full h-36 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-700 capitalize mb-2">{item.commodity}</h3>
            <p className="text-gray-700 text-sm mb-1">Variety: <span className="font-medium text-pink-600">{item.varietyType}</span></p>
            <p className="text-gray-700 text-sm mb-1">Price: <span className="font-medium text-green-600">${item.price}</span></p>
            <p className="text-gray-700 text-sm mb-1">Quantity: <span className="font-medium text-yellow-600">{item.quantity} {item.totalIn}</span></p>
            <p className="text-gray-700 text-sm mb-1">Location: <span className="font-medium text-blue-600">{item.state}, {item.district}</span></p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_URL}/${img}`}
                  alt={`${item.commodity}-${idx}`}
                  className="w-16 h-16 object-cover rounded-lg border-4 border-white"
                />
              ))}
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-600">Buyer: <span className="font-medium text-purple-700">{item.buyer.name}</span></p>
              <p className="text-xs text-gray-600">{item.buyer.email}</p>
              <p className="text-xs text-gray-600">{item.buyer.mobile}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerCommodities;
