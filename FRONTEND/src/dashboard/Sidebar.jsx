import React from "react";
import { useAuth } from "@/context/AuthProvider.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaFileAlt,
  FaPlus,
  FaBullhorn,
  FaStar,
  FaTachometerAlt,
  FaHome,
} from "react-icons/fa";
import { LogOut } from "lucide-react";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const Sidebar = ({ toggleSidebar }) => {
  const { setauthenticatedUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "My Blogs", path: "/my-blogs", icon: <FaFileAlt /> },
    { label: "All Posts", path: "/all-posts", icon: <FaBullhorn /> },
    { label: "All Testimonials", path: "/all-testimonials", icon: <FaStar /> },
    { label: "Create Blog", path: "/create-blog", icon: <FaPlus /> },
    { label: "Create Post", path: "/create-post", icon: <FaPlus /> },
    { label: "Create Review Post", path: "/create-review-post", icon: <FaPlus /> },
    { label: "My Profile", path: "/my-profile", icon: <FaFileAlt /> },
    {
      label: "Orders/Users Dashboard",
      path: "/manage-orders",
      icon: <FaTachometerAlt />,
    },
  ];

  const navigateTo = (path) => {
    if (toggleSidebar) toggleSidebar();
    navigate(path);
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_URL}/api/user/logout`, {
        withCredentials: true,
      });
      setauthenticatedUser(false);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <aside
      className="flex flex-col w-64 min-h-screen p-4
                 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                 border-r border-blue-50 overflow-hidden"   // ← NO SCROLLBAR
    >
      {/* Logo + Title (same as admin sidebar) */}
      <div className="mb-4 flex items-center gap-3 px-2 py-2.5 rounded-2xl
                      bg-white/70 border border-blue-50 shadow-sm shadow-slate-200">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500
                        flex items-center justify-center shadow-md shadow-blue-500/40 overflow-hidden">
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
          <p className="text-[11px] text-gray-500">Content Dashboard</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 mt-1">
        {navItems.map(({ label, path, icon }) => {
          const active = location.pathname === path;

          return (
            <button
              key={label}
              onClick={() => navigateTo(path)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
                          border transition-all duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
                              : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
                          }`}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs
                            ${
                              active
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
      </nav>

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="flex items-center w-full px-3 py-2 mt-4 rounded-xl text-sm font-semibold
                   text-red-600 border border-red-100 bg-red-50/60
                   hover:bg-red-100 hover:border-red-300
                   hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(248,113,113,0.45)]
                   active:translate-y-0 active:shadow-md transition"
      >
        <LogOut size={18} />
        <span className="ml-3">Logout</span>
      </button>

      {/* Footer */}
      <div className="mt-3 text-center text-[10px] text-gray-400">
        © {new Date().getFullYear()} ACCU DESIGN
      </div>
    </aside>
  );
};

export default Sidebar;
