import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider.jsx";

import VendorSidebar from "@/vendor-dashboard/VendorSidebar.jsx";
import VendorOrders from "@/vendor-dashboard/VendorOrders.jsx";
import VendorChats from "@/vendor-dashboard/VendorChats.jsx";
import VendorNotifications from "@/vendor-dashboard/VendorNotifications.jsx";
import VendorReviews from "@/vendor-dashboard/VendorReviews.jsx";
import VendorProfile from "@/vendor-dashboard/VendorProfile.jsx";

const VendorDashboardLayout = () => {
  const { authenticatedUser } = useAuth();

  const [component, setComponent] = useState("Orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!authenticatedUser) return <Navigate to="/login" />;
  if (authenticatedUser.role !== "vendor") return <Navigate to="/" />;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderSection = () => {
    switch (component) {
      case "Orders":
        return (
          <VendorOrders
            setComponent={setComponent}
            setSelectedOrder={setSelectedOrder}
          />
        );
      case "Chats":
        return <VendorChats selectedOrder={selectedOrder} />;
      case "Notifications":
        return <VendorNotifications />;
      case "Reviews":
        return <VendorReviews />;
      case "My Profile":
        return <VendorProfile />;
      default:
        return <VendorOrders />;
    }
  };

  return (
    <div className="flex w-full min-h-screen relative bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]">

      {/* Mobile Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white sm:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <VendorSidebar
          component={component}
          setComponent={setComponent}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Content */}
      <main className="flex-grow ml-0 sm:ml-64 p-4 transition-all duration-300">
        {renderSection()}
      </main>
    </div>
  );
};

export default VendorDashboardLayout;
