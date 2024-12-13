import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Link 
        className='p-5 mt-40 justify-center bg-black text-white text-2xl inline-block' 
        to="/commoditylisting"
      >
        Go to Commodity Listing
      </Link>

    </div>
  );
};

export default Home;
