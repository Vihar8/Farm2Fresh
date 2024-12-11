import React, { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';
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
          const response = await axios.post('/account/profile', { token });
          dispatch({ type: LOGIN, payload: { user: response.data } });
        }
      } else {
        dispatch({ type: LOGOUT });
      }
    };

    init();
  }, []);

  return (
    <JWTContext.Provider value={{ state, dispatch }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
