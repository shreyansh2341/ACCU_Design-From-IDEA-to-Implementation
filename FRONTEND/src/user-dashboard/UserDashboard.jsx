// src/pages/user/UserDashboard.jsx

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider.jsx";

// Sidebar + user sections
import UserSidebar from "@/user-dashboard/UserSidebar.jsx";
import UploadCAD from "@/user-dashboard/UploadCAD.jsx";
import MyOrders from "@/user-dashboard/MyOrders.jsx";
import Messages from "@/user-dashboard/Messages.jsx";
import Notifications from "@/user-dashboard/Notifications.jsx";

// You can reuse your admin profile page if you want
import MyProfile from "@/user-dashboard/myprofile.jsx";

// Optional: show some home content inside the dashboard
import Hero from "@/home/Hero.jsx";
import Trending from "@/home/Trending.jsx";

const UserDashboard = () => {
  const { authenticatedUser } = useAuth();

  const [component, setComponent] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Redirect if not logged in
  if (!authenticatedUser) return <Navigate to="/login" />;
  // Redirect if role is not "user" so admin/vendor can't open this
  if (authenticatedUser.role !== "user") return <Navigate to="/" />;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderSection = () => {
    switch (component) {
      case "UploadCAD":
        return <UploadCAD />;

      case "MyOrders":
        return (
          <MyOrders
            setComponent={setComponent}
            setSelectedOrder={setSelectedOrder}
          />
        );

      case "Messages":
        return <Messages selectedOrder={selectedOrder} />;

      case "Notifications":
        return <Notifications />;

      case "My Profile":
        return <MyProfile />;

      // "Dashboard" / "Home" inside the dashboard
      default:
        return (
          <MyProfile />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen relative">
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white sm:hidden hover:bg-blue-700 transition"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <UserSidebar
          component={component}
          setComponent={setComponent}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main area */}
      <main className="flex-grow ml-0 sm:ml-64 p-4 transition-all duration-300">
        {renderSection()}
      </main>
    </div>
  );
};

export default UserDashboard;
