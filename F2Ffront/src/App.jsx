import React from 'react';
import Layout from './layouts/Layout';  // Ensure Layout is properly imported
import UserLogin from './pages/UserLogin';  // Ensure UserLogin is properly imported
import Box from '@mui/material/Box';
import Loadable from './commoncomponents/Loadable/Loadable'; // Ensure Loadable is properly defined
import './index.css';  // Import Tailwind CSS here

function App() {
  return (
    <Layout>
      <UserLogin />
      <Box id='appCommonLoader'>
        <Loadable />
      </Box>
    </Layout>
  );
}


export default App;
