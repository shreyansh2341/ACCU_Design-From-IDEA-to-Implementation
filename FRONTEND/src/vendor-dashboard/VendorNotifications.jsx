import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaBell,
  FaRegClock,
  FaClipboardCheck,
  FaIndustry,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

/* ================= STATUS META (EXACT SAME AS USER) ================= */

const getStatusMeta = (status) => {
  switch (status) {
    case "requested":
      return {
        label: "Order Requested",
        color: "text-blue-600",
        pill: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <FaRegClock />,
      };
    case "received":
      return {
        label: "Order Received by Admin",
        color: "text-indigo-600",
        pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: <FaClipboardCheck />,
      };
    case "reviewed_by_vendor":
      return {
        label: "Reviewed by Vendor",
        color: "text-purple-600",
        pill: "bg-purple-50 text-purple-700 border-purple-200",
        icon: <FaClipboardCheck />,
      };
    case "in_production":
      return {
        label: "In Production",
        color: "text-yellow-600",
        pill: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: <FaIndustry />,
      };
    case "out_for_delivery":
      return {
        label: "Out for Delivery",
        color: "text-orange-600",
        pill: "bg-orange-50 text-orange-700 border-orange-200",
        icon: <FaTruck />,
      };
    case "completed":
      return {
        label: "Order Completed",
        color: "text-emerald-600",
        pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <FaCheckCircle />,
      };
    case "cancel_requested":
      return {
        label: "Cancellation Requested",
        color: "text-amber-600",
        pill: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <FaRegClock />,
      };
    case "cancelled":
      return {
        label: "Order Cancelled",
        color: "text-red-600",
        pill: "bg-red-50 text-red-700 border-red-200",
        icon: <FaTimesCircle />,
      };
    default:
      return {
        label: status || "Status Updated",
        color: "text-gray-600",
        pill: "bg-gray-50 text-gray-700 border-gray-200",
        icon: <FaBell />,
      };
  }
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ================= COMPONENT ================= */

const VendorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(
    Number(localStorage.getItem("vendor_unread_notifications")) || 0
  );
  const [loading, setLoading] = useState(true);

  // ✅ Pagination (SAME AS USER)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  /* ========== FETCH VENDOR ORDERS → CONVERT TO NOTIFICATIONS ========== */
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/vendor/my-orders`,
        { withCredentials: true }
      );

      const orders = data.orders || [];

      // ✅ Convert orders to notification objects (EXACT USER LOGIC)
      const notifs = orders
        .map((order) => {
          const latestStatusEntry = (order.statusHistory || []).slice(-1)[0];
          const when =
            latestStatusEntry?.updatedAt ||
            order.updatedAt ||
            order.createdAt;

          return {
            _id: order._id,
            orderTitle: order.title,
            status: order.status,
            time: when,
            note:
              latestStatusEntry?.note ||
              `Status changed to "${order.status || "updated"}"`,
          };
        })
        .sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

      setNotifications(notifs);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching vendor notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
    const prevCount =
      Number(localStorage.getItem("vendor_total_notifications")) || 0;

    if (notifs.length > prevCount) {
      const diff = notifs.length - prevCount;
      const updatedUnread = unreadCount + diff;

      setUnreadCount(updatedUnread);
      localStorage.setItem(
        "vendor_unread_notifications",
        String(updatedUnread)
      );
    }

    localStorage.setItem(
      "vendor_total_notifications",
      String(notifs.length)
    );

  };

  useEffect(() => {
    // When vendor opens notification page → reset unread
    setUnreadCount(0);
    localStorage.setItem("vendor_unread_notifications", "0");
  }, []);


  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ========== PAGINATION HELPERS ========== */
  const totalPages = Math.ceil(notifications.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedNotifications = notifications.slice(
    startIndex,
    startIndex + pageSize
  );

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
      <div className="w-full max-w-5xl mx-auto mt-14 mb-8 px-4">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-5">

          {/* ✅ HEADER */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40">
                <FaBell className="text-white text-lg" />
              </span>
              <div>
                {/* <h1 className="text-xl font-bold text-[#2479C2]">
                  Vendor Notifications
                </h1> */}
                <h1 className="text-xl font-bold text-[#2479C2] flex items-center gap-2">
                  Vendor Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </h1>

                <p className="text-xs text-gray-500">
                  All recent updates related to your assigned orders.
                </p>
              </div>
            </div>

            <button
              onClick={fetchNotifications}
              className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50
                         hover:bg-blue-100 hover:border-blue-300 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.45)]
                         active:translate-y-0 active:shadow-md transition"
            >
              Refresh
            </button>
          </div>

          {/* ✅ BODY */}
          {loading ? (
            <p className="text-sm text-gray-500">Loading notifications…</p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-10">
              No notifications yet. Orders assigned to you will appear here.
            </p>
          ) : (
            <>
              <div className="max-h-[70vh] overflow-y-auto space-y-3">

                {paginatedNotifications.map((notif, idx) => {
                  const meta = getStatusMeta(notif.status);
                  const isFirst = idx === 0;

                  return (
                    <div
                      key={`${notif._id}-${idx}`}
                      className="flex gap-3 items-start"
                    >
                      {/* ✅ Timeline Bullet */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-2.5 h-2.5 rounded-full 
                                      bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
                                      shadow shadow-blue-400/70
                                      ${isFirst ? "scale-110" : ""}`}
                        />
                        {idx !== paginatedNotifications.length - 1 && (
                          <span className="flex-1 w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent mt-1" />
                        )}
                      </div>

                      {/* ✅ Notification Card */}
                      <div
                        className={`flex-1 rounded-xl border px-3 py-2.5 bg-white/90 
                                    hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-50
                                    hover:-translate-y-[1px] hover:shadow-[0_12px_26px_rgba(148,163,184,0.5)]
                                    active:translate-y-0 active:shadow-md
                                    transition
                                    ${isFirst
                            ? "border-blue-300 shadow-[0_0_18px_rgba(37,99,235,0.35)]"
                            : "border-blue-50 shadow-sm shadow-slate-200"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs bg-blue-50 text-blue-600">
                              {meta.icon}
                            </div>
                            <div>
                              <p className={`text-xs font-semibold ${meta.color}`}>
                                {meta.label}
                              </p>
                              <p className="text-[11px] text-gray-500">
                                Order:{" "}
                                <span className="font-medium text-gray-700">
                                  {notif.orderTitle}
                                </span>
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {formatDateTime(notif.time)}
                          </span>
                        </div>

                        {notif.note && (
                          <p className="mt-1.5 text-xs text-gray-600">
                            {notif.note}
                          </p>
                        )}

                        <span
                          className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-[10px] border ${meta.pill}`}
                        >
                          {notif.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ✅ PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-600">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-full border transition ${currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                      : "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300"
                      }`}
                  >
                    Previous
                  </button>

                  <span className="text-[11px]">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-full border transition ${currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                      : "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300"
                      }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          <p className="mt-3 text-[11px] text-gray-500">
            For full order details and chat, use{" "}
            <span className="font-semibold text-[#2479C2]">My Orders</span> and{" "}
            <span className="font-semibold text-[#2479C2]">Messages</span>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default VendorNotifications;
