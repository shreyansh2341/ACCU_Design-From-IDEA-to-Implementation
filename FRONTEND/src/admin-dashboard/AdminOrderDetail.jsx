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
  FaUserTie,
  FaUser,
  FaInfoCircle,
  FaDownload,
  FaTrashAlt,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

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

const getStatusIcon = (status, isCurrent) => {
  const base = "text-lg";
  const glow = isCurrent ? " drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]" : "";
  switch (status) {
    case "requested":
      return <FaRegClock className={`text-blue-500 ${base}${glow}`} />;
    case "received":
      return (
        <FaClipboardCheck className={`text-indigo-500 ${base}${glow}`} />
      );
    case "reviewed_by_vendor":
      return (
        <FaClipboardCheck className={`text-purple-500 ${base}${glow}`} />
      );
    case "in_production":
      return <FaIndustry className={`text-yellow-500 ${base}${glow}`} />;
    case "out_for_delivery":
      return <FaTruck className={`text-orange-500 ${base}${glow}`} />;
    case "completed":
      return (
        <FaCheckCircle className={`text-emerald-500 ${base}${glow}`} />
      );
    case "cancel_requested":
      return <FaRegClock className={`text-amber-500 ${base}${glow}`} />;
    case "cancelled":
      return <FaTimesCircle className={`text-red-500 ${base}${glow}`} />;
    default:
      return <FaRegClock className={`text-gray-400 ${base}`} />;
  }
};

