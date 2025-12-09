import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaRegClock,
  FaClipboardCheck,
  FaIndustry,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
  FaBoxOpen,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

/* ================= STATUS HELPERS ================= */

const getStatusInfo = (status) => {
  switch (status) {
    case "requested":
      return { label: "Requested", badge: "bg-blue-100 text-blue-700" };
    case "received":
      return { label: "Received", badge: "bg-indigo-100 text-indigo-700" };
    case "reviewed_by_vendor":
      return { label: "Reviewed by Vendor", badge: "bg-purple-100 text-purple-700" };
    case "in_production":
      return { label: "In Production", badge: "bg-yellow-100 text-yellow-800" };
    case "out_for_delivery":
      return { label: "Out for Delivery", badge: "bg-orange-100 text-orange-700" };
    case "completed":
      return { label: "Completed", badge: "bg-emerald-100 text-emerald-700" };
    case "cancel_requested":
      return { label: "Cancel Requested", badge: "bg-amber-100 text-amber-700" };
    case "cancelled":
      return { label: "Cancelled", badge: "bg-red-100 text-red-700" };
    default:
      return { label: status || "Unknown", badge: "bg-gray-100 text-gray-600" };
  }
};

const getStatusIcon = (status, isCurrent) => {
  const glow = isCurrent ? " drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]" : "";
  switch (status) {
    case "requested": return <FaRegClock className={`text-blue-500${glow}`} />;
    case "received": return <FaClipboardCheck className={`text-indigo-500${glow}`} />;
    case "reviewed_by_vendor": return <FaClipboardCheck className={`text-purple-500${glow}`} />;
    case "in_production": return <FaIndustry className={`text-yellow-500${glow}`} />;
    case "out_for_delivery": return <FaTruck className={`text-orange-500${glow}`} />;
    case "completed": return <FaCheckCircle className={`text-emerald-500${glow}`} />;
    case "cancel_requested": return <FaRegClock className={`text-amber-500${glow}`} />;
    case "cancelled": return <FaTimesCircle className={`text-red-500${glow}`} />;
    default: return <FaRegClock className="text-gray-400" />;
  }
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ================= COMPONENT ================= */

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/vendor/my-orders`,
        { withCredentials: true }
      );
      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      setRefreshing(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${id}`,
        { withCredentials: true }
      );
      setSelectedOrder(data.order);
    } catch {
      toast.error("Failed to refresh order status");
    } finally {
      setRefreshing(false);
    }
  };

  const handleFullRefresh = async () => {
    await fetchOrders();
    if (selectedOrder?._id) fetchOrderDetails(selectedOrder._id);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= RIGHT PANE ================= */

  const renderDetails = () => {
    if (!selectedOrder) {
      return (
        <div className="flex items-center justify-center h-full bg-white/80 rounded-2xl border border-blue-100 shadow-inner">
          <p className="text-sm text-gray-500">Select an order to view full details</p>
        </div>
      );
    }

    const { label, badge } = getStatusInfo(selectedOrder.status || "");
    const history = (selectedOrder.statusHistory || []).slice().sort(
      (a, b) =>
        new Date(a.updatedAt || a.createdAt) -
        new Date(b.updatedAt || b.createdAt)
    );

    return (
      <div className="bg-white/90 backdrop-blur rounded-2xl border border-blue-100 shadow-[0_20px_45px_rgba(36,121,194,0.22)] flex flex-col overflow-hidden">

        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 z-20 p-4 border-b border-blue-100 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2479C2]">{selectedOrder.title}</h2>
            <p className="text-sm text-gray-600">
              {selectedOrder.serviceType || "Service"} • Qty: {selectedOrder.quantity}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Client: {selectedOrder.user?.name} • {selectedOrder.user?.email}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
              {label}
            </span>

            <button
              onClick={() => fetchOrderDetails(selectedOrder._id)}
              className="flex items-center gap-2 text-[11px] px-3 py-1 rounded-full
                         border border-blue-300 text-blue-700 bg-blue-50
                         hover:bg-blue-100 hover:shadow-md transition"
            >
              <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
              Refresh Status
            </button>

            <button
              onClick={() => setSelectedOrder(null)}
              className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 
                         hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition"
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="grid lg:grid-cols-2 gap-4 p-4 overflow-y-auto">

          {/* LEFT INFO */}
          <div className="space-y-3">
            <InfoBox title="Requirement">
              {selectedOrder.description || "No description provided."}
            </InfoBox>

            {selectedOrder.files?.length > 0 && (
              <InfoBox title="Attachments">
                <ul className="list-disc list-inside text-blue-600 text-xs space-y-1">
                  {selectedOrder.files.map((f, i) => (
                    <li key={i}>
                      <a href={f.url} target="_blank" rel="noreferrer" className="hover:underline">
                        {f.originalName || `File ${i + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoBox>
            )}
          </div>

          {/* RIGHT TIMELINE */}
          <div className="bg-white border border-blue-100 rounded-xl p-3">
            <h3 className="text-sm font-semibold text-[#2479C2] mb-3">Status Timeline</h3>

            {history.length === 0 ? (
              <p className="text-xs text-gray-500">No updates yet.</p>
            ) : (
              <div className="relative pl-4">
                <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-300 to-transparent" />
                <ul className="space-y-3">
                  {history.map((s, idx) => {
                    const isLast = idx === history.length - 1;
                    return (
                      <li key={idx} className="flex gap-3">
                        <div className="w-4 h-4 mt-[3px] rounded-full bg-white border border-blue-200 flex items-center justify-center">
                          {getStatusIcon(s.status, isLast)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-800">
                            {getStatusInfo(s.status).label}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {formatDateTime(s.updatedAt || s.createdAt)}
                          </p>
                          {s.note && (
                            <p className="text-[11px] text-gray-600 mt-1">{s.note}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ================= MAIN ================= */

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2479C2]">My Projects</h1>
          <p className="text-xs text-gray-500">All orders assigned to you as vendor.</p>
        </div>

        <button
          type="button"
          onClick={handleFullRefresh}
          className="flex items-center gap-2 text-xs px-4 py-2 rounded-full 
                     bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white shadow-md hover:shadow-lg transition"
        >
          <FaSyncAlt />
          Refresh Orders
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-4">

        {/* ✅ LEFT PANE WITH WHITE BACKGROUND */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-4">
          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">

            {loading ? (
              <div className="text-center text-sm text-gray-500 py-10">
                Loading your orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center text-sm text-gray-500 py-10">
                No orders assigned yet.
              </div>
            ) : (
              orders.map((order) => {
                const info = getStatusInfo(order.status);
                const isActive = selectedOrder?._id === order._id;

                return (
                  <div
                    key={order._id}
                    onClick={() => fetchOrderDetails(order._id)}
                    className={`cursor-pointer rounded-xl border p-4 transition 
                      ${
                        isActive
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white hover:bg-blue-50 border-blue-100"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FaBoxOpen className="text-blue-500" />
                        <h3 className="font-semibold text-gray-800 truncate">
                          {order.title}
                        </h3>
                      </div>

                      <span className={`text-xs px-2 py-1 rounded-full ${info.badge}`}>
                        {info.label}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Client: {order.user?.name}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      {formatDateTime(order.createdAt)}
                    </p>
                  </div>
                );
              })
            )}

          </div>
        </div>

        {/* ✅ PREMIUM RIGHT DETAILS */}
        {renderDetails()}
      </div>
    </>
  );
};

/* =============== INFO BOX =============== */

const InfoBox = ({ title, children }) => (
  <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
    <h3 className="text-sm font-semibold text-[#2479C2] mb-1">{title}</h3>
    <div className="text-gray-800 text-xs md:text-sm">{children}</div>
  </div>
);

export default VendorOrders;
