import React, { lazy } from 'react';
import Loadable from '../commoncomponents/Loadable/Loadable';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from '../commoncomponents/AuthGuard';

const Dashboard = Loadable(lazy(() => import("../pages/Dashboard/Dashboard")));
const Enquiry = Loadable(lazy(() => import("../pages/Enquiry")));

const AdminRoutes = {
  path: "/",
  children: [
    {
      path: "/dashboard",
      element: (
        <AuthGuard allowedRoles={[2]}>
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
        </AuthGuard>
        ),
    },
    {
      path: "/enquiry",
      element: (
        <AuthGuard allowedRoles={[2]}> {/* Allow both admin and client */}
         <AdminLayout>
          <Enquiry />
         </AdminLayout>
        </AuthGuard>
      ),
    },
  ],
};

export default AdminRoutes;
