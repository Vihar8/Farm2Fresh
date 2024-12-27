import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { JWTProvider } from './context/JWTContext';
import { SnackbarProvider } from './context/SnackbarContext';
import router from './router';
import Box from '@mui/material/Box';
import "./styles/index.scss";
import LoaderCommon from './commoncomponents/Loader/LoaderCommon';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <JWTProvider>
    <SnackbarProvider>
      <RouterProvider router={router}>
        <Box id="appCommonLoader">
          <LoaderCommon />
        </Box>
      </RouterProvider>
    </SnackbarProvider>
  </JWTProvider>
);