// Color for admin status select
const getStatusSelectClass = (status) => {
  switch (status) {
    case "requested":
      return "bg-blue-50 border-blue-200 text-blue-800";
    case "received":
      return "bg-indigo-50 border-indigo-200 text-indigo-800";
    case "reviewed_by_vendor":
      return "bg-purple-50 border-purple-200 text-purple-800";
    case "in_production":
      return "bg-yellow-50 border-yellow-200 text-yellow-900";
    case "out_for_delivery":
      return "bg-orange-50 border-orange-200 text-orange-900";
    case "completed":
      return "bg-emerald-50 border-emerald-200 text-emerald-800";
    case "cancel_requested":
      return "bg-amber-50 border-amber-200 text-amber-800";
    case "cancelled":
      return "bg-red-50 border-red-200 text-red-800";
    default:
      return "bg-white border-blue-100 text-gray-700";
  }
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

// NOTE: onOrderDeleted is a new prop (callback) that the parent should provide.
// It will be called with the deleted order id so the parent can update its orders list.
const AdminOrderDetail = ({
  order,
  onClose,
  onOrderUpdated,
  onOrderDeleted, // <-- new callback prop
}) => {
  const [fullOrder, setFullOrder] = useState(order);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [newStatus, setNewStatus] = useState(order.status || "");
  const [statusNote, setStatusNote] = useState("");
  const [eta, setEta] = useState("");

  const isCancelPending =
    fullOrder?.status === "cancel_requested" &&
    fullOrder?.cancellation?.status === "pending";

  const isFinalStatus =
    fullOrder?.status === "completed" || fullOrder?.status === "cancelled";

  const loadDetails = async () => {
    try {
      const [orderRes, vendorsRes] = await Promise.all([
        axios.get(
          `${REACT_APP_BACKEND_URL}/api/order/single-order/${order._id}`,
          { withCredentials: true }
        ),
        axios.get(`${REACT_APP_BACKEND_URL}/api/order/admin/vendors`, {
          withCredentials: true,
        }),
      ]);

      setFullOrder(orderRes.data.order);
      setNewStatus(orderRes.data.order.status || "");
      setVendors(vendorsRes.data.vendors || []);
    } catch (error) {
      console.error("Error loading admin order detail:", error);
      toast.error("Failed to load full order details");
    }
  };

  useEffect(() => {
    if (order?._id) loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?._id]);

  if (!fullOrder) return null;

  const { label, badge } = getStatusInfo(fullOrder.status || "");
  const statusHistory = (fullOrder.statusHistory || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }
    try {
      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${fullOrder._id}/status`,
        {
          status: newStatus,
          note: statusNote,
          estimatedCompletionAt: eta || undefined,
        },
        { withCredentials: true }
      );
      toast.success("Status updated");
      setFullOrder(data.order);
      setStatusNote("");
      if (onOrderUpdated) onOrderUpdated(fullOrder._id);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  const handleAssignVendor = async (e) => {
    e.preventDefault();
    if (!selectedVendor) {
      toast.error("Select a vendor first");
      return;
    }
    try {
      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${fullOrder._id}/assign-vendor`,
        { vendorId: selectedVendor, note: "Vendor assigned by admin" },
        { withCredentials: true }
      );
      toast.success("Vendor assigned");
      setFullOrder(data.order);
      if (onOrderUpdated) onOrderUpdated(fullOrder._id);
    } catch (error) {
      console.error("Error assigning vendor:", error);
      toast.error(error.response?.data?.message || "Failed to assign vendor");
    }
  };

  // Approve user's cancel request AND delete order (existing behavior)
  const handleApproveCancel = async () => {
    

    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/admin/cancel-order/${fullOrder._id}`,
        { adminNote: "Cancellation approved by admin" },
        { withCredentials: true }
      );
      toast.success(data.message || "Order cancelled and deleted");

      // Notify parent that order was deleted
      if (onOrderDeleted) onOrderDeleted(fullOrder._id);

      onClose && onClose();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel and delete this order"
      );
    }
  };

  // Admin manual cancel: just set status=cancelled (no delete)
  const handleAdminSoftCancel = async () => {
    

    try {
      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${fullOrder._id}/status`,
        {
          status: "cancelled",
          note: "Order cancelled by admin (manual)",
        },
        { withCredentials: true }
      );

      toast.success("Order marked as cancelled");
      setFullOrder(data.order);
      if (onOrderUpdated) onOrderUpdated(fullOrder._id);
    } catch (error) {
      console.error("Error cancelling order as admin:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel order from admin side"
      );
    }
  };

  // Delete order — now uses onOrderDeleted callback instead of undefined setters
  const handleDeleteOrder = async () => {
    

    try {
      await axios.delete(
        `${REACT_APP_BACKEND_URL}/api/order/admin/order/${fullOrder._id}`,
        { withCredentials: true }
      );
      toast.success("Order and related chats deleted");

      // Notify parent so it can update its orders state
      if (onOrderDeleted) onOrderDeleted(fullOrder._id);

      // Close the detail panel
      onClose && onClose();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.response?.data?.message || "Failed to delete order");
    }
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-3 mb-3">
        <div>
          <h2 className="text-xl font-bold text-[#2479C2]">
            {fullOrder.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {fullOrder.serviceType || "Service"} • Qty: {fullOrder.quantity}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Order ID: {" "}
            <span className="font-mono text-gray-700">
              {fullOrder._id.slice(-8)}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Created: {formatDateTime(fullOrder.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${badge}`}
          >
            {label}
          </span>
          {fullOrder.estimatedCompletionAt && (
            <p className="text-[11px] text-gray-500">
              ETA: {formatDateTime(fullOrder.estimatedCompletionAt)}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 
                       hover:border-red-400 hover:text-red-500 hover:bg-red-50 
                       hover:-translate-y-[1px] hover:shadow-md transition"
          >
            Close Details ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 text-sm">
        {/* User & Vendor cards */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-2 flex items-center gap-2 text-xs">
            <FaUser className="text-blue-500" />
            <div>
              <p className="font-semibold text-gray-800">User</p>
              <p className="text-gray-600">
                {fullOrder.user?.name} • {fullOrder.user?.email}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 flex items-center gap-2 text-xs">
            <FaUserTie className="text-purple-500" />
            <div>
              <p className="font-semibold text-gray-800">Vendor</p>
              <p className="text-gray-600">
                {fullOrder.vendor
                  ? `${fullOrder.vendor.name} • ${fullOrder.vendor.email}`
                  : "Not assigned yet"}
              </p>
            </div>
          </div>
        </div>

        {/* Requirement */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Requirement</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {fullOrder.description}
          </p>
        </div>

        {/* Delivery address */}
        {fullOrder.deliveryAddress && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Delivery Address
            </h3>
            <p className="text-gray-700">{fullOrder.deliveryAddress}</p>
          </div>
        )}

        {/* Files with download button */}
        {fullOrder.files?.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Attached Files</h3>
            <ul className="space-y-2 text-xs">
              {fullOrder.files.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-blue-50/40 border border-blue-100 rounded-lg px-3 py-2"
                >
                  <span className="truncate text-blue-800">
                    {f.originalName || f.url}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-600 hover:text-blue-800 underline"
                    >
                      Open
                    </a>
                    <a
                      href={f.url}
                      download
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[11px] font-semibold shadow-sm
                                 hover:from-blue-600 hover:to-blue-700 hover:-translate-y-[1px] hover:shadow-[0_6px_14px_rgba(37,99,235,0.6)]
                                 active:translate-y-0 active:shadow-md transition"
                    >
                      <FaDownload className="text-[10px]" />
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Status timeline */}
        {statusHistory.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Status Timeline
            </h3>
            <div className="space-y-3 text-xs">
              {statusHistory.map((item, idx) => {
                const info = getStatusInfo(item.status);
                const isLast = idx === statusHistory.length - 1;
                const isCurrent = isLast;
                return (
                  <div key={idx} className="flex gap-3 items-stretch">
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow shadow-blue-400/50 ${isCurrent ? "scale-110" : ""
                          }`}
                      />
                      {!isLast && (
                        <span className="flex-1 w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent mt-1" />
                      )}
                    </div>
                    <div
                      className={`flex-1 rounded-xl border px-3 py-2 shadow-sm bg-white/70 ${isCurrent
                          ? "border-blue-300 shadow-[0_0_18px_rgba(37,99,235,0.25)] bg-gradient-to-r from-blue-50 via-white to-blue-50"
                          : "border-blue-50 shadow-blue-100"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status, isCurrent)}
                        <p className="font-semibold text-gray-800">
                          {info.label} {" "}
                          <span className="font-normal text-gray-500">
                            • {item.updatedAt && formatDateTime(item.updatedAt)}
                          </span>
                          {isCurrent && (
                            <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600 text-white shadow-sm shadow-blue-400">
                              Current
                            </span>
                          )}
                        </p>
                      </div>
                      {(item.note || item.updatedBy) && (
                        <div className="mt-1 ml-7 text-gray-600">
                          {item.note && <p>{item.note}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cancellation panel */}
        <div className="pt-2 border-t border-blue-100 text-xs space-y-2">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <FaInfoCircle className="text-amber-500" />
            Cancellation Request
          </h3>
          <button
            type="button"
            onClick={() => handleDeleteOrder()}
            className="text-[11px] px-3 py-1 rounded-full 
                                                     flex items-center justify-center gap-1
                                                     border border-red-300 bg-red-50 text-red-600
                                                     hover:bg-red-100 hover:border-red-400
                                                     hover:-translate-y-[1px] hover:shadow-md
                                                     active:translate-y-0 active:shadow-sm transition"
          >
            <FaTrashAlt className="text-[10px]" />
            Delete
          </button>
          {fullOrder.cancellation?.requested ? (
            <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-900 px-3 py-2">
              <p className="font-semibold mb-1">
                Status: {fullOrder.cancellation.status || "pending"}
              </p>
              <p className="mb-1">
                <strong>Reason type:</strong> {fullOrder.cancellation.reasonType || "Not specified"}
              </p>
              {fullOrder.cancellation.reasonText && (
                <p className="mb-1">
                  <strong>Details:</strong> {fullOrder.cancellation.reasonText}
                </p>
              )}
              <p className="text-[11px] text-amber-800/90">
                Requested at: {fullOrder.cancellation.requestedAt && formatDateTime(fullOrder.cancellation.requestedAt)}
              </p>
              {isCancelPending && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleApproveCancel}
                    className="px-4 py-2 rounded-full text-xs font-semibold 
                               bg-red-500 text-white
                               hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(248,113,113,0.5)]
                               active:translate-y-0 active:shadow-md
                               transition"
                  >
                    Approve & Delete Order
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[11px] text-gray-500">
              No cancellation request has been submitted for this order yet.
            </p>
          )}
        </div>

        {/* ADMIN CONTROLS CARD – hidden when status is completed or cancelled */}
        {!isFinalStatus && (
          <div className="pt-3">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-[0_12px_30px_rgba(148,163,184,0.45)] p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center text-white text-xs shadow-md shadow-blue-500/50">
                  ⚙
                </span>
                Admin Controls (Status & Vendor)
              </h3>

              {/* Admin cancel button (soft cancel) */}
              <div className="mb-3 flex flex-wrap gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={handleAdminSoftCancel}
                  className="px-4 py-2 rounded-full font-semibold
                             border border-red-300 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white
                             hover:from-red-600 hover:via-red-700 hover:to-red-800
                             hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(248,113,113,0.7)]
                             active:translate-y-0 active:shadow-md transition"
                >
                  Cancel Order (Admin)
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                {/* Status form */}
                <form onSubmit={handleStatusUpdate} className="space-y-2">
                  <p className="text-[11px] text-gray-500">
                    Update the current order status and add optional ETA and note.
                  </p>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className={`w-full border rounded-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${getStatusSelectClass(
                      newStatus
                    )}`}
                  >
                    <option value="">Select status</option>
                    <option value="requested">Requested</option>
                    <option value="received">Received</option>
                    <option value="reviewed_by_vendor">Reviewed by Vendor</option>
                    <option value="in_production">In Production</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input
                    type="datetime-local"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="w-full border border-blue-100 rounded-lg px-3 py-1.5 text-xs bg-white/80
                               focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <textarea
                    rows={3}
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    className="w-full border border-blue-100 rounded-lg px-3 py-1.5 text-xs bg-white/80
                               focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Internal note for this status change (optional)"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white text-xs font-semibold
                               hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                               hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)]
                               active:translate-y-0 active:shadow-md transition"
                  >
                    Save Status
                  </button>
                </form>

                {/* Vendor assignment */}
                <form onSubmit={handleAssignVendor} className="space-y-2">
                  <p className="text-[11px] text-gray-500">
                    Assign or change vendor for this order. Once vendor is
                    assigned, users must contact admin via Messages for
                    cancellation.
                  </p>
                  <select
                    value={selectedVendor}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="w-full border border-purple-100 rounded-full px-3 py-1.5 text-xs bg-purple-50/40
                               focus:outline-none focus:ring-2 focus:ring-purple-200 text-purple-800"
                  >
                    <option value="">Select vendor</option>
                    {vendors.map((v) => (
                      <option key={v._id} value={v._id}>
                        {v.name} • {v.email}
                      </option>
                    ))}
                  </select>
                  <div className="bg-purple-50/70 border border-purple-100 rounded-lg px-3 py-2 text-[11px] text-purple-800 flex gap-2">
                    <FaIndustry className="mt-[2px]" />
                    <p>
                      Vendors see only the details they need to manufacture. You
                      keep full control from this panel.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white text-xs font-semibold
                               hover:from-purple-600 hover:via-purple-700 hover:to-purple-800
                               hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(147,51,234,0.5)]
                               active:translate-y-0 active:shadow-md transition"
                  >
                    Save Vendor
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {isFinalStatus && (
          <p className="pt-2 text-[11px] text-gray-500">
            This order is <span className="font-semibold">{fullOrder.status}</span>.
            Admin status and vendor controls are disabled for finalised orders.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetail;
