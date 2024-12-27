import React, { createContext, useState, useRef, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'default' });
  const timeoutRef = useRef();

  const showSnackbar = (message, color = 'default') => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Open the snackbar
    setSnackbar({ open: true, message, color });

    // Auto-close after 4 seconds
    timeoutRef.current = setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 4000);
  };

  useEffect(() => {
    return () => {
      // Clear timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <SnackbarContent
          message={snackbar.message}
          style={{
            backgroundColor: snackbar.color === 'error' ? 'red' : 'green',
          }}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
