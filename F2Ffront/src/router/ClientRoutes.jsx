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
const ContactUs = Loadable(lazy(() => import("../pages/ContactUs")));
const Sellers = Loadable(lazy(() => import("../pages/Sellers")));
const Buyesrs = Loadable(lazy(() => import("../pages/Buyesrs")));
const MandiPrices = Loadable(lazy(() => import("../pages/MandiPrices")));
const PrivacyPolicy = Loadable(lazy(() => import("../pages/PrivacyPolicy")));
const TermsAndConditions = Loadable(lazy(() => import("../pages/TermsAndConditions")));
const Mylisting = Loadable(lazy(() => import("../pages/Mylisting")));
const AgriUpdates = Loadable(lazy(() => import("../pages/AgriUpdates")));
const ForgotPassword = Loadable(lazy(() => import("../pages/ForgotPassword")));
const ResetPassword = Loadable(lazy(() => import("../pages/ResetPassword")));
const UpdateCommodity = Loadable(lazy(() => import("../pages/UpdateCommodity.jsx"))); // Import the new component
const MyProfile = Loadable(lazy(() => import("../components/Myprofile/profile.jsx"))); // Import the new component

const ClientRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Start />, // This will be the starting point (root)
    },
    // routing for vendor forgot password
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/resetpassword/:token",
      element: <ResetPassword />,
    },
    {
      path: "/home",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
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
      path: "/commoditylisting",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <CommodityListing />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/sellers",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <Sellers />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/buyers",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <Buyesrs />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/my-profile",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <MyProfile />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/mandi-prices",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <MandiPrices />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/my-listing",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <Mylisting />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/agri-updates",
      element: (
        <Layout>
          <AgriUpdates />
        </Layout>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Layout>
          <PrivacyPolicy />
        </Layout>
      ),
    },
    {
      path: "/terms-conditions",
      element: (
        <Layout>
          <TermsAndConditions />
        </Layout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <ContactUs />
          </Layout>
        </AuthGuard>
      ),
    },
    {
      path: "/updateCommodity/:commodityId",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Layout>
            <UpdateCommodity />
          </Layout>
        </AuthGuard>
      ),
    },
  ],
};

export default ClientRoutes;
