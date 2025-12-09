import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider.jsx";

import VendorSidebar from "./VendorSidebar.jsx";

const VendorDashboard = () => {
  const { authenticatedUser } = useAuth();
  const [component, setComponent] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticatedUser) return <Navigate to="/login" />;
  if (authenticatedUser.role !== "vendor") return <Navigate to="/" />;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderSection = () => {
    switch (component) {
      default:
        return <div className="p-4">Vendor dashboard home (to be built)</div>;
    }
  };

  return (
    <div className="flex w-full min-h-screen relative">
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

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <VendorSidebar
          component={component}
          setComponent={setComponent}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      <main className="flex-grow ml-0 sm:ml-64 p-4 transition-all duration-300">
        {renderSection()}
      </main>
    </div>
  );
};

export default VendorDashboard;
