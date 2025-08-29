import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider.jsx';
import AdminDashboard from './Dashboard.jsx';
import VendorDashboard from './VendorDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';

const DashboardRouter = () => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser) return <Navigate to="/login" />;

  switch (authenticatedUser.role) {
    case "admin":
      return <AdminDashboard />;
    case "vendor":
      return <VendorDashboard />;
    case "user":
      return <UserDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

export default DashboardRouter;
