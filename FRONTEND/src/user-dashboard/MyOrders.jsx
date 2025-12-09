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
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

// Map statuses to label + badge styles
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

// Icons for timeline
const getStatusIcon = (status, isCurrent) => {
  const base = "text-lg";
  const currentGlow = isCurrent ? " drop-shadow-[0_0_6px_rgba(37,99,235,0.6)]" : "";

  switch (status) {
    case "requested":
      return <FaRegClock className={`text-blue-500 ${base}${currentGlow}`} />;
    case "received":
      return (
        <FaClipboardCheck className={`text-indigo-500 ${base}${currentGlow}`} />
      );
    case "reviewed_by_vendor":
      return (
        <FaClipboardCheck className={`text-purple-500 ${base}${currentGlow}`} />
      );
    case "in_production":
      return <FaIndustry className={`text-yellow-500 ${base}${currentGlow}`} />;
    case "out_for_delivery":
      return <FaTruck className={`text-orange-500 ${base}${currentGlow}`} />;
    case "completed":
      return (
        <FaCheckCircle className={`text-emerald-500 ${base}${currentGlow}`} />
      );
    case "cancel_requested":
      return <FaRegClock className={`text-amber-500 ${base}${currentGlow}`} />;
    case "cancelled":
      return (
        <FaTimesCircle className={`text-red-500 ${base}${currentGlow}`} />
      );
    default:
      return <FaRegClock className={`text-gray-400 ${base}`} />;
  }
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [review, setReview] = useState({
    ratingManufacturing: "",
    ratingDelivery: "",
    ratingHandling: "",
    comment: "",
  });

  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReasonType, setCancelReasonType] = useState("");
  const [cancelReasonText, setCancelReasonText] = useState("");
  const [reviewMedia, setReviewMedia] = useState(null);
  const [reviewMediaName, setReviewMediaName] = useState("");
  const [isReviewMode, setIsReviewMode] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/my-orders`,
        { withCredentials: true }
      );
      const list = data.orders || [];
      setOrders(list);
      // setOrders(list);
      // setActiveOrders(list);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load your orders");
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${id}`,
        { withCredentials: true }
      );
      const order = data.order;
      setSelectedOrder(order);

      if (order.review) {
        setReview({
          ratingManufacturing: order.review.ratingManufacturing || "",
          ratingDelivery: order.review.ratingDelivery || "",
          ratingHandling: order.review.ratingHandling || "",
          comment: order.review.comment || "",
        });
      } else {
        setReview({
          ratingManufacturing: "",
          ratingDelivery: "",
          ratingHandling: "",
          comment: "",
        });
      }

      setShowCancelForm(false);
      setCancelReasonType("");
      setCancelReasonText("");
      setIsReviewMode(false);
      setReviewMedia(null);
      setReviewMediaName("");
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details");
    }
  };

  const handleSelectOrder = (order) => {
    if (!order?._id) return;
    fetchOrderDetails(order._id);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const formData = new FormData();
      formData.append(
        "ratingManufacturing",
        review.ratingManufacturing || ""
      );
      formData.append("ratingDelivery", review.ratingDelivery || "");
      formData.append("ratingHandling", review.ratingHandling || "");
      formData.append("comment", review.comment || "");

      if (reviewMedia) {
        formData.append("reviewMedia", reviewMedia); // single file
      }

      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${selectedOrder._id}/review`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Review submitted!");
      setOrders((prev) =>
        prev.map((o) => (o._id === data.order._id ? data.order : o))
      );
      setSelectedOrder(data.order);
      setIsReviewMode(false);
      setReviewMedia(null);
      setReviewMediaName("");
    } catch (error) {
      console.error("Review submit error:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setShowCancelForm(false);
    setIsReviewMode(false);
  };

  // Can user request cancel?
  const canUserRequestCancel = (order) => {
    if (!order) return false;
    if (["completed", "cancelled"].includes(order.status)) return false;

    // If cancellation already pending, don't show form again
    if (order.cancellation?.requested && order.cancellation?.status === "pending")
      return false;

    // Only before vendor assigned
    if (order.vendor) return false;

    return true;
  };

  const handleCancelRequestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder?._id) return;

    if (!cancelReasonType) {
      toast.error("Please select a cancellation reason");
      return;
    }

    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/single-order/${selectedOrder._id}/request-cancel`,
        {
          reasonType: cancelReasonType,
          reasonText: cancelReasonText,
        },
        { withCredentials: true }
      );

      toast.success(data.message || "Cancellation request sent to admin");
      await fetchOrderDetails(selectedOrder._id);
      await fetchOrders();
      setShowCancelForm(false);
    } catch (error) {
      console.error("Error requesting cancellation:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to send cancellation request. Try again."
      );
    }
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    const { label, badge } = getStatusInfo(selectedOrder.status || "");
    const statusHistory = (selectedOrder.statusHistory || [])
      .slice()
      .sort((a, b) => {
        const da = new Date(a.updatedAt).getTime();
        const db = new Date(b.updatedAt).getTime();
        return da - db;
      });

    const isCompleted = selectedOrder.status === "completed";
    const isCancelPending =
      selectedOrder.cancellation?.requested &&
      selectedOrder.cancellation?.status === "pending";
    const userCanCancel = canUserRequestCancel(selectedOrder);

    const handleReviewMediaChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setReviewMedia(file);
        setReviewMediaName(file.name);
      } else {
        setReviewMedia(null);
        setReviewMediaName("");
      }
    };

    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4 h-full flex flex-col animate-fade-in">
        <div className="flex items-start justify-between gap-4 border-b border-blue-100 pb-3 mb-3">
          <div>
            <h2 className="text-xl font-bold text-[#2479C2]">
              {selectedOrder.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedOrder.serviceType || "Service"} • Qty:{" "}
              {selectedOrder.quantity}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Created: {formatDateTime(selectedOrder.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${badge}`}
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
              onClick={handleCloseDetails}
              className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 
                         hover:border-red-400 hover:text-red-500 hover:bg-red-50 
                         hover:-translate-y-[1px] hover:shadow-md transition"
            >
              Close Details ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 text-sm">
          {/* Cancellation warning box */}
          <div className="rounded-lg border border-amber-300 bg-amber-50 text-amber-800 px-3 py-2 text-xs">
            <p className="font-semibold mb-1">Order Cancellation Policy</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You can request cancellation only{" "}
                <strong>before the order is assigned to a vendor</strong>.
              </li>
              <li>
                After a vendor is assigned, please use the{" "}
                <strong>Messages</strong> section to talk with the admin.
              </li>
              <li>
                Approved cancellations are processed by admin and the order is{" "}
                <strong>removed from our system</strong>.
              </li>
            </ul>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Requirement</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedOrder.description}
            </p>
          </div>

          {/* Delivery address */}
          {selectedOrder.deliveryAddress && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Delivery Address
              </h3>
              <p className="text-gray-700">{selectedOrder.deliveryAddress}</p>
            </div>
          )}

          {/* Files */}
          {selectedOrder.files?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Attached Files
              </h3>
              <ul className="list-disc list-inside text-blue-600">
                {selectedOrder.files.map((f, idx) => (
                  <li key={idx}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-blue-800 hover:drop-shadow-sm"
                    >
                      {f.originalName || f.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Status history – timeline */}
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
                            {info.label}{" "}
                            <span className="font-normal text-gray-500">
                              •{" "}
                              {item.updatedAt &&
                                formatDateTime(item.updatedAt)}
                            </span>
                            {isCurrent && (
                              <span className="ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-600 text-white shadow-sm shadow-blue-400">
                                Current
                              </span>
                            )}
                          </p>
                        </div>
                        {item.note && (
                          <p className="text-gray-600 mt-1 ml-7">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancellation status / form */}
          <div className="pt-2 border-t border-blue-100 text-xs md:text-sm space-y-2">
            <h3 className="font-semibold text-gray-800">Cancel this Order</h3>
            {isCancelPending && (
              <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                You’ve requested to cancel this order.{" "}
                <strong>Admin review is pending.</strong>
              </p>
            )}

            {!isCancelPending && userCanCancel && (
              <>
                {!showCancelForm && (
                  <button
                    type="button"
                    onClick={() => setShowCancelForm(true)}
                    className="px-4 py-2 rounded-full text-xs font-semibold 
                               border border-red-300 text-red-600 bg-red-50
                               hover:bg-red-100 hover:border-red-400 
                               hover:-translate-y-[1px] hover:shadow-md
                               transition"
                  >
                    Request Cancellation
                  </button>
                )}

                {showCancelForm && (
                  <form
                    onSubmit={handleCancelRequestSubmit}
                    className="mt-2 space-y-2"
                  >
                    <div>
                      <label className="block font-semibold mb-1">
                        Reason for cancellation
                      </label>
                      <select
                        value={cancelReasonType}
                        onChange={(e) => setCancelReasonType(e.target.value)}
                        className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-red-200"
                        required
                      >
                        <option value="">Select reason</option>
                        <option value="Changed requirements">
                          Changed requirements
                        </option>
                        <option value="Found another vendor">
                          Found another vendor
                        </option>
                        <option value="Budget constraints">
                          Budget constraints
                        </option>
                        <option value="Timeline changed">
                          Timeline changed
                        </option>
                        <option value="Placed by mistake">
                          Placed by mistake
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">
                        Additional details (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={cancelReasonText}
                        onChange={(e) => setCancelReasonText(e.target.value)}
                        className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-red-200"
                        placeholder="Explain briefly why you are cancelling..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full text-xs font-semibold 
                                   bg-red-500 text-white
                                   hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(248,113,113,0.5)]
                                   active:translate-y-0 active:shadow-md
                                   transition"
                      >
                        Send Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCancelForm(false)}
                        className="px-3 py-1 rounded-full text-[11px] border border-gray-300 text-gray-600 hover:bg-gray-100 hover:-translate-y-[1px] hover:shadow-sm transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {!isCancelPending && !userCanCancel && (
              <p className="text-gray-500 text-xs">
                This order cannot be cancelled from here. If you have an issue,
                please use the <strong>Messages</strong> tab to talk with the
                admin.
              </p>
            )}
          </div>

          {/* 🔹 Enhanced Review section */}
          <div className="pt-2 border-t border-blue-100">
            <div className="bg-white/90 rounded-xl border border-blue-50 p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-[#2479C2]">
                  Your Review
                </h3>
                {!isCompleted && (
                  <span className="text-[11px] text-gray-500">
                    You&apos;ll be able to review after completion.
                  </span>
                )}
              </div>

              {/* If review exists and not in edit mode -> show summary view */}
              {selectedOrder.review && !isReviewMode ? (
                <>
                  <div className="grid grid-cols-3 gap-2 text-[11px] mb-2">
                    <div className="bg-blue-50/70 border border-blue-100 rounded-lg px-2 py-1">
                      <span className="font-semibold block text-gray-700">
                        Manufacturing
                      </span>
                      <span className="text-blue-700">
                        {selectedOrder.review.ratingManufacturing}/5
                      </span>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-100 rounded-lg px-2 py-1">
                      <span className="font-semibold block text-gray-700">
                        Delivery
                      </span>
                      <span className="text-blue-700">
                        {selectedOrder.review.ratingDelivery}/5
                      </span>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-100 rounded-lg px-2 py-1">
                      <span className="font-semibold block text-gray-700">
                        Handling
                      </span>
                      <span className="text-blue-700">
                        {selectedOrder.review.ratingHandling}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-2">
                    {selectedOrder.review.comment || "No comment provided."}
                  </p>

                  {/* Attached media preview/link (single file style) */}
                  {selectedOrder.review.reviewMedia?.url && (
                    <div className="mt-2">
                      <p className="text-[11px] font-semibold text-gray-700 mb-1">
                        Attached Media:
                      </p>
                      {selectedOrder.review.reviewMedia.mimeType?.startsWith(
                        "image/"
                      ) ? (
                        <img
                          src={selectedOrder.review.reviewMedia.url}
                          alt="Review media"
                          className="w-full max-h-52 object-cover rounded-lg border border-gray-200"
                        />
                      ) : selectedOrder.review.reviewMedia.mimeType?.startsWith(
                        "video/"
                      ) ? (
                        <video
                          controls
                          className="w-full max-h-52 rounded-lg border border-gray-200"
                        >
                          <source
                            src={selectedOrder.review.reviewMedia.url}
                            type={selectedOrder.review.reviewMedia.mimeType}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <a
                          href={selectedOrder.review.reviewMedia.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-[11px] px-3 py-1 rounded-full 
                                     bg-gradient-to-r from-blue-500 to-blue-600 
                                     text-white border border-blue-500
                                     hover:from-blue-600 hover:to-blue-700 
                                     hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                                     active:translate-y-0 active:shadow-md
                                     transition"
                        >
                          Download Attached File
                        </a>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsReviewMode(true)}
                    disabled={!isCompleted}
                    className={`mt-3 text-[11px] px-3 py-1 rounded-full border 
                      ${isCompleted
                        ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                        : "border-gray-300 text-gray-400 cursor-not-allowed"
                      } transition`}
                  >
                    {isCompleted
                      ? "Edit Review"
                      : "Review available after completion"}
                  </button>
                </>
              ) : (
                // Edit / New review form
                <form
                  onSubmit={handleReviewSubmit}
                  className={
                    isCompleted
                      ? "space-y-3 text-xs md:text-sm"
                      : "space-y-3 text-xs md:text-sm opacity-50 pointer-events-none"
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1 text-gray-700">
                        Manufacturing
                      </span>
                      <select
                        value={review.ratingManufacturing}
                        onChange={(e) =>
                          setReview((r) => ({
                            ...r,
                            ratingManufacturing: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs bg-white/80"
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1 text-gray-700">
                        Delivery
                      </span>
                      <select
                        value={review.ratingDelivery}
                        onChange={(e) =>
                          setReview((r) => ({
                            ...r,
                            ratingDelivery: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs bg-white/80"
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1 text-gray-700">
                        Handling
                      </span>
                      <select
                        value={review.ratingHandling}
                        onChange={(e) =>
                          setReview((r) => ({
                            ...r,
                            ratingHandling: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-200 text-xs bg-white/80"
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-gray-700">
                      Comments
                    </label>
                    <textarea
                      rows={3}
                      value={review.comment}
                      onChange={(e) =>
                        setReview((r) => ({ ...r, comment: e.target.value }))
                      }
                      className="w-full border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                      placeholder="Share your experience about manufacturing, delivery, and handling..."
                    />
                  </div>

                  <div className="mt-2">
                    <label className="text-[11px] font-semibold text-gray-700">
                      Attach Image / Video / File (optional)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 text-[11px] px-2 py-1 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500">
                        {reviewMediaName || "No file selected"}
                      </div>
                      <input
                        type="file"
                        onChange={handleReviewMediaChange}
                        className="text-[11px]"
                        accept="image/*,video/*,.pdf"
                      />
                    </div>
                  </div>

                  {selectedOrder.review && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsReviewMode(false);
                        setReview({
                          ratingManufacturing:
                            selectedOrder.review.ratingManufacturing || "",
                          ratingDelivery:
                            selectedOrder.review.ratingDelivery || "",
                          ratingHandling:
                            selectedOrder.review.ratingHandling || "",
                          comment: selectedOrder.review.comment || "",
                        });
                        setReviewMedia(null);
                        setReviewMediaName("");
                      }}
                      className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition mr-2"
                    >
                      Cancel Edit
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={!isCompleted}
                    className={`mt-2 px-4 py-2 rounded-full text-sm transition
                        ${isCompleted
                        ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:-translate-y-[1px] hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] active:translate-y-0 active:shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {selectedOrder.review ? "Update Review" : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
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
      <div className="w-full max-w-6xl mx-auto mt-14 mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* Orders list */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-[#2479C2] flex items-center gap-2">
              <span className="w-2 h-7 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full shadow shadow-blue-300/50" />
              My Orders
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
          {orders.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="sticky top-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 z-10">
                  <tr className="border-b border-blue-100">
                    <th className="py-2 px-2 text-left">Order</th>
                    <th className="py-2 px-2 text-left">Status</th>
                    <th className="py-2 px-2 text-left">Created</th>
                    <th className="py-2 px-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const info = getStatusInfo(order.status);
                    const isActive = selectedOrder?._id === order._id;
                    return (
                      <tr
                        key={order._id}
                        className={`border-b cursor-pointer transition transform ${isActive
                            ? "bg-blue-50/80 border-blue-200 shadow-inner"
                            : "bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(148,163,184,0.4)]"
                          }`}
                        onClick={() => handleSelectOrder(order)}
                      >
                        <td className="py-2 px-2">
                          <div className="font-semibold truncate max-w-[160px]">
                            {order.title}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[160px]">
                            {order.serviceType || "Service"} • Qty:{" "}
                            {order.quantity}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold ${info.badge}`}
                          >
                            {info.label}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-[11px] text-gray-500">
                          {formatDateTime(order.createdAt)}
                        </td>
                        <td className="py-2 px-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOrder(order);
                            }}
                            className="text-[11px] px-3 py-1 rounded-full 
                                       bg-gradient-to-r from-blue-500 to-blue-600 
                                       text-white border border-blue-500
                                       hover:from-blue-600 hover:to-blue-700 
                                       hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                                       active:translate-y-0 active:shadow-md
                                       transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-3 text-[11px] text-gray-500">
            To chat about an order, go to{" "}
            <span className="font-semibold text-[#2479C2]">Messages</span>{" "}
            section in your dashboard.
          </p>
        </div>

        {/* Order details pane – only when clicked */}
        {renderOrderDetails()}
      </div>
    </div>
  );
};

export default MyOrders;
