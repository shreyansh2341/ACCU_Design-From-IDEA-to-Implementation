import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

/* ================= STATUS HELPERS (UNCHANGED UI) ================= */

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

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

/* ================= COMPONENT ================= */

const VendorChats = () => {
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);


  // ✅ pagination (same as user)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  /* ========== FETCH VENDOR ORDERS (USER UI → VENDOR ROUTE) ========== */
  const fetchVendorOrders = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/vendor/my-orders`,
        { withCredentials: true }
      );

      const list = data.orders || [];
      setOrders(list);
      setActiveOrders(list); // ✅ show ALL (including completed & cancelled)
      setCurrentPage(1);

      if (selectedOrder && !list.find((o) => o._id === selectedOrder._id)) {
        setSelectedOrder(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
    }
  };

  /* ========== FETCH MESSAGES (SAME AS USER) ========== */
  const fetchOrderMessages = async (orderId) => {
    if (!orderId) return;
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${orderId}/messages`,
        { withCredentials: true }
      );
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  /* ========== FETCH ORDER DETAILS (SAME AS USER) ========== */
  const fetchOrderDetails = async (orderId) => {
    if (!orderId) return;
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${orderId}`,
        { withCredentials: true }
      );
      setSelectedOrder(data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  useEffect(() => {
    if (!selectedOrder?._id) return;
    fetchOrderDetails(selectedOrder._id);
    fetchOrderMessages(selectedOrder._id);
  }, [selectedOrder?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, selectedOrder]);

  /* ========== POLLING (IDENTICAL TO USER) ========== */
  useEffect(() => {
    let timeoutId;

    const poll = async () => {
      await fetchVendorOrders();
      if (selectedOrder?._id) {
        await fetchOrderMessages(selectedOrder._id);
      }

      const isHidden =
        typeof document !== "undefined" ? document.hidden : false;

      const nextDelay = isHidden ? 20000 : 15000;
      timeoutId = setTimeout(poll, nextDelay);
    };

    poll();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [selectedOrder?._id]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseChat = () => {
    setSelectedOrder(null);
    setMessages([]);
    setMessageText("");
  };

  /* ========== SEND MESSAGE (VENDOR SENDER) ========== */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedOrder?._id) return;

    try {
      await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${selectedOrder._id}/messages`,
        { text: messageText.trim() }, // ✅ SAME BODY AS USER
        { withCredentials: true }
      );
      setMessageText("");
      fetchOrderMessages(selectedOrder._id);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to send message. Try again.";
      toast.error(msg);
      if (msg.toLowerCase().includes("chat is closed")) {
        fetchVendorOrders();
      }
    }
  };

  /* ========== PAGINATION (SAME AS USER) ========== */
  const totalPages = Math.ceil(activeOrders.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = activeOrders.slice(
    startIndex,
    startIndex + pageSize
  );

  /* ========== CHAT PANE UI — 100% IDENTICAL ========== */
  const renderChatPane = () => {
    if (!selectedOrder) return null;

    const { label, badge } = getStatusInfo(selectedOrder.status);
    const isChatClosed = ["completed", "cancelled"].includes(
      selectedOrder.status
    );

    const isTyping = messageText.trim().length > 0;

    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 md:col-span-2 flex flex-col h-[75vh] animate-fade-in">
        {/* ✅ HEADER */}
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
              className={`inline-flex px-3 py-1 rounded-full text-[11px] font-semibold ${badge}`}
            >
              {label}
            </span>
            {selectedOrder.estimatedCompletionAt && (
              <p className="text-[11px] text-gray-500">
                ETA: {formatDateTime(selectedOrder.estimatedCompletionAt)}
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

        {/* ✅ MESSAGES */}
        <div className="flex-1 border border-blue-100 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-blue-100/70 p-3 overflow-y-auto text-xs md:text-sm"
          style={{
            scrollbarWidth: "none",      // Firefox
            msOverflowStyle: "none",     // IE/Edge
          }}>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-xs">
              No messages yet. Start the conversation with admin/user.
            </p>
          ) : (
            messages.map((msg) => {
              const isVendor = msg.senderRole === "vendor";
              return (
                <div
                  key={msg._id}
                  className={`mb-3 flex ${isVendor ? "justify-end" : "justify-start"
                    }`}
                >
                  <div className="max-w-[80%]">
                    <p
                      className={`text-[10px] mb-0.5 ${isVendor ? "text-right text-gray-500" : "text-gray-500"
                        }`}
                    >
                      {msg.senderRole?.toUpperCase()} •{" "}
                      {new Date(msg.createdAt).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                    <div
                      className={`px-3 py-2 rounded-2xl shadow-md backdrop-blur-sm ${isVendor
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
          <div ref={messagesEndRef} />

          {/* ✅ TYPING INDICATOR */}
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

        {/* ✅ INPUT */}
        {isChatClosed ? (
          <p className="mt-2 text-[11px] text-red-500">
            This order is <strong>{label}</strong>. Chat is closed for this
            order.
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
              placeholder="Type your message..."
              className="flex-1 border border-blue-200 rounded-full px-3 py-1 
                         bg-white/80 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-4 py-1 rounded-full 
                         bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                         text-white 
                         hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
                         hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                         active:translate-y-0 active:shadow-md
                         transition"
            >
              Send
            </button>
          </form>
        )}
      </div>
    );
  };

  /* ================= MAIN LAYOUT — SAME AS USER ================= */

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
      <div className="w-full max-w-6xl mx-auto mt-14 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">

        {/* ✅ LEFT ORDER LIST — IDENTICAL UI */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 md:col-span-1">
          <h1 className="text-lg font-bold mb-3 text-[#2479C2] flex items-center gap-2">
            <span className="w-2 h-7 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full shadow shadow-blue-300/50" />
            Messages
          </h1>

          {activeOrders.length === 0 ? (
            <p className="text-sm text-gray-500 mt-4">
              You don&apos;t have any orders to chat about yet.
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {paginatedOrders.map((order) => {
                  const info = getStatusInfo(order.status);
                  const isActive = selectedOrder?._id === order._id;
                  const isClosed = ["completed", "cancelled"].includes(
                    order.status
                  );

                  return (
                    <div
                      key={order._id}
                      className={`w-full text-left p-3 rounded-2xl border text-xs md:text-sm transition transform ${isActive
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-[0_10px_20px_rgba(37,99,235,0.4)]"
                          : "border-gray-200 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.5)]"
                        }`}
                      onClick={() => handleSelectOrder(order)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <h2 className="font-semibold truncate">
                            {order.title}
                          </h2>
                          <p className="text-[11px] text-gray-500 truncate">
                            {order.serviceType || "Service"} • Qty:{" "}
                            {order.quantity}
                          </p>
                          {isClosed && (
                            <p className="mt-1 text-[10px] text-amber-600">
                              Chat closed (order {order.status})
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${info.badge}`}
                        >
                          {info.label}
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] text-gray-400">
                        Updated: {formatDateTime(order.updatedAt)}
                      </p>
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
        </div>

        {/* ✅ RIGHT CHAT PANE */}
        {renderChatPane()}
      </div>
    </div>
  );
};

export default VendorChats;
