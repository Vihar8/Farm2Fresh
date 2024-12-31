// import React from "react";
// import { lazy } from "react";
// import Loadable from "../commoncomponents/Loadable/Loadable";
// import Layout from "../layouts/Layout";
// import AuthGuard from "../commoncomponents/AuthGuard";




// const Home = Loadable(lazy(() => import("../pages/Home")));
// const Start = Loadable(lazy(() => import("../pages/Start")));
// const UserLogin = Loadable(lazy(() => import("../pages/UserLogin")));
// const UserSignup = Loadable(lazy(() => import("../pages/UserSignup")));
// const CommodityListing = Loadable(lazy(() => import("../pages/CommodityListing")));
// const ContactUs = Loadable(lazy(() => import("../pages/ContactUs")));
// const Sellers = Loadable(lazy(() => import("../pages/Sellers")));
// const Buyesrs = Loadable(lazy(() => import("../pages/Buyesrs")));
// const MandiPrices = Loadable(lazy(() => import("../pages/MandiPrices")));
// const PrivacyPolicy = Loadable(lazy(() => import("../pages/PrivacyPolicy")));
// const TermsAndConditions = Loadable(lazy(() => import("../pages/TermsAndConditions")));
// const Mylisting = Loadable(lazy(() => import("../pages/Mylisting")));
// const AgriUpdates = Loadable(lazy(() => import("../pages/AgriUpdates")));

// const ClientRoutes = {
//   path: "/",
//   children: [
//     {
//       path: "/",
//       element: <Start />, // This will be the starting point (root)
//     },
//     {
//       path: "/home",
//       element: (
//         <Layout>
//           <Home />
//         </Layout>
//       ), // Removed AuthGuard
//     },
//     {
//       path: "/login",
//       element: <UserLogin />,
//     },
//     {
//       path: "/usersignup",
//       element: <UserSignup />,
//     },
//     {
//       path: "/commoditylisting", // This is the protected commodity listing route
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <CommodityListing />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: "/sellers", // Sellers page
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <Sellers />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: "/buyers", // Buyers page
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <Buyesrs />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: "/mandi-prices", // Mandi Prices page
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <MandiPrices />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: "/my-listing", // This is the protected commodity listing route
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <Mylisting />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: "/agri-updates", // Terms and Conditions page
//       element: (
//           <Layout>
//             <AgriUpdates />
//           </Layout>
//       ),
//     },
//     {
//       path: "/privacy-policy", // Privacy Policy page
//       element: (
//           <Layout>
//             <PrivacyPolicy />
//           </Layout>
//       ),
//     },
//     {
//       path: "/terms-conditions", // Terms and Conditions page
//       element: (
//           <Layout>
//             <TermsAndConditions />
//           </Layout>
//       ),
//     },
//     {
//       path: "/contact-us", // Contact Us page
//       element: (
//         <AuthGuard allowedRoles={[1]}>
//           <Layout>
//             <ContactUs />
//           </Layout>
//         </AuthGuard>
//       ),
//     },
//   ],
// };

// export default ClientRoutes;

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
const UpdateCommodity = Loadable(lazy(() => import("../pages/UpdateCommodity.jsx"))); // Import the new component

const ClientRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <Start />, // This will be the starting point (root)
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
      path: "/updateCommodity/:commodityId", // New UpdateCommodity route
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
