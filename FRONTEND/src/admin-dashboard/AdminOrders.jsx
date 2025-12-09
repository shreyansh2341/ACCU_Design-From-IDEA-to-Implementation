import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaIndustry,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import AdminOrderDetail from "./AdminOrderDetail.jsx";
import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const PAGE_SIZE = 3;

// -------- Status helpers ---------- //
const getStatusInfo = (status) => {
  switch (status) {
    case "requested":
      return {
        label: "Requested",
        badge:
          "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm shadow-blue-100",
      };
    case "received":
      return {
        label: "Received",
        badge:
          "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm shadow-indigo-100",
      };
    case "reviewed_by_vendor":
      return {
        label: "Reviewed by Vendor",
        badge:
          "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm shadow-purple-100",
      };
    case "in_production":
      return {
        label: "In Production",
        badge:
          "bg-yellow-50 text-yellow-800 border border-yellow-200 shadow-sm shadow-yellow-100",
      };
    case "out_for_delivery":
      return {
        label: "Out for Delivery",
        badge:
          "bg-orange-50 text-orange-700 border border-orange-200 shadow-sm shadow-orange-100",
      };
    case "completed":
      return {
        label: "Completed",
        badge:
          "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm shadow-emerald-100",
      };
    case "cancel_requested":
      return {
        label: "Cancel Requested",
        badge:
          "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm shadow-amber-100",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        badge:
          "bg-red-50 text-red-700 border border-red-200 shadow-sm shadow-red-100",
      };
    default:
      return {
        label: status || "Unknown",
        badge:
          "bg-gray-50 text-gray-700 border border-gray-200 shadow-sm shadow-gray-100",
      };
  }
};

