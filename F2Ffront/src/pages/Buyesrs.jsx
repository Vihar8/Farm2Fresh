import React, { useEffect, useState } from 'react';
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
      <h1 className='text-3xl text-greenCustom text-center font-bold m-2'>Buyer Commodities</h1>
     <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5'>
     {commodities.map((item) => (
        <div className='rounded-xl' key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3 className='text-xl font-mono capitalize'>{item.commodity}</h3>
          <p className='text-base'>Variety: {item.varietyType}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity} {item.totalIn}</p>
          <p>Location: {item.state}, {item.district}</p>
          <div className='flex'>
          {item.images.map((img, idx) => (
            <img 
              className='rounded-lg '
              key={idx} 
              src={`${import.meta.env.VITE_API_URL}/${img}`} 
              alt={item.commodity} 
              style={{ width: '100px', height: '100px', margin: '5px' }} 
            />
          ))}
          </div>     
          <p><span className='text-xl'></span> {item.buyer.name} ({item.buyer.email})</p>
        </div>
      ))}
     </div>
    </div>
  );
};

export default BuyerCommodities;
