import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JWTContext from '../context/JWTContext';

const AuthGuard = ({ children, allowedRoles }) => {
  const { state } = useContext(JWTContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.isInitializing) return; // Wait until initialization is done

    if (!state.isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: location.pathname }, replace: true });
    } else if (allowedRoles && !allowedRoles.includes(state.user?.role)) {
      // Redirect if the role doesn't match the allowed roles
      navigate('/', { replace: true });
    }
  }, [state, navigate, location]);

  // If the state is still initializing or the user is not logged in, return null
  if (state.isInitializing || !state.isLoggedIn) {
    return <div>Loading...</div>;  // Optionally, show a loading indicator
  }

  return children;  // Return the children (protected component) when the user is logged in
};

export default AuthGuard;
