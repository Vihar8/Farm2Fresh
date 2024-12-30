import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { JWTProvider } from './context/JWTContext';
import { SnackbarProvider } from './context/SnackbarContext';
import router from './router';
import "./styles/index.scss";
import App from './App';


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <SnackbarProvider>
  <JWTProvider>
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
  </JWTProvider>
    </SnackbarProvider>
    </>
);