// Colors for the status filter select
const getFilterSelectClass = (value) => {
  switch (value) {
    case "requested":
      return "bg-blue-50 border-blue-200 text-blue-700";
    case "received":
      return "bg-indigo-50 border-indigo-200 text-indigo-700";
    case "reviewed_by_vendor":
      return "bg-purple-50 border-purple-200 text-purple-700";
    case "in_production":
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    case "out_for_delivery":
      return "bg-orange-50 border-orange-200 text-orange-700";
    case "completed":
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    case "cancel_requested":
      return "bg-amber-50 border-amber-200 text-amber-700";
    case "cancelled":
      return "bg-red-50 border-red-200 text-red-700";
    default:
      return "bg-white border-blue-100 text-gray-700";
  }
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/admin/all-orders`,
        { withCredentials: true }
      );
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOrders = useMemo(() => {
    return (orders || [])
      .filter((o) => {
        if (statusFilter === "all") return true;
        return o.status === statusFilter;
      })
      .filter((o) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          o.title?.toLowerCase().includes(q) ||
          o.serviceType?.toLowerCase().includes(q) ||
          o.user?.name?.toLowerCase().includes(q) ||
          o._id?.toLowerCase().includes(q)
        );
      });
  }, [orders, statusFilter, search]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredOrders?.length || 0) / PAGE_SIZE)
  );

  const pageOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  // const totalPages = Math.ceil(users.length / pageSize) || 1;
  // const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  // const startIndex = (safePage - 1) * pageSize;
  // const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  // const handlePageChange = (page) => {
  //   if (page < 1 || page > totalPages) return;
  //   setCurrentPage(page);
  // };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderUpdated = (updatedId) => {
    // Refresh list and keep detail in sync
    fetchOrders().then(() => {
      if (!updatedId) {
        setSelectedOrder(null);
        return;
      }
      const refreshed = orders.find((o) => o._id === updatedId);
      if (refreshed) setSelectedOrder(refreshed);
      else setSelectedOrder(null);
    });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc]"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sidebar */}
      <AdminOpsSidebar />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:ml-34 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column - Orders list */}
          <section className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-[#2479C2] flex items-center gap-2">
                <span className="w-2 h-7 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full shadow shadow-blue-300/50" />
                All Orders
              </h1>
              <button
                type="button"
                onClick={fetchOrders}
                className="text-[11px] px-3 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50
                           hover:bg-blue-100 hover:border-blue-400 hover:-translate-y-[1px] hover:shadow-md
                           active:translate-y-0 active:shadow-sm transition"
              >
                Refresh
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by title, user, service, or ID..."
                  className="w-full pl-9 pr-3 py-2 rounded-full border border-blue-100 text-xs bg-white/85
                             focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2 text-xs">
                <FaFilter className="text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`border rounded-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${getFilterSelectClass(
                    statusFilter
                  )}`}
                >
                  <option value="all">All Statuses</option>
                  <option value="requested">Requested</option>
                  <option value="received">Received</option>
                  <option value="reviewed_by_vendor">Reviewed by Vendor</option>
                  <option value="in_production">In Production</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="completed">Completed</option>
                  <option value="cancel_requested">Cancel Requested</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Order cards */}
            {pageOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No orders found for current filter.
              </p>
            ) : (
              <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
                {pageOrders.map((order) => {
                  const info = getStatusInfo(order.status);
                  const isActive = selectedOrder?._id === order._id;
                  const hasCancelPending =
                    order.status === "cancel_requested" ||
                    (order.cancellation?.requested &&
                      order.cancellation?.status === "pending");

                  return (
                    <div
                      key={order._id}
                      onClick={() => handleSelectOrder(order)}
                      className={`relative cursor-pointer rounded-2xl border p-3 text-xs md:text-sm transition 
                        ${isActive
                          ? "border-blue-400 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-[0_12px_30px_rgba(37,99,235,0.35)] scale-[1.01]"
                          : "border-blue-50 bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(148,163,184,0.4)]"
                        }`}
                    >
                      {/* Cancel badge */}
                      {hasCancelPending && (
                        <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 shadow-sm">
                          <FaExclamationTriangle className="text-[10px]" />
                          Cancel Request
                        </span>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold shadow-md">
                            {order.title?.charAt(0)?.toUpperCase() || "O"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h2 className="font-semibold text-gray-900 truncate max-w-[180px]">
                              {order.title}
                            </h2>
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-[10px] font-semibold ${info.badge}`}
                            >
                              {info.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                            <FaIndustry className="inline mr-1 text-[10px]" />
                            {order.serviceType || "Service"} • Qty:{" "}
                            {order.quantity}
                          </p>
                          <div className="flex flex-wrap items-center justify-between mt-2 gap-1">
                            <div className="flex flex-col gap-0.5 text-[11px] text-gray-600">
                              <span className="flex items-center gap-1">
                                <FaUser className="text-[10px] text-blue-500" />
                                User:{" "}
                                <span className="font-semibold">
                                  {order.user?.name || "N/A"}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <FaUser className="text-[10px] text-purple-500" />
                                Vendor:{" "}
                                <span className="font-semibold">
                                  {order.vendor?.name || "Not assigned"}
                                </span>
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-500 flex flex-col items-end gap-0.5">
                              <span className="flex items-center gap-1">
                                <FaClock className="text-[10px]" />
                                {formatDateTime(order.createdAt)}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectOrder(order);
                                }}
                                className="mt-1 inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[11px] font-semibold border border-blue-500
                                        hover:from-blue-600 hover:to-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                                        active:translate-y-0 active:shadow-md transition"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px]">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-7 h-7 rounded-full border 
                    ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:shadow-sm"
                    } transition`}
                >
                  <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-7 h-7 rounded-full text-xs font-semibold transition
                        ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-[0_6px_16px_rgba(37,99,235,0.6)]"
                            : "bg-white border border-blue-100 text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-7 h-7 rounded-full border 
                    ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:shadow-sm"
                    } transition`}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </section>

          {/* Right column - Details */}
          <section className="lg:col-span-3">
            {selectedOrder ? (
              <AdminOrderDetail
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onOrderUpdated={handleOrderUpdated}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-xs md:text-sm text-gray-500 bg-white/60 rounded-2xl border border-dashed border-blue-200">
                Select an order on the left to view full details, timeline,
                vendor assignment and cancellation info.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;

// src/admin-dashboard-ops/AdminOrders.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   FaSearch,
//   FaFilter,
//   FaUser,
//   FaIndustry,
//   FaClock,
//   FaChevronLeft,
//   FaChevronRight,
//   FaExclamationTriangle,
//   FaTrashAlt,
// } from "react-icons/fa";
// import AdminOrderDetail from "./AdminOrderDetail.jsx";
// import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

// const REACT_APP_BACKEND_URL =
//   import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

// // **** Only 5 per page ****
// const PAGE_SIZE = 5;

// // -------- Status helpers ---------- //
// const getStatusInfo = (status) => {
//   switch (status) {
//     case "requested":
//       return {
//         label: "Requested",
//         badge:
//           "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm shadow-blue-100",
//       };
//     case "received":
//       return {
//         label: "Received",
//         badge:
//           "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm shadow-indigo-100",
//       };
//     case "reviewed_by_vendor":
//       return {
//         label: "Reviewed by Vendor",
//         badge:
//           "bg-purple-50 text-purple-700 border border-purple-200 shadow-sm shadow-purple-100",
//       };
//     case "in_production":
//       return {
//         label: "In Production",
//         badge:
//           "bg-yellow-50 text-yellow-800 border border-yellow-200 shadow-sm shadow-yellow-100",
//       };
//     case "out_for_delivery":
//       return {
//         label: "Out for Delivery",
//         badge:
//           "bg-orange-50 text-orange-700 border border-orange-200 shadow-sm shadow-orange-100",
//       };
//     case "completed":
//       return {
//         label: "Completed",
//         badge:
//           "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm shadow-emerald-100",
//       };
//     case "cancel_requested":
//       return {
//         label: "Cancel Requested",
//         badge:
//           "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm shadow-amber-100",
//       };
//     case "cancelled":
//       return {
//         label: "Cancelled",
//         badge:
//           "bg-red-50 text-red-700 border border-red-200 shadow-sm shadow-red-100",
//       };
//     default:
//       return {
//         label: status || "Unknown",
//         badge:
//           "bg-gray-50 text-gray-700 border border-gray-200 shadow-sm shadow-gray-100",
//       };
//   }
// };

// // Colors for the status filter select
// const getFilterSelectClass = (value) => {
//   switch (value) {
//     case "requested":
//       return "bg-blue-50 border-blue-200 text-blue-700";
//     case "received":
//       return "bg-indigo-50 border-indigo-200 text-indigo-700";
//     case "reviewed_by_vendor":
//       return "bg-purple-50 border-purple-200 text-purple-700";
//     case "in_production":
//       return "bg-yellow-50 border-yellow-200 text-yellow-800";
//     case "out_for_delivery":
//       return "bg-orange-50 border-orange-200 text-orange-700";
//     case "completed":
//       return "bg-emerald-50 border-emerald-200 text-emerald-700";
//     case "cancel_requested":
//       return "bg-amber-50 border-amber-200 text-amber-700";
//     case "cancelled":
//       return "bg-red-50 border-red-200 text-red-700";
//     default:
//       return "bg-white border-blue-100 text-gray-700";
//   }
// };

// const formatDateTime = (d) =>
//   new Date(d).toLocaleString("en-IN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   });

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get(
//         `${REACT_APP_BACKEND_URL}/api/order/admin/all-orders`,
//         { withCredentials: true }
//       );
//       setOrders(data.orders || []);
//     } catch (error) {
//       console.error("Error fetching admin orders:", error);
//       toast.error("Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

// const filteredOrders = useMemo(() => {
//   return (orders || [])
//     .filter((o) => {
//       if (statusFilter === "all") return true;
//       return o.status === statusFilter;
//     })
//     .filter((o) => {
//       if (!search.trim()) return true;
//       const q = search.toLowerCase();
//       return (
//         o.title?.toLowerCase().includes(q) ||
//         o.serviceType?.toLowerCase().includes(q) ||
//         o.user?.name?.toLowerCase().includes(q) ||
//         o._id?.toLowerCase().includes(q)
//       );
//     });
// }, [orders, statusFilter, search]);

// const totalPages = Math.max(
//   1,
//   Math.ceil((filteredOrders?.length || 0) / PAGE_SIZE)
// );

// const pageOrders = useMemo(() => {
//   const start = (currentPage - 1) * PAGE_SIZE;
//   return filteredOrders.slice(start, start + PAGE_SIZE);
// }, [filteredOrders, currentPage]);

// const handleSelectOrder = (order) => {
//   setSelectedOrder(order);
// };

// const handlePageChange = (page) => {
//   if (page < 1 || page > totalPages) return;
//   setCurrentPage(page);
// };

//   const handleOrderUpdated = (updatedId) => {
//     // Refresh list and keep detail in sync
//     fetchOrders().then(() => {
//       if (!updatedId) {
//         setSelectedOrder(null);
//         return;
//       }
//       const refreshed = orders.find((o) => o._id === updatedId);
//       if (refreshed) setSelectedOrder(refreshed);
//       else setSelectedOrder(null);
//     });
//   };



//   // const handleDeleteOrder = async (orderId) => {
//   //   if (
//   //     !window.confirm(
//   //       "Are you sure you want to permanently delete this order and all its chats? This cannot be undone."
//   //     )
//   //   )
//   //     return;

//   //   try {
//   //     await axios.delete(
//   //       `${REACT_APP_BACKEND_URL}/api/order/admin/order/${orderId}`,
//   //       { withCredentials: true }
//   //     );
//   //     toast.success("Order and related chats deleted");
//   //     setOrders((prev) => prev.filter((o) => o._id !== orderId));
//   //     if (selectedOrder?._id === orderId) {
//   //       setSelectedOrder(null);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting order:", error);
//   //     toast.error(
//   //       error.response?.data?.message || "Failed to delete order"
//   //     );
//   //   }
//   // };

//   return (
//     <div
//       className="flex min-h-screen bg-gradient-to-br from-white via-[#e6f3fc] to-[#d4eafc] overflow-x-hidden"
//       style={{
//         backgroundImage: `linear-gradient(rgba(240, 248, 255, 0.6), rgba(230, 243, 252, 0.75)), url("/images/bg-image-getquote.jpg")`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <AdminOpsSidebar />

//       <main className="flex-1 px-4 py-10 md:ml-34 transition-all duration-300 overflow-x-hidden">
//         {/* FLEX instead of grid; fixed width ratios to avoid overlap */}
//         <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
//           {/* LEFT: Orders list (slightly narrower) */}
//           <div className="w-full lg:w-[42%] bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 flex flex-col">
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-xl font-bold text-[#2479C2] flex items-center gap-2">
//                 <span className="w-2 h-7 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full shadow shadow-blue-300/50" />
//                 Orders
//               </h1>
//               <button
//                 type="button"
//                 onClick={fetchOrders}
//                 className="text-[11px] px-3 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50
//                            hover:bg-blue-100 hover:border-blue-400 hover:-translate-y-[1px] hover:shadow-md
//                            active:translate-y-0 active:shadow-sm transition"
//               >
//                 Refresh
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-4">
//               <div className="relative flex-1">
//                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   placeholder="Search by title, service, user, or ID..."
//                   className="w-full pl-8 pr-3 py-2 rounded-full border border-blue-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <FaFilter className="text-gray-400 text-xs" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className={`text-xs px-3 py-2 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${getFilterSelectClass(
//                     statusFilter
//                   )}`}
//                 >
//                   <option value="all">All statuses</option>
//                   <option value="requested">Requested</option>
//                   <option value="received">Received</option>
//                   <option value="reviewed_by_vendor">
//                     Reviewed by Vendor
//                   </option>
//                   <option value="in_production">In Production</option>
//                   <option value="out_for_delivery">Out for Delivery</option>
//                   <option value="completed">Completed</option>
//                   <option value="cancel_requested">Cancel Requested</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </div>

//             {/* Orders table – scroll inside card */}
//             {pageOrders.length === 0 ? (
//               <div className="flex-1 flex flex-col items-center justify-center py-6 text-gray-500 text-sm gap-3">
//                 <FaExclamationTriangle className="text-2xl text-amber-400" />
//                 <p>No orders match your current filters.</p>
//               </div>
//             ) : (
//               <div className="flex-1 min-h-0 max-h-[60vh] overflow-y-auto">
//                 <table className="w-full text-xs md:text-sm">
//                   <thead className="sticky top-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 z-10">
//                     <tr className="border-b border-blue-100">
//                       <th className="py-2 px-2 text-left">Order</th>
//                       <th className="py-2 px-2 text-left">User</th>
//                       <th className="py-2 px-2 text-left">Status</th>
//                       <th className="py-2 px-2 text-left">Created</th>
//                       <th className="py-2 px-2 text-left">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {pageOrders.map((order) => {
//                       const info = getStatusInfo(order.status);
//                       const isActive = selectedOrder?._id === order._id;
//                       return (
//                         <tr
//                           key={order._id}
//                           className={`border-b transition transform ${
//                             isActive
//                               ? "bg-blue-50/80 border-blue-200 shadow-inner"
//                               : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(148,163,184,0.4)] cursor-pointer"
//                           }`}
//                           onClick={() => handleSelectOrder(order)}
//                         >
//                           <td className="py-2 px-2">
//                             <div className="font-semibold truncate max-w-[150px] flex items-center gap-1">
//                               <FaIndustry className="text-gray-400 text-xs" />
//                               <span className="truncate">
//                                 {order.title}
//                               </span>
//                             </div>
//                             <div className="text-[11px] text-gray-500 truncate max-w-[150px]">
//                               {order.serviceType || "Service"} • Qty:{" "}
//                               {order.quantity}
//                             </div>
//                           </td>
//                           <td className="py-2 px-2">
//                             <div className="flex items-center gap-2 text-[11px]">
//                               <FaUser className="text-gray-400" />
//                               <div>
//                                 <p className="font-semibold">
//                                   {order.user?.name || "—"}
//                                 </p>
//                                 <p className="text-gray-500 truncate max-w-[140px]">
//                                   {order.user?.email}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-2 px-2">
//                             <span
//                               className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold ${info.badge}`}
//                             >
//                               {info.label}
//                             </span>
//                           </td>
//                           <td className="py-2 px-2 text-[11px] text-gray-500">
//                             <div className="flex items-center gap-1">
//                               <FaClock className="text-[11px] text-gray-400" />
//                               <span>
//                                 {formatDateTime(order.createdAt)}
//                               </span>
//                             </div>
//                           </td>
//                           <td
//                             className="py-2 px-2"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             <div className="flex flex-col gap-1">
//                               <button
//                                 type="button"
//                                 onClick={() => handleSelectOrder(order)}
//                                 className="text-[11px] px-3 py-1 rounded-full
//                                            bg-gradient-to-r from-blue-500 to-blue-600
//                                            text-white border border-blue-500
//                                            hover:from-blue-600 hover:to-blue-700
//                                            hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
//                                            active:translate-y-0 active:shadow-md
//                                            transition"
//                               >
//                                 View Details
//                               </button>
//                               {/* <button
//                                 type="button"
//                                 onClick={() => handleDeleteOrder(order._id)}
//                                 className="text-[11px] px-3 py-1 rounded-full
//                                            flex items-center justify-center gap-1
//                                            border border-red-300 bg-red-50 text-red-600
//                                            hover:bg-red-100 hover:border-red-400
//                                            hover:-translate-y-[1px] hover:shadow-md
//                                            active:translate-y-0 active:shadow-sm transition"
//                               >
//                                 <FaTrashAlt className="text-[10px]" />
//                                 Delete
//                               </button> */}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Pagination
//             <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500">
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="p-1 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
//                 >
//                   <FaChevronLeft className="text-xs" />
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="p-1 rounded-full border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
//                 >
//                   <FaChevronRight className="text-xs" />
//                 </button>
//               </div>
//             </div> */}
//           </div>

//           {/* RIGHT: Order detail – wider column so it fits, no overlap */}
//           <div className="w-full lg:w-[58%]">
//             {selectedOrder ? (
//               <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 h-full overflow-hidden">
//                 <AdminOrderDetail
//                   order={selectedOrder}
//                   onClose={() => setSelectedOrder(null)}
//                   onOrderUpdated={handleOrderUpdated}
//                 />
//               </div>
//             ) : (
//               <div className="hidden lg:flex items-center justify-center bg-white/70 border border-dashed border-blue-200 rounded-2xl h-full">
//                 <p className="text-sm text-gray-500 px-4 text-center">
//                   Select an order from the list to view full details, update
//                   status, assign vendors, and manage cancellations.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminOrders;
