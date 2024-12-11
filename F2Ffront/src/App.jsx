import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import CommodityListing from './pages/CommodityListing'

const App = () => {
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
