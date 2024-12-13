

import React from "react";
import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import Layout from "../layouts/Layout";
import AuthGuard from "../commoncomponents/AuthGuard";
import Sellers from "../pages/Sellers";
import Buyesrs from "../pages/Buyesrs";
import MandiPrices from "../pages/MandiPrices";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";


const Home = Loadable(lazy(() => import("../pages/Home")));
const Start = Loadable(lazy(() => import("../pages/Start")));
const UserLogin = Loadable(lazy(() => import("../pages/UserLogin")));
const UserSignup = Loadable(lazy(() => import("../pages/UserSignup")));
const CommodityListing = Loadable(lazy(() => import("../pages/CommodityListing")));
const ContactUs = Loadable(lazy(() => import("../pages/ContactUs")));

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
    {
      path: "/sellers", // Sellers page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <Sellers />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/buyers", // Buyers page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <Buyesrs />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/mandi-prices", // Mandi Prices page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <MandiPrices />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/privacy-policy", // Mandi Prices page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <PrivacyPolicy />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/terms-conditions", // Terms and Conditions page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <TermsAndConditions />
          </Layout>
        </AuthGuard>
      )
    },
    {
      path: "/contact-us", // Terms and Conditions page
      element: (
        <AuthGuard allowedRoles={[1, 2]}>
          <Layout>
            <ContactUs />
          </Layout>
        </AuthGuard>
      )
    },
  ],
};

export default ClientRoutes;
