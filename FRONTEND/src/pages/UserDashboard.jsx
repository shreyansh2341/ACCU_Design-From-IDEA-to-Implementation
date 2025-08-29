import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import Sidebar from '@/dashboard/UserSidebar.jsx';
import MyProfile from '@/dashboard/myprofile.jsx';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { authenticatedUser } = useAuth();
  const [component, setComponent] = useState("Dashboard");

  if (!authenticatedUser || authenticatedUser.role !== "user") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full overflow-x-hidden">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="ml-64 w-full p-4">
        {component === "My Profile" ? (
          <MyProfile />
        ) : (
          <div className="text-lg font-semibold text-gray-700">
            Welcome to your User Dashboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
