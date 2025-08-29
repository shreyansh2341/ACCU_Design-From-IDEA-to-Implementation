import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import Sidebar from '@/dashboard/VendorSidebar.jsx';
import MyProfile from '@/dashboard/myprofile.jsx';
import CreateBlog from '@/dashboard/createblog.jsx';
import CreatePost from '@/dashboard/createPost.jsx';
import MyBlogs from '@/dashboard/myblogs.jsx';
import { Navigate } from 'react-router-dom';

const VendorDashboard = () => {
  const { authenticatedUser } = useAuth();
  const [component, setComponent] = useState("Dashboard");

  if (!authenticatedUser || authenticatedUser.role !== "vendor") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full overflow-x-hidden">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="ml-64 w-full p-4">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Create Post" ? (
          <CreatePost />
        ) : component === "My Blogs" ? (
          <MyBlogs />
        ) : (
          <div className="text-lg font-semibold text-gray-700">
            Welcome to your Vendor Dashboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
