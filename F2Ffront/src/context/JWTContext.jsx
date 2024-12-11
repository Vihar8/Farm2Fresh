import React, { createContext, useReducer, useState, useEffect } from 'react';
import api from '../api/axios';
import {jwtDecode as jwt_decode} from 'jwt-decode' // Corrected import statement for jwt-decode
import { LOGIN, LOGOUT } from './actions'; // Ensure actions.js is properly structured

const JWTContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
  isInitializing: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload.user, isInitializing: false };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null, isInitializing: false };
    default:
      return state;
  }
};

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('serviceToken');
      if (token) {
        const decoded = jwt_decode(token); // Using the 'decode' function from jwt-decode
        if (decoded.exp * 1000 > Date.now()) {
          const response = await api.post('/auth/profile', { 
            headers: {
        Authorization: `Bearer ${token}`  // Include the token in the Authorization header
    }
          });
          dispatch({ type: LOGIN, payload: { user: response.data } });
        }
      } else {
        localStorage.removeItem('serviceToken'); // Token expired, remove it
        dispatch({ type: LOGOUT });
      }
    };

    init();
  }, []);

  
  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('serviceToken');
    
    // Dispatch the LOGOUT action to update the state
    dispatch({ type: LOGOUT });
  };
  
  return (
    <JWTContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
