import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JWTContext from '../context/JWTContext';
import Loadable from './Loadable/Loadable';
import LoaderCommon from './Loader/LoaderCommon';

const AuthGuard = ({ children, allowedRoles }) => {
  const { state } = useContext(JWTContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (state.isInitializing) return; // Wait until initialization is done

    // If the user is not logged in, redirect to login page
    if (!state.isLoggedIn) {
      if (location.pathname !== '/login') {
        navigate('/login', { state: { from: location.pathname }, replace: true });
      }
    } else if (allowedRoles && !allowedRoles.includes(state.user?.role)) {
      // Redirect if the user's role is not in the allowed roles
      if (location.pathname !== '/home') {
        navigate('/home', { replace: true });
      }
    }
  }, [state.isInitializing, state.isLoggedIn, state.user, allowedRoles, navigate, location]);

  // If the state is still initializing, or the user is not logged in, return null (or a loading spinner)
  if (state.isInitializing) {
    return <LoaderCommon/>; // Optionally, show a loading indicator
  }

  // Strict check: If the user is not logged in, redirect immediately without rendering the children
  if (!state.isLoggedIn) {
    return null; // Prevent rendering children until the user is authenticated
  }

  return children;  // Return the children (protected component) when the user is logged in
};

export default AuthGuard;
