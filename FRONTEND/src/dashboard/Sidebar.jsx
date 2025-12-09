import React from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaFileAlt,
  FaPlus,
  FaUser,
  FaHome,
  FaBullhorn,
  FaStar,
  FaTachometerAlt
} from "react-icons/fa";
import { LogOut } from "lucide-react";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const Sidebar = ({ toggleSidebar }) => {
  const { profile, setauthenticatedUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "My Blogs", path: "/my-blogs", icon: <FaFileAlt /> },
    { label: "All Posts", path: "/all-posts", icon: <FaBullhorn /> },
    { label: "All Testimonials", path: "/all-testimonials", icon: <FaStar /> },
    { label: "Create Blog", path: "/create-blog", icon: <FaPlus /> },
    // { label: "Auto-Generate Blog", path: "/auto-generate", icon: <FaPlus /> },
    { label: "Create Post", path: "/create-post", icon: <FaPlus /> },
    { label: "Create Review Post", path: "/create-review-post", icon: <FaPlus /> },
    { label: "My Profile", path: "/my-profile", icon: <FaUser /> },
    { label: "Orders/ Users Dashboard", path: "/manage-orders", icon: <FaTachometerAlt /> },
  ];

  const handleNavigation = (path) => {
    if (toggleSidebar) toggleSidebar();
    navigate(path);
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
    handleNavigation("/");
  };

  return (
    <nav className="flex flex-col h-full p-4 overflow-y-auto bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] border-r border-blue-50">
      {/* User Info */}
      <div className="mb-4 text-center">
        <div className="relative inline-block">
          <img
            src={profile?.photo?.url}
            alt="profile"
            className="mx-auto w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md shadow-blue-400/60"
          />
          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        <h2 className="mt-2 text-lg font-semibold text-gray-900 truncate">
          {profile?.name}
        </h2>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>

      {/* Back to Home (below profile) */}
      <button
        onClick={goHome}
        className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl border border-blue-100 
                   bg-gradient-to-r from-blue-50 via-white to-blue-50 text-blue-700 text-xs font-semibold
                   hover:from-blue-100 hover:via-white hover:to-blue-200
                   hover:-translate-y-[1px] hover:shadow-[0_10px_22px_rgba(37,99,235,0.35)]
                   active:translate-y-0 active:shadow-md
                   transition"
      >
        <FaHome size={16} />
        <span>Back to Home</span>
      </button>

      {/* Navigation Buttons */}
      <div className="flex-1 space-y-2">
        {navItems.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => handleNavigation(path)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
                          border transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
                              : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
                          }`}
              aria-label={`Navigate to ${label}`}
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

      {/* Footer */}
      <div className="mt-3 text-center text-[10px] text-gray-400 hidden sm:block">
        &copy; {new Date().getFullYear()} ACCU DESIGN
      </div>
    </nav>
  );
};

export default Sidebar;
