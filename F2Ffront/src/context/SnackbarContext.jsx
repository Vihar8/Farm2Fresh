import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'default' });

  const showSnackbar = (message, color = 'default') => {
    setSnackbar({ open: true, message, color });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <SnackbarContent
          message={snackbar.message}
          style={{ backgroundColor: snackbar.color === 'error' ? 'red' : 'green' }}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
