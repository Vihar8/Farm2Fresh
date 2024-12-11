import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { JWTProvider } from './context/JWTContext';
import { SnackbarProvider } from './context/SnackbarContext';
import router from './router';
import './index.css';
import Loadable from './commoncomponents/Loadable/Loadable';  // Ensure Loadable is correctly defined
import Box from '@mui/material/Box';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <JWTProvider>
    <SnackbarProvider>
      <RouterProvider router={router}>
        <Box id="appCommonLoader">
          <Loadable />
        </Box>
      </RouterProvider>
    </SnackbarProvider>
  </JWTProvider>
);
