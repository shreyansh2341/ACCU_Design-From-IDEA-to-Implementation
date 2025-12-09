import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaStar,
  FaRegStar,
  FaBoxOpen,
  FaUser,
  FaCalendarAlt,
  FaDownload,
  FaFileAlt,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const MAX_RATING = 5;

const VendorReviews = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/vendor/my-reviews`,
        { withCredentials: true }
      );
      setOrders(data.orders || []);
      if (!selected && data.orders?.length > 0) {
        setSelected(data.orders[0]);
      }
    } catch (error) {
      console.error("VendorReviews error:", error);
      toast.error(
        error.response?.data?.message || "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overallStats = useMemo(() => {
    if (!orders.length) return null;

    let m = 0,
      d = 0,
      h = 0,
      count = 0;

    orders.forEach((order) => {
      if (order.review) {
        m += order.review.ratingManufacturing || 0;
        d += order.review.ratingDelivery || 0;
        h += order.review.ratingHandling || 0;
        count += 1;
      }
    });

    if (!count) return null;

    const avgM = m / count;
    const avgD = d / count;
    const avgH = h / count;
    const overall = (avgM + avgD + avgH) / 3;

    return {
      count,
      avgManufacturing: avgM,
      avgDelivery: avgD,
      avgHandling: avgH,
      overall,
    };
  }, [orders]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", { dateStyle: "medium" })
      : "";

  const renderStars = (value = 0, size = "sm") => {
    const full = Math.round(value);
    const starClass =
      size === "lg"
        ? "text-yellow-400 text-lg"
        : "text-yellow-400 text-xs md:text-sm";
    const emptyClass =
      size === "lg"
        ? "text-gray-300 text-lg"
        : "text-gray-300 text-xs md:text-sm";

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: MAX_RATING }).map((_, i) =>
          i < full ? (
            <FaStar key={i} className={starClass} />
          ) : (
            <FaRegStar key={i} className={emptyClass} />
          )
        )}
      </div>
    );
  };

  const renderRatingBar = (label, value) => {
    const percent = Math.min(100, Math.max(0, (value / MAX_RATING) * 100 || 0));
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-gray-600">
          <span>{label}</span>
          <span className="font-semibold">
            {value?.toFixed(1) || "0.0"}/5
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  };

  const renderMediaSection = (review) => {
    if (!review || !review.media) return null;

    const media = review.media;
    const url = media.url;
    if (!url) return null;

    const mime = (media.mimeType || "").toLowerCase();
    const isImage = mime.startsWith("image/");
    const isVideo = mime.startsWith("video/");

    const name =
      media.originalName || media.public_id || "Attached file";

    return (
      <div className="mt-3 bg-white border border-blue-50 rounded-xl p-3 shadow-sm">
        <p className="text-[11px] font-semibold text-gray-700 mb-2">
          Review Media
        </p>

        {isImage && (
          <div className="mb-2">
            <img
              src={url}
              alt={name}
              className="w-full max-h-52 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        {isVideo && (
          <div className="mb-2">
            <video
              controls
              className="w-full max-h-52 rounded-lg border border-gray-200"
            >
              <source src={url} type={mime} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {!isImage && !isVideo && (
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-700">
            <FaFileAlt className="text-blue-500" />
            <span className="truncate">{name}</span>
          </div>
        )}

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full 
                     bg-gradient-to-r from-blue-500 to-blue-600 
                     text-white border border-blue-500
                     hover:from-blue-600 hover:to-blue-700 
                     hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                     active:translate-y-0 active:shadow-md
                     transition"
        >
          <FaDownload className="text-[11px]" />
          <span>View / Download</span>
        </a>
      </div>
    );
  };

  return (
    <>
      {/* Header + Overall rating summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2479C2]">Order Reviews</h1>
          <p className="text-xs text-gray-500">
            See how clients rated your work across manufacturing, delivery and handling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {overallStats && (
            <div className="px-3 py-2 rounded-2xl bg-white/90 border border-yellow-100 shadow-sm shadow-yellow-200/60 text-xs md:text-sm flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-500">
                  Overall Rating
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-bold text-amber-500">
                    {overallStats.overall.toFixed(1)}
                  </span>
                  {renderStars(overallStats.overall)}
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Based on{" "}
                  <span className="font-semibold">
                    {overallStats.count} review
                    {overallStats.count > 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={fetchReviews}
            className="text-xs px-3 py-2 rounded-full 
                       bg-gradient-to-r from-blue-500 to-blue-600 
                       text-white border border-blue-500
                       hover:from-blue-600 hover:to-blue-700 
                       hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(37,99,235,0.6)]
                       active:translate-y-0 active:shadow-md
                       transition"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-4">
        {/* LEFT: list of reviewed orders */}
        <div className="bg-white/95 rounded-2xl border border-blue-50 shadow-[0_12px_30px_rgba(36,121,194,0.15)] p-4">
          <h2 className="text-sm font-semibold text-[#2479C2] mb-3">
            Reviewed Orders
          </h2>

          {loading ? (
            <p className="text-xs text-gray-500">Loading reviews...</p>
          ) : orders.length === 0 ? (
            <p className="text-xs text-gray-500">
              No reviews received yet. Completed orders with client feedback will show up here.
            </p>
          ) : (
            <div className="max-h-[70vh] overflow-y-auto space-y-2">
              {orders.map((o) => {
                const isActive = selected?._id === o._id;
                const rv = o.review || {};
                const avgForOrder =
                  (rv.ratingManufacturing + rv.ratingDelivery + rv.ratingHandling) /
                    3 || 0;

                return (
                  <button
                    key={o._id}
                    type="button"
                    onClick={() => setSelected(o)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border cursor-pointer text-xs md:text-sm transition 
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.7)]"
                          : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)]"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <FaBoxOpen />
                        </span>
                        <div>
                          <p className="font-semibold truncate max-w-[180px]">
                            {o.title || "Order"}
                          </p>
                          <p
                            className={`text-[11px] truncate max-w-[180px] ${
                              isActive ? "text-blue-50/90" : "text-gray-500"
                            }`}
                          >
                            Client: {o.user?.name || "User"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                            ${
                              isActive
                                ? "bg-white/20 text-amber-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                        >
                          {avgForOrder.toFixed(1)}/5
                          <FaStar className="inline text-[10px]" />
                        </span>
                        <span
                          className={`text-[10px] ${
                            isActive ? "text-blue-50/80" : "text-gray-400"
                          }`}
                        >
                          {formatDate(o.review?.createdAt || o.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT: review details + media */}
        <div className="bg-white/95 rounded-2xl border border-blue-50 shadow-[0_15px_40px_rgba(36,121,194,0.18)] p-4 text-xs md:text-sm flex flex-col">
          {selected ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-start mb-3 border-b border-blue-100 pb-3">
                <div className="space-y-1">
                  <h2 className="text-sm md:text-base font-semibold text-[#2479C2] flex items-center gap-2">
                    <FaBoxOpen className="text-blue-500" />
                    <span>{selected.title}</span>
                  </h2>
                  <p className="text-[11px] text-gray-500 flex items-center gap-2">
                    <FaUser className="text-blue-400" />
                    <span>
                      {selected.user?.name || "User"} •{" "}
                      {selected.user?.email || "No email"}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-300" />
                    <span>
                      Reviewed on{" "}
                      {formatDate(
                        selected.review?.createdAt || selected.updatedAt
                      )}
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-[11px] px-3 py-1 rounded-full border border-gray-300 text-gray-600 
                             hover:border-red-400 hover:text-red-500 hover:bg-red-50 
                             hover:-translate-y-[1px] hover:shadow-md transition"
                >
                  Close ✕
                </button>
              </div>

              {selected.review ? (
                <div className="flex flex-col lg:flex-row gap-4 flex-1">
                  {/* Rating summary */}
                  <div className="lg:w-1/2 space-y-3">
                    <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 border border-amber-100 rounded-xl p-3 shadow-sm">
                      <p className="text-[11px] font-semibold text-amber-700 mb-1">
                        Overall Impression
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-amber-500">
                          {(
                            (selected.review.ratingManufacturing +
                              selected.review.ratingDelivery +
                              selected.review.ratingHandling) /
                            3
                          ).toFixed(1)}
                        </span>
                        <div className="flex flex-col gap-1">
                          {renderStars(
                            (selected.review.ratingManufacturing +
                              selected.review.ratingDelivery +
                              selected.review.ratingHandling) /
                              3,
                            "lg"
                          )}
                          <p className="text-[10px] text-gray-500">
                            Manufacturing • Delivery • Handling
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-blue-50 rounded-xl p-3 shadow-sm space-y-2">
                      {renderRatingBar(
                        "Manufacturing Quality",
                        selected.review.ratingManufacturing
                      )}
                      {renderRatingBar(
                        "Delivery Experience",
                        selected.review.ratingDelivery
                      )}
                      {renderRatingBar(
                        "Handling & Packaging",
                        selected.review.ratingHandling
                      )}
                    </div>
                  </div>

                  {/* Comment + media */}
                  <div className="lg:w-1/2 flex flex-col">
                    <p className="text-[11px] font-semibold text-gray-600 mb-2">
                      Client Feedback
                    </p>
                    <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-blue-100 rounded-2xl p-3 shadow-sm">
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {selected.review.comment || "No detailed comment provided."}
                      </p>
                      <span className="absolute -top-2 left-6 w-4 h-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-l border-t border-blue-100 rotate-45" />
                      <p className="mt-3 text-[10px] text-gray-400 italic">
                        This feedback is visible to admin and used to improve service
                        quality.
                      </p>
                    </div>

                    {/* 🔹 Media section (image / video / file) */}
                    {renderMediaSection(selected.review)}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  No review details found for this order.
                </p>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-xs text-gray-500">
                Select an order from the left to view its review details.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorReviews;
