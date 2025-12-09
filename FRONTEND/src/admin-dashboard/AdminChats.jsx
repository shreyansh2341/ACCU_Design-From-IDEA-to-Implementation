import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaComments,
  FaUser,
  FaIndustry,
  FaPaperPlane,
  FaInfoCircle,
} from "react-icons/fa";
import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

// 🔹 Same status + badge helper as in Messages.jsx
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

const AdminChats = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // pagination state for orders list
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/admin/all-orders`,
        { withCredentials: true }
      );

      const all = data.orders || [];
      // show ALL orders in chats, including completed & cancelled
      setOrders(all);

      if (!selectedOrderId && all.length > 0) {
        setSelectedOrderId(all[0]._id);
      }

      // reset pagination when orders refresh
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching orders for chats:", error);
      toast.error("Failed to load orders for chat");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchOrderDetail = useCallback(async (orderId) => {
    if (!orderId) return;
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${orderId}`,
        { withCredentials: true }
      );
      setSelectedOrder(data.order);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  }, []);

  const fetchMessages = useCallback(async (orderId) => {
    if (!orderId) return;
    try {
      setLoadingMessages(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${orderId}/messages`,
        { withCredentials: true }
      );
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  // When selectedOrderId changes, load detail + messages
  useEffect(() => {
    if (!selectedOrderId) return;
    fetchOrderDetail(selectedOrderId);
    fetchMessages(selectedOrderId);
  }, [selectedOrderId, fetchOrderDetail, fetchMessages]);

  // Poll messages every ~20s for selected order
  useEffect(() => {
    if (!selectedOrderId) return;
    let timeoutId;

    const poll = async () => {
      await fetchMessages(selectedOrderId);
      timeoutId = setTimeout(poll, 20000);
    };

    poll();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [selectedOrderId, fetchMessages]);

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedOrderId || !messageText.trim()) return;

    try {
      await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${selectedOrderId}/messages`,
        { text: messageText.trim() },
        { withCredentials: true }
      );
      setMessageText("");
      fetchMessages(selectedOrderId);
    } catch (error) {
      console.error("Error sending message:", error);
      const msg =
        error.response?.data?.message || "Failed to send message";
      toast.error(msg);
    }
  };

  const handleCloseChat = () => {
    setSelectedOrderId(null);
    setSelectedOrder(null);
    setMessages([]);
    setMessageText("");
  };

  const formatDateTime = (d) =>
    new Date(d).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Pagination helpers for orders
  const totalPages = Math.ceil(orders.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = orders.slice(startIndex, startIndex + pageSize);

  // typing + closed chat logic (same idea as Messages.jsx)
  const isTyping = messageText.trim().length > 0;
  const { label: statusLabel, badge: statusBadge } = getStatusInfo(
    selectedOrder?.status
  );
  const isChatClosed =
    selectedOrder &&
    ["completed", "cancelled"].includes(selectedOrder.status);

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

      <main className="flex-1 px-4 py-10 md:ml-34 transition-all duration-300">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left side: orders list */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 md:col-span-1">
            <h1 className="text-lg font-bold mb-3 text-[#2479C2] flex items-center gap-2">
              <FaComments className="text-base" />
              Orders & Chats
            </h1>
            {loadingOrders ? (
              <p className="text-sm text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-sm text-gray-500">
                No orders available for chat.
              </p>
            ) : (
              <>
                <div className="space-y-3 text-xs">
                  {paginatedOrders.map((order) => {
                    const isActive = selectedOrderId === order._id;
                    const isClosed = ["completed", "cancelled"].includes(
                      order.status
                    );
                    return (
                      <button
                        key={order._id}
                        onClick={() => handleSelectOrder(order._id)}
                        className={`w-full text-left p-3 rounded-2xl border transition transform ${
                          isActive
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-[0_10px_20px_rgba(37,99,235,0.4)]"
                            : "border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.5)]"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <FaIndustry className="text-gray-400 text-[11px]" />
                              <h2 className="font-semibold truncate">
                                {order.title}
                              </h2>
                            </div>
                            <p className="text-[11px] text-gray-500 truncate">
                              {order.serviceType || "Service"} • Qty:{" "}
                              {order.quantity}
                            </p>
                            <p className="mt-1 text-[10px] text-gray-400">
                              Updated: {formatDateTime(order.updatedAt)}
                            </p>
                            {isClosed && (
                              <p className="mt-1 text-[10px] text-amber-600">
                                Chat closed (order {order.status})
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1 text-[10px] text-gray-500">
                            <span className="font-semibold flex items-center gap-1">
                              <FaUser className="text-gray-400" />
                              {order.user?.name || "User"}
                            </span>
                            <span className="font-mono text-[9px] text-gray-400">
                              {order._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-600">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-full border transition ${
                        currentPage === 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                          : "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-[11px]">
                      Page{" "}
                      <span className="font-semibold">{currentPage}</span> of{" "}
                      <span className="font-semibold">{totalPages}</span>
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-full border transition ${
                        currentPage === totalPages
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
          </div>

          {/* Right: chat pane – now matches Messages.jsx style */}
          <div className="md:col-span-2">
            {!selectedOrderId || !selectedOrder ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 flex flex-col h-[75vh] items-center justify-center text-center text-sm text-gray-500">
                <FaInfoCircle className="text-blue-400 text-2xl mb-2" />
                <p>Select an order on the left to view and send messages.</p>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 flex flex-col h-[75vh] animate-fade-in">
                {/* Header – same style as user Messages.jsx */}
                <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-3 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#2479C2]">
                      {selectedOrder.title}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedOrder.serviceType || "Service"} • Qty:{" "}
                      {selectedOrder.quantity}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Created: {formatDateTime(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold ${statusBadge}`}
                    >
                      {statusLabel}
                    </span>
                    {selectedOrder.estimatedCompletionAt && (
                      <p className="text-[11px] text-gray-500">
                        ETA:{" "}
                        {formatDateTime(selectedOrder.estimatedCompletionAt)}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseChat}
                      className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 
                               hover:border-red-400 hover:text-red-500 hover:bg-red-50 
                               hover:-translate-y-[1px] hover:shadow-md transition"
                    >
                      Close Chat ✕
                    </button>
                  </div>
                </div>

                {/* Chat messages – bubble UI exactly like Messages.jsx, but admin on right */}
                <div className="flex-1 border border-blue-100 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-blue-100/70 p-3 overflow-y-auto text-xs md:text-sm">
                  {loadingMessages ? (
                    <p className="text-gray-500 text-xs">
                      Loading messages…
                    </p>
                  ) : messages.length === 0 ? (
                    <p className="text-gray-400 text-xs">
                      No messages yet. Start the conversation with user/vendor.
                    </p>
                  ) : (
                    messages.map((msg) => {
                      // 🔄 For admin panel: admin messages = right side (primary bubble)
                      const isAdmin = msg.senderRole === "admin";
                      return (
                        <div
                          key={msg._id}
                          className={`mb-3 flex ${
                            isAdmin ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div className="max-w-[80%]">
                            <p
                              className={`text-[10px] mb-0.5 ${
                                isAdmin
                                  ? "text-right text-gray-500"
                                  : "text-gray-500"
                              }`}
                            >
                              {msg.senderRole?.toUpperCase()} •{" "}
                              {msg.createdAt &&
                                new Date(msg.createdAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  }
                                )}
                            </p>
                            <div
                              className={`px-3 py-2 rounded-2xl shadow-md backdrop-blur-sm ${
                                isAdmin
                                  ? "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 text-white rounded-br-none shadow-blue-500/40"
                                  : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 border border-blue-100 rounded-bl-none shadow-slate-300/60"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Typing indicator – your side (admin) */}
                  {isTyping && !isChatClosed && (
                    <div className="mt-1 flex justify-end">
                      <div className="max-w-[60%]">
                        <div className="text-[10px] text-right text-gray-500 mb-0.5">
                          You are typing…
                        </div>
                        <div className="inline-flex items-center px-3 py-2 rounded-2xl bg-blue-100/80 border border-blue-200 shadow-sm backdrop-blur-sm rounded-br-none">
                          <div className="flex gap-1 items-end">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.3s]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input – same behavior as Messages.jsx (with closed-chat text) */}
                {isChatClosed ? (
                  <p className="mt-2 text-[11px] text-red-500">
                    This order is <strong>{statusLabel}</strong>. Chat is
                    closed for this order. You can still see the conversation
                    above.
                  </p>
                ) : (
                  <form
                    onSubmit={handleSendMessage}
                    className="mt-3 flex gap-2 text-xs md:text-sm"
                  >
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message to user/vendor..."
                      className="flex-1 border border-blue-200 rounded-full px-3 py-1 
                               bg-white/80 backdrop-blur-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="px-4 py-1 rounded-full 
                               bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                               text-white 
                               hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
                               hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                               active:translate-y-0 active:shadow-md
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition"
                    >
                      <FaPaperPlane className="text-[11px]" />
                      Send
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminChats;
