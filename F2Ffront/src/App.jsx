import "./styles/index.scss";
import React from 'react'
import UserLogin from './pages/UserLogin'
import LoaderCommon from "./commoncomponents/Loader/LoaderCommon";
import { Box } from "lucide-react";

const App = () => {
  return (
    <Layout>
      <UserLogin />
      <Box id='appCommonLoader'>
        <LoaderCommon />
      </Box>
    </Layout>
  );
}


export default App;
