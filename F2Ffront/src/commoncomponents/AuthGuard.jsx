import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JWTContext from '../context/JWTContext';
import LoaderCommon from './Loader/LoaderCommon';

const AuthGuard = ({ children, allowedRoles }) => {
  const { state } = useContext(JWTContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.isInitializing) return;

    // If the user is not logged in, redirect to login page
    if (!state.isLoggedIn) {
      if (location.pathname !== '/login') {
        navigate('/login', { state: { from: location.pathname }, replace: true });
      }
    } else if (allowedRoles && !allowedRoles.includes(state.user?.role)) {
      // Redirect if the user's role is not in the allowed roles
      if (state.user?.role === 2 && location.pathname !== '/dashboard') {
        navigate('/dashboard', { replace: true }); // Redirect admin to the dashboard
      } else if (location.pathname !== '/home') {
        navigate('/home', { replace: true });
      }
    }
  }, [state.isInitializing, state.isLoggedIn, state.user, allowedRoles, navigate, location]);

  if (state.isInitializing) {
    return <LoaderCommon />; // Optionally, show a loading indicator
  }

  if (!state.isLoggedIn) {
    return null; // Prevent rendering children until the user is authenticated
  }

  return children;  // Return the children (protected component) when the user is logged in
};

export default AuthGuard;
