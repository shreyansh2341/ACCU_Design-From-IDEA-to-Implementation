import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/admin/users`,
        { withCredentials: true }
      );
      setUsers(data.users || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      toast.success("Role updated");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? data.user : u))
      );
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(
        error.response?.data?.message || "Failed to update user role"
      );
    }
  };

  const handleToggleActive = async (userId) => {
    try {
      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/admin/users/${userId}/toggle-active`,
        {},
        { withCredentials: true }
      );
      toast.success("User status updated");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? data.user : u))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    }
  };

  // Role-based color classes
  const getRoleClasses = (role) => {
    switch (role) {
      case "admin":
        return {
          pill: "bg-purple-50 text-purple-700 border-purple-200",
          select:
            "bg-purple-50/80 border-purple-200 text-purple-700 focus:ring-purple-300 focus:border-purple-300",
        };
      case "vendor":
        return {
          pill: "bg-amber-50 text-amber-700 border-amber-200",
          select:
            "bg-amber-50/80 border-amber-200 text-amber-700 focus:ring-amber-300 focus:border-amber-300",
        };
      default:
        return {
          pill: "bg-blue-50 text-blue-700 border-blue-200",
          select:
            "bg-blue-50/80 border-blue-200 text-blue-700 focus:ring-blue-300 focus:border-blue-300",
        };
    }
  };

  // Pagination
  const totalPages = Math.ceil(users.length / pageSize) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-[#e8f3fc] to-[#d9e9fb]">
      <AdminOpsSidebar />

      <main className="flex-1 flex justify-center px-4 py-10 md:ml-34 transition-all duration-300">
        <div className="w-full max-w-6xl mx-auto">
          {/* Animated Heading */}
          <h1
            className="text-3xl font-bold mb-8 text-center text-[#2479C2]
                     transition-all duration-300 hover:text-blue-600 hover:scale-[1.03]
                     cursor-default select-none"
          >
            Users & Vendors Management
          </h1>

          {users.length === 0 ? (
            <p className="text-center text-gray-500">No users yet.</p>
          ) : (
            <div
              className="bg-white/85 backdrop-blur-md rounded-2xl 
                          shadow-[0_15px_40px_rgba(36,121,194,0.18)]
                          border border-blue-50 p-6 mx-auto"
            >
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {paginatedUsers.map((u) => {
                  const roleClasses = getRoleClasses(u.role);
                  const initials = (u.name || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={u._id}
                      className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 shadow-sm 
                               hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50/80 
                               hover:via-white hover:to-blue-50 hover:shadow-[0_12px_30px_rgba(148,163,184,0.55)]
                               transform hover:-translate-y-[4px] transition-all duration-300 ease-out p-5 flex flex-col"
                    >
                      {/* Avatar + Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500
                                        flex items-center justify-center text-sm font-semibold text-white 
                                        shadow-md shadow-blue-500/40"
                          >
                            {initials}
                          </div>
                          <span
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              u.isActive ? "bg-emerald-400" : "bg-red-400"
                            }`}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {u.name}
                          </p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>

                      {/* Role + Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] border font-medium 
                        ${roleClasses.pill}`}
                        >
                          {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        </span>

                        <span
                          className={`px-2 py-1 rounded-full text-[11px] border font-medium ${
                            u.isActive
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {u.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="mt-auto">
                        <p className="text-[11px] text-gray-500 mb-1">
                          Change Role
                        </p>

                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className={`w-full text-xs px-2 py-1.5 rounded-xl border outline-none 
                        ${roleClasses.select}`}
                        >
                          <option value="user">User</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                        </select>

                        <button
                          onClick={() => handleToggleActive(u._id)}
                          className={`mt-3 w-full text-xs font-semibold px-3 py-1.5 rounded-xl border
                                    flex items-center justify-center transition
                                    ${
                                      u.isActive
                                        ? "border-red-200 text-red-600 bg-red-50/80 hover:bg-red-100 hover:border-red-300 hover:shadow-[0_8px_18px_rgba(248,113,113,0.55)]"
                                        : "border-green-200 text-green-600 bg-green-50/80 hover:bg-green-100 hover:border-green-300 hover:shadow-[0_8px_18px_rgba(34,197,94,0.55)]"
                                    }
                                    hover:-translate-y-[1px] active:translate-y-0 active:shadow-md`}
                        >
                          {u.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="mt-5 flex items-center justify-between text-xs text-gray-600">
                <span>
                  Page {safePage} of {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage === 1}
                    className={`px-2 py-1 rounded-full border
                               ${
                                 safePage === 1
                                   ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                   : "text-blue-600 border-blue-300 hover:bg-blue-50 hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0"
                               } transition`}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    const isActive = page === safePage;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-7 h-7 rounded-full text-xs font-semibold border
                                    ${
                                      isActive
                                        ? "bg-blue-600 text-white border-blue-600 shadow-[0_6px_16px_rgba(37,99,235,0.7)]"
                                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50 hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0"
                                    } transition`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={`px-2 py-1 rounded-full border
                               ${
                                 safePage === totalPages
                                   ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                   : "text-blue-600 border-blue-300 hover:bg-blue-50 hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0"
                               } transition`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
