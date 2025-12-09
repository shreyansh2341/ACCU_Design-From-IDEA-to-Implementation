import React from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import {
  LogOut,
  Home,
  FilePlus2,
  ListOrdered,
  MessageCircle,
  Bell,
  User,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const UserSidebar = ({ component, setComponent, toggleSidebar }) => {
  const { setauthenticatedUser } = useAuth();

  const navItems = [
    {
      label: "Place an Order",
      key: "UploadCAD",
      icon: <FilePlus2 size={18} />,
    },
    {
      label: "My Orders",
      key: "MyOrders",
      icon: <ListOrdered size={18} />,
    },
    {
      label: "Messages",
      key: "Messages",
      icon: <MessageCircle size={18} />,
    },
    {
      label: "Notifications",
      key: "Notifications",
      icon: <Bell size={18} />,
    },
    {
      label: "My Profile",
      key: "My Profile",
      icon: <User size={18} />,
    },
  ];

  const handleClick = (key) => {
    if (setComponent) setComponent(key);
    if (toggleSidebar) toggleSidebar();
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setauthenticatedUser(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Error during logout");
    }
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <nav className="flex flex-col h-full p-4 overflow-y-auto bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] border-r border-blue-50">
      {/* 🔹 Logo block (same style as Vendor sidebar) */}
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
          <p className="text-[11px] text-gray-500">User Dashboard</p>
        </div>
      </div>

      {/* Back to Home */}
      <button
        onClick={goHome}
        className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl border border-blue-100 
                   bg-gradient-to-r from-blue-50 via-white to-blue-50 text-blue-700 text-xs font-semibold
                   hover:from-blue-100 hover:via-white hover:to-blue-200
                   hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(37,99,235,0.35)]
                   active:translate-y-0 active:shadow-md
                   transition"
      >
        <Home size={16} />
        <span>Back to Home</span>
      </button>

      {/* Navigation Buttons */}
      <div className="flex-1 space-y-2">
        {navItems.map(({ label, key, icon }) => {
          const isActive = component === key;
          return (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
                          border transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
                              : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
                          }`}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-blue-50 text-blue-500"
                            }`}
              >
                {icon}
              </span>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-3 py-2 mt-4 rounded-xl text-sm font-semibold
                   text-red-600 border border-red-100 bg-red-50/60
                   hover:bg-red-100 hover:border-red-300
                   hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(248,113,113,0.45)]
                   active:translate-y-0 active:shadow-md
                   transition"
      >
        <LogOut size={18} />
        <span className="ml-3">Logout</span>
      </button>

      <div className="mt-3 text-center text-[10px] text-gray-400 hidden sm:block">
        &copy; {new Date().getFullYear()} ACCU DESIGN
      </div>
    </nav>
  );
};

export default UserSidebar;
