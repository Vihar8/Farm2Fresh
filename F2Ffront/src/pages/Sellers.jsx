import React, { useEffect, useState } from 'react';
import api from '../api/axios';

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

  if (loading) return <p>Loading commodities...</p>;

  return (
    <div>
      <h1>Seller Commodities</h1>
      {commodities.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{item.commodity}</h3>
          <p>Variety: {item.varietyType}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity} {item.totalIn}</p>
          <p>Location: {item.state}, {item.district}</p>
          {item.images.map((img, idx) => (
            <img 
              key={idx} 
              src={`${import.meta.env.VITE_API_URL}/${img}`} 
              alt={item.commodity} 
              style={{ width: '100px', height: '100px', margin: '5px' }} 
            />
          ))}
          <p>Seller: {item.seller.name} ({item.seller.email})</p>
        </div>
      ))}
    </div>
  );
};

export default SellerCommodities;
