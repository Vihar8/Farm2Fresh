

import React from "react";
import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import Layout from "../layouts/Layout";
import AuthGuard from "../commoncomponents/AuthGuard";


const Home = Loadable(lazy(() => import("../pages/Home")));
const Start = Loadable(lazy(() => import("../pages/Start")));
const UserLogin = Loadable(lazy(() => import("../pages/UserLogin")));
const UserSignup = Loadable(lazy(() => import("../pages/UserSignup")));
const CommodityListing = Loadable(lazy(() => import("../pages/CommodityListing")));
// const CommodityAdd = Loadable(lazy(() => import("../pages/CommodityAdd")));
// const CommodityEdit = Loadable(lazy(() => import("../pages/CommodityEdit")));

const ClientRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Start />,  // This will be the starting point (root)
    },
    {
      path: "/home",
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <Home />
          </Layout>
        </AuthGuard>
      ), // Protected route
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
    {
      path: "/usersignup",
      element: <UserSignup />,
    },
    {
      path: "/commoditylisting",  // This is the protected commodity listing route
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
        <Layout>
          <CommodityListing />
          </Layout>
        </AuthGuard>
      ),
    },
    // Add more routes if needed
  ],
};

export default ClientRoutes;
