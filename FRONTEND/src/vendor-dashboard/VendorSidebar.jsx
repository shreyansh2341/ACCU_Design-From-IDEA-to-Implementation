import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider.jsx";
import {
  FaListAlt,
  FaComments,
  FaBell,
  FaUserCircle,
  FaStarHalfAlt,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const navItems = [
  { label: "Orders", icon: <FaListAlt /> },
  { label: "Chats", icon: <FaComments /> },
  { label: "Reviews", icon: <FaStarHalfAlt /> },
  { label: "Notifications", icon: <FaBell /> },
  { label: "My Profile", icon: <FaUserCircle /> },
];

const VendorSidebar = ({ component, setComponent, toggleSidebar }) => {
  const navigate = useNavigate();
  const { setauthenticatedUser } = useAuth();

  // 🔴 Read unread count on each render
  const vendorUnread =
    Number(localStorage.getItem("vendor_unread_notifications")) || 0;

  const handleBackToWebsite = () => {
    navigate("/");
    toggleSidebar?.();
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setauthenticatedUser(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Vendor logout error:", error);
      toast.error(
        error.response?.data?.message || "Error during logout. Try again."
      );
    } finally {
      navigate("/login");
    }
  };

  return (
    <aside
      className="fixed md:static hidden md:flex flex-col w-64 min-h-screen p-4
                 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                 border-r border-blue-50 left-0 top-0 z-20"
    >
      {/* Logo (same style as before) */}
      <div className="mb-3 flex items-center gap-3 px-2 py-2.5 rounded-2xl bg-white/70 border border-blue-50 shadow-sm shadow-slate-200 mt-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295781/website_static_media/ad_logo.svg"
            alt="ACCU Design"
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-800">
            ACCU <span className="text-blue-500">Design</span>
          </h1>
          <p className="text-[11px] text-gray-500">Vendor Dashboard</p>
        </div>
      </div>

      {/* 🔙 Back to Website */}
      <button
        onClick={handleBackToWebsite}
        className="flex items-center gap-2 w-full mb-3 px-3 py-2 rounded-xl text-xs font-medium
                   bg-slate-50 border border-slate-200 text-slate-700
                   hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100
                   hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px]
                   hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md
                   transition-all"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs bg-blue-50 text-blue-500">
          <FaHome />
        </span>
        <span className="truncate">Back to Website</span>
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 mt-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setComponent(item.label);
              toggleSidebar?.();
            }}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
               border transition-all duration-200
               ${
                 component === item.label
                   ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
                   : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
               }`}
          >
            <span className="relative flex items-center justify-center w-7 h-7 rounded-full text-xs bg-blue-50 text-blue-500">
              {item.icon}

              {/* 🔴 Unread Notification Bubble */}
              {item.label === "Notifications" && vendorUnread > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              )}
            </span>

            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-2 flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold
                   bg-red-50 border border-red-200 text-red-600
                   hover:bg-red-100 hover:border-red-400 hover:-translate-y-[1px]
                   hover:shadow-[0_8px_18px_rgba(248,113,113,0.5)] active:translate-y-0 active:shadow-md
                   transition-all"
      >
        <FaSignOutAlt />
        Logout
      </button>

      <div className="mt-3 text-center text-[10px] text-gray-400">
        &copy; {new Date().getFullYear()} ACCU DESIGN • Vendor
      </div>
    </aside>
  );
};

export default VendorSidebar;
