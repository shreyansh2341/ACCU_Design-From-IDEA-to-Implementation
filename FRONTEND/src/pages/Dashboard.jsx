import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import { Navigate } from 'react-router-dom';

import AdminSidebar from '@/dashboard/Sidebar.jsx';
import VendorSidebar from '@/dashboard/VendorSidebar.jsx';
import UserSidebar from '@/dashboard/UserSidebar.jsx';

import MyProfile from '@/dashboard/myprofile.jsx';
import CreateBlog from '@/dashboard/createblog.jsx';
import CreatePost from '@/dashboard/createPost.jsx';
import UpdateBlog from '@/dashboard/Updateblog.jsx';
import UpdatePost from '@/dashboard/UpdatePost.jsx';
import MyBlogs from '@/dashboard/myblogs.jsx';
import Hero from '@/home/Hero.jsx';
import Trending from '@/home/Trending.jsx';

const Dashboard = () => {
  const { authenticatedUser } = useAuth();
  const [component, setComponent] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticatedUser) {
    return <Navigate to="/login" />;
  }

  const renderSidebar = () => {
    switch (authenticatedUser.role) {
      case 'admin':
        return <AdminSidebar component={component} setComponent={setComponent} toggleSidebar={() => setSidebarOpen(false)} />;
      case 'vendor':
        return <VendorSidebar component={component} setComponent={setComponent} toggleSidebar={() => setSidebarOpen(false)} />;
      case 'user':
        return <UserSidebar component={component} setComponent={setComponent} toggleSidebar={() => setSidebarOpen(false)} />;
      default:
        return null;
    }
  };

  const renderComponent = () => {
    switch (component) {
      case 'My Profile':
        return <MyProfile />;
      case 'Create Blog':
        return <CreateBlog />;
      case 'Create Post':
        return <CreatePost />;
      case 'Update Blog':
        return <UpdateBlog />;
      case 'Update Post':
        return <UpdatePost />;
      case 'My Blogs':
        return <MyBlogs />;
      default:
        return (
          <>
            <Hero />
            <Trending />
          </>
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen relative">
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white sm:hidden hover:bg-blue-700 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={"2"} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        {renderSidebar()}
      </div>

      {/* Backdrop when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Main content */}
      <main className="flex-grow ml-0 sm:ml-64 p-4 transition-all duration-300">{renderComponent()}</main>
    </div>
  );
};

export default Dashboard;
