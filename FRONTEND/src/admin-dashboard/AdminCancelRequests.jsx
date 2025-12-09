import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaBan,
  FaExclamationTriangle,
  FaUser,
  FaIndustry,
} from "react-icons/fa";
import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const AdminCancelRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/admin/cancel-requests`,
        { withCredentials: true }
      );
      setRequests(data.orders || []);
    } catch (error) {
      console.error("Error fetching cancel requests:", error);
      toast.error("Failed to load cancellation requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (orderId) => {
    if (!window.confirm("Approve cancellation and remove order from system?"))
      return;
    try {
      await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${orderId}/cancel-approve`,
        {},
        { withCredentials: true }
      );
      toast.success("Cancellation approved and order removed");
      setRequests((prev) => prev.filter((r) => r._id !== orderId));
    } catch (error) {
      console.error("Error approving cancellation:", error);
      toast.error(
        error.response?.data?.message || "Failed to approve cancellation"
      );
    }
  };

  const handleReject = async (orderId) => {
    const note = window.prompt(
      "Optional note for rejecting this cancellation:",
      ""
    );
    try {
      await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${orderId}/cancel-reject`,
        { note },
        { withCredentials: true }
      );
      toast.success("Cancellation request rejected");
      setRequests((prev) => prev.filter((r) => r._id !== orderId));
    } catch (error) {
      console.error("Error rejecting cancellation:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject cancellation"
      );
    }
  };

  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

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
      <AdminOpsSidebar />

      <main className="flex-1 px-4 py-8 md:ml-34 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-rose-600 flex items-center justify-center shadow-md shadow-red-500/40">
                <FaBan className="text-white text-lg" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-red-600">
                  Cancellation Requests
                </h1>
                <p className="text-xs text-gray-500">
                  Review user cancellation reasons and approve or reject.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={fetchRequests}
              className="text-[11px] px-3 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50
                         hover:bg-blue-100 hover:border-blue-400 hover:-translate-y-[1px] hover:shadow-md
                         active:translate-y-0 active:shadow-sm transition"
            >
              Refresh
            </button>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-[0_15px_40px_rgba(148,163,184,0.45)] border border-red-50 p-5">
            {loading ? (
              <p className="text-sm text-gray-500">Loading requests…</p>
            ) : requests.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                No pending cancellation requests right now.
              </p>
            ) : (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {requests.map((order) => {
                  const cancelInfo = order.cancellation || {};
                  return (
                    <div
                      key={order._id}
                      className="rounded-xl border border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 p-4 shadow-sm hover:shadow-[0_10px_24px_rgba(248,113,113,0.5)] hover:-translate-y-[2px] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {order.serviceType || "N/A"} • Qty:{" "}
                            {order.quantity}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-1">
                            Requested at:{" "}
                            {order.createdAt && formatDateTime(order.createdAt)}
                          </p>
                        </div>
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          {order.status?.replace(/_/g, " ") ||
                            "cancel requested"}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-start gap-2">
                          <FaUser className="mt-1 text-gray-500" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              User
                            </p>
                            <p className="text-gray-600">
                              {order.user?.name} ({order.user?.email})
                            </p>
                          </div>
                        </div>

                        {order.vendor && (
                          <div className="flex items-start gap-2">
                            <FaIndustry className="mt-1 text-gray-500" />
                            <div>
                              <p className="font-semibold text-gray-800">
                                Vendor
                              </p>
                              <p className="text-gray-600">
                                {order.vendor.name} ({order.vendor.email})
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-start gap-2 text-xs bg-red-50/60 border border-red-100 rounded-lg px-3 py-2">
                        <FaExclamationTriangle className="mt-0.5 text-red-500" />
                        <div>
                          <p className="font-semibold text-red-700 mb-1">
                            User’s Cancellation Reason
                          </p>
                          {cancelInfo.reasonType && (
                            <p className="text-red-800 font-medium">
                              Selected: {cancelInfo.reasonType}
                            </p>
                          )}
                          {cancelInfo.reasonText && (
                            <p className="text-red-800 mt-1 whitespace-pre-line">
                              {cancelInfo.reasonText}
                            </p>
                          )}
                          <p className="text-[10px] text-red-500 mt-1">
                            Requested at:{" "}
                            {cancelInfo.requestedAt &&
                              formatDateTime(cancelInfo.requestedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <button
                          onClick={() => handleApprove(order._id)}
                          className="px-3 py-1.5 rounded-full border border-red-400 bg-red-500 text-white font-semibold
                                     hover:bg-red-600 hover:border-red-500 hover:shadow-[0_8px_18px_rgba(248,113,113,0.8)]
                                     hover:-translate-y-[1px] active:translate-y-0 active:shadow-md transition"
                        >
                          Approve & Remove Order
                        </button>
                        <button
                          onClick={() => handleReject(order._id)}
                          className="px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold
                                     hover:bg-gray-100 hover:border-gray-400 hover:-translate-y-[1px] hover:shadow-sm
                                     active:translate-y-0 active:shadow-md transition"
                        >
                          Reject Request
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCancelRequests;
