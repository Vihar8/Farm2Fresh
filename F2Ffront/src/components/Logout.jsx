import React, { useContext } from 'react';
import JWTContext from '../context/JWTContext'; // Adjust the import path accordingly
import { useNavigate } from 'react-router-dom'; // For React Router-based navigation

const Logout = () => {
  const { state, logout } = useContext(JWTContext);
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <h1>Welcome, {state.user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
