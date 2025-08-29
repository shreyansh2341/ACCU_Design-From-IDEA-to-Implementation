import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { CiMenuBurger } from 'react-icons/ci';
import { FaArrowLeft, FaFileAlt, FaPlus, FaUser, FaSignOutAlt, FaHome, FaBullhorn, FaStar } from 'react-icons/fa';

const Sidebar = ({ toggleSidebar }) => {
  const { profile, setauthenticatedUser } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'My Blogs', path: '/my-blogs', icon: <FaFileAlt /> },
    { label: 'All Posts', path: '/all-posts', icon: <FaBullhorn /> },
    { label: 'All Testimonials', path: '/all-testimonials', icon: <FaStar /> },
    { label: 'Create Blog', path: '/create-blog', icon: <FaPlus /> },
    { label: 'Create Post', path: '/create-post', icon: <FaPlus /> },
    { label: 'Create Review Post', path: '/create-review-post', icon: <FaPlus /> },
    { label: 'My Profile', path: '/my-profile', icon: <FaUser /> },
    { label: 'Home', path: '/', icon: <FaHome /> },
  ];

  const handleNavigation = (path) => {
    if (toggleSidebar) toggleSidebar();
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:4000/api/user/logout', { withCredentials: true });
      setauthenticatedUser(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Error during logout');
    }
  };

  return (
    <nav className="flex flex-col h-full p-4 overflow-y-auto bg-white shadow-lg">
      {/* User Info */}
      <div className="mb-6 text-center">
        <img
          src={profile?.photo?.url}
          alt="profile"
          className="mx-auto w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <h2 className="mt-2 text-lg font-semibold text-gray-900">{profile?.name}</h2>
        <p className="text-sm text-gray-600">Admin Panel</p>
      </div>

      {/* Navigation Buttons */}
      {navItems.map(({ label, path, icon }) => (
        <button
          key={label}
          onClick={() => handleNavigation(path)}
          className="flex items-center gap-3 w-full px-4 py-2 mb-2 text-gray-700 rounded hover:bg-blue-600 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={`Navigate to ${label}`}
        >
          {icon}
          <span className="font-medium">{label}</span>
        </button>
      ))}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-2 mt-auto text-red-700 rounded hover:bg-red-600 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Logout"
      >
        <FaSignOutAlt />
        <span className="font-medium">Log Out</span>
      </button>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400 hidden sm:block">
        &copy; {new Date().getFullYear()} ACCU DESIGN
      </div>
    </nav>
  );
};

export default Sidebar;
