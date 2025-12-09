// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import {
//   FaStar,
//   FaUserCircle,
//   FaBoxOpen,
//   FaClock,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

// const REACT_APP_BACKEND_URL =
//   import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

// const chipClass = (score) => {
//   if (!score) return "bg-slate-50 text-slate-600 border-slate-200";
//   if (score >= 4)
//     return "bg-emerald-50 text-emerald-700 border-emerald-200";
//   if (score >= 3)
//     return "bg-amber-50 text-amber-700 border-amber-200";
//   return "bg-red-50 text-red-700 border-red-200";
// };

// const AdminOrderReviews = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${REACT_APP_BACKEND_URL}/api/order/admin/reviews`,
//         { withCredentials: true }
//       );
//       setOrders(data.orders || []);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to load reviews"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const formatDate = (d) =>
//     d
//       ? new Date(d).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         })
//       : "-";

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-white via-[#e8f3fc] to-[#d9e9fb]">
//       <AdminOpsSidebar />

//       <main className="flex-1 flex justify-center px-4 py-10 md:ml-34 transition-all duration-300">
//         <div className="w-full max-w-6xl mx-auto">
//           {/* Heading + refresh */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
//             <h1
//               className="text-3xl font-bold text-center sm:text-left text-[#2479C2]
//                          transition-all duration-300 hover:text-blue-600 hover:scale-[1.03]
//                          cursor-default select-none"
//             >
//               Order Reviews Overview
//             </h1>
//             <button
//               type="button"
//               onClick={fetchReviews}
//               className="self-center sm:self-auto text-[11px] px-3 py-1 rounded-full 
//                          border border-blue-200 text-blue-700 bg-blue-50
//                          hover:bg-blue-100 hover:border-blue-400 
//                          hover:-translate-y-[1px] hover:shadow-md
//                          active:translate-y-0 active:shadow-sm transition"
//             >
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <p className="text-center text-gray-500 text-sm">
//               Loading reviews...
//             </p>
//           ) : orders.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No reviews have been submitted yet.
//             </p>
//           ) : (
//             <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {orders.map((o) => (
//                   <div
//                     key={o._id}
//                     className="rounded-2xl border border-slate-100 shadow-sm bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 flex flex-col gap-3"
//                   >
//                     {/* Top line: user + order */}
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex items-center gap-2">
//                         <FaUserCircle className="text-2xl text-slate-500" />
//                         <div>
//                           <p className="font-semibold text-gray-800">
//                             {o.user?.name || "Unknown user"}
//                           </p>
//                           <p className="text-[11px] text-gray-500">
//                             {o.user?.email}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right text-[11px] text-gray-500 flex flex-col items-end gap-1">
//                         <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#2479C2]">
//                           <FaBoxOpen className="text-[13px]" />
//                           <span className="truncate max-w-[160px]">
//                             {o.title}
//                           </span>
//                         </div>
//                         <span className="text-[10px] text-gray-400">
//                           Order ID:{" "}
//                           <span className="font-mono">
//                             {o._id?.slice(-8)}
//                           </span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Ratings row */}
//                     <div className="grid grid-cols-3 gap-2 text-[11px]">
//                       <div
//                         className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
//                           o.review?.ratingManufacturing
//                         )}`}
//                       >
//                         <span className="inline-flex items-center gap-1 font-semibold">
//                           <FaStar className="text-[10px]" />
//                           <span>Manufacturing</span>
//                         </span>
//                         <span className="text-sm">
//                           {o.review?.ratingManufacturing || "-"}
//                         </span>
//                       </div>
//                       <div
//                         className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
//                           o.review?.ratingDelivery
//                         )}`}
//                       >
//                         <span className="inline-flex items-center gap-1 font-semibold">
//                           <FaStar className="text-[10px]" />
//                           <span>Delivery</span>
//                         </span>
//                         <span className="text-sm">
//                           {o.review?.ratingDelivery || "-"}
//                         </span>
//                       </div>
//                       <div
//                         className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
//                           o.review?.ratingHandling
//                         )}`}
//                       >
//                         <span className="inline-flex items-center gap-1 font-semibold">
//                           <FaStar className="text-[10px]" />
//                           <span>Handling</span>
//                         </span>
//                         <span className="text-sm">
//                           {o.review?.ratingHandling || "-"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Comment + meta */}
//                     <div className="text-[12px] mt-1 space-y-2">
//                       {o.review?.comment && o.review.comment.trim() ? (
//                         <p className="text-gray-700 bg-slate-50/70 border border-slate-100 rounded-xl px-3 py-2">
//                           {o.review.comment}
//                         </p>
//                       ) : (
//                         <p className="text-gray-400 italic text-[11px]">
//                           No written comment provided. User rated the order.
//                         </p>
//                       )}

//                       <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500">
//                         <div className="inline-flex items-center gap-1">
//                           <FaClock className="text-[11px]" />
//                           <span>
//                             Reviewed: {formatDate(o.review?.createdAt)}
//                           </span>
//                         </div>
//                         {/* <button
//                           type="button"
//                           onClick={() =>
//                             window.open(
//                               `/admin/order/${o._id}`,
//                               "_blank",
//                               "noopener"
//                             )
//                           }
//                           className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-[11px]"
//                         >
//                           <FaExternalLinkAlt className="text-[10px]" />
//                           <span>View order</span>
//                         </button> */}
//                       </div>

//                       {o.review?.media?.length > 0 && (
//                         <div className="mt-1">
//                           <p className="text-[11px] font-semibold text-gray-600 mb-1">
//                             Attachments
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {o.review.media.map((m) => (
//                               <a
//                                 key={m.public_id}
//                                 href={m.url}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="px-2 py-1 text-[11px] rounded-full bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition"
//                               >
//                                 {m.originalName ||
//                                 (m.mimetype || "").startsWith("image/")
//                                   ? "View Image"
//                                   : "View File"}
//                               </a>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminOrderReviews;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaStar,
  FaUserCircle,
  FaBoxOpen,
  FaClock,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import AdminOpsSidebar from "./AdminOpsSidebar.jsx";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

// Cloudinary cloud name (set in .env as VITE_CLOUDINARY_CLOUD_NAME)
const CLOUD_NAME = import.meta.env.CLOUD_NAME || "";

const chipClass = (score) => {
  if (!score) return "bg-slate-50 text-slate-600 border-slate-200";
  if (score >= 4) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 3) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
};

const AdminOrderReviews = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(1);

  // Modal for preview + download
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalType, setModalType] = useState("image"); // "image" | "video" | "file"
  const [modalName, setModalName] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${REACT_APP_BACKEND_URL}/api/order/admin/reviews`,
        { withCredentials: true }
      );
      setOrders(data.orders || []);
      setPage(1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error(error.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "-";

  // Derived values for pagination
  const total = orders.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goTo = (p) => setPage(() => Math.min(Math.max(1, p), totalPages));

  // helpers to decide media type and normalize single vs array
  const normalizeMedia = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return [raw];
  };

  /**
   * Build or return a usable URL for the media item `m`.
   * - If m is a string, return it.
   * - If m.url / secure_url exist, prefer them.
   * - If m.public_id exists and CLOUD_NAME is provided, build a Cloudinary URL.
   *   Use resource-type based on mimeType (image/video/raw).
   */
  const safeUrlFrom = (m) => {
    if (!m) return "";
    if (typeof m === "string") return m;

    // Common direct fields
    const direct =
      m.url ||
      m.secure_url ||
      m.secureUrl ||
      m.path ||
      (m.data && m.data.url) ||
      (m.file && m.file.url);
    if (direct) return direct;

    // Build Cloudinary URL from public_id if possible
    if (m.public_id && CLOUD_NAME) {
      const mime = (m.mimeType || m.mimetype || m.type || "").toLowerCase();
      let resourceType = "raw";
      if (mime.startsWith("image/")) resourceType = "image";
      else if (mime.startsWith("video/")) resourceType = "video";

      // Preserve slashes in public_id, encode other characters
      const encodedPublicId = encodeURIComponent(m.public_id).replace(/%2F/g, "/");

      return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${encodedPublicId}`;
    }

    return "";
  };

  const getOriginalName = (m, idx) =>
    (m && (m.originalName || m.originalname || m.name || m.filename)) ||
    `attachment-${idx + 1}`;

  const getMime = (m) =>
    (m && (m.mimeType || m.mimetype || m.type)) || (typeof m === "string" ? "" : "");

  const isImage = (m, url) =>
    (getMime(m) || "").startsWith("image/") ||
    /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(getOriginalName(m, 0)) ||
    /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(url || "");

  const isVideo = (m, url) =>
    (getMime(m) || "").startsWith("video/") ||
    /\.(mp4|webm|ogg|mov|mkv)$/i.test(getOriginalName(m, 0)) ||
    /\.(mp4|webm|ogg|mov|mkv)$/i.test(url || "");

  // open preview modal
  const openPreview = (m, idx = 0) => {
    const url = safeUrlFrom(m);
    if (!url) {
      toast.error("No preview available for this file");
      console.warn("Missing URL for media", m);
      return;
    }
    if (isImage(m, url)) setModalType("image");
    else if (isVideo(m, url)) setModalType("video");
    else setModalType("file");

    setModalUrl(url);
    setModalName(getOriginalName(m, idx));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalUrl("");
    setModalName("");
  };

  // download the file via fetch blob (cross-origin will work if Cloudinary allows CORS)
  const handleDownload = async () => {
    if (!modalUrl) return;
    try {
      toast.loading("Preparing download...");
      const res = await fetch(modalUrl, { mode: "cors" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = modalName || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.dismiss();
      toast.success("Download started");
    } catch (err) {
      console.error("Download failed", err);
      toast.dismiss();
      toast.error("Download failed — opened in a new tab instead");
      // fallback: open in new tab so user can save manually
      window.open(modalUrl, "_blank", "noopener");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-[#e8f3fc] to-[#d9e9fb]">
      <AdminOpsSidebar />

      <main className="flex-1 flex justify-center px-4 py-10 md:ml-34 transition-all duration-300">
        <div className="w-full max-w-6xl mx-auto">
          {/* Heading + refresh */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
            <h1
              className="text-3xl font-bold text-center sm:text-left text-[#2479C2]
                         transition-all duration-300 hover:text-blue-600 hover:scale-[1.03]
                         cursor-default select-none"
            >
              Order Reviews Overview
            </h1>
            <button
              type="button"
              onClick={fetchReviews}
              className="self-center sm:self-auto text-[11px] px-3 py-1 rounded-full 
                         border border-blue-200 text-blue-700 bg-blue-50
                         hover:bg-blue-100 hover:border-blue-400 
                         hover:-translate-y-[1px] hover:shadow-md
                         active:translate-y-0 active:shadow-sm transition"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 text-sm">Loading reviews...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">No reviews have been submitted yet.</p>
          ) : (
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedOrders.map((o) => {
                  const mediaList = normalizeMedia(o.review?.media);
                  return (
                    <div
                      key={o._id}
                      className="rounded-2xl border border-slate-100 shadow-sm bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 flex flex-col gap-3"
                    >
                      {/* Top line: user + order */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <FaUserCircle className="text-2xl text-slate-500" />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {o.user?.name || "Unknown user"}
                            </p>
                            <p className="text-[11px] text-gray-500">{o.user?.email}</p>
                          </div>
                        </div>
                        <div className="text-right text-[11px] text-gray-500 flex flex-col items-end gap-1">
                          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#2479C2]">
                            <FaBoxOpen className="text-[13px]" />
                            <span className="truncate max-w-[160px]">{o.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            Order ID: <span className="font-mono">{o._id?.slice(-8)}</span>
                          </span>
                        </div>
                      </div>

                      {/* Ratings row */}
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div
                          className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
                            o.review?.ratingManufacturing
                          )}`}
                        >
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <FaStar className="text-[10px]" />
                            <span>Manufacturing</span>
                          </span>
                          <span className="text-sm">{o.review?.ratingManufacturing || "-"}</span>
                        </div>
                        <div
                          className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
                            o.review?.ratingDelivery
                          )}`}
                        >
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <FaStar className="text-[10px]" />
                            <span>Delivery</span>
                          </span>
                          <span className="text-sm">{o.review?.ratingDelivery || "-"}</span>
                        </div>
                        <div
                          className={`rounded-xl border px-2 py-1.5 flex flex-col items-center gap-1 ${chipClass(
                            o.review?.ratingHandling
                          )}`}
                        >
                          <span className="inline-flex items-center gap-1 font-semibold">
                            <FaStar className="text-[10px]" />
                            <span>Handling</span>
                          </span>
                          <span className="text-sm">{o.review?.ratingHandling || "-"}</span>
                        </div>
                      </div>

                      {/* Comment + meta */}
                      <div className="text-[12px] mt-1 space-y-2">
                        {o.review?.comment && o.review.comment.trim() ? (
                          <p className="text-gray-700 bg-slate-50/70 border border-slate-100 rounded-xl px-3 py-2">
                            {o.review.comment}
                          </p>
                        ) : (
                          <p className="text-gray-400 italic text-[11px]">
                            No written comment provided. User rated the order.
                          </p>
                        )}

                        <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500">
                          <div className="inline-flex items-center gap-1">
                            <FaClock className="text-[11px]" />
                            <span>Reviewed: {formatDate(o.review?.createdAt)}</span>
                          </div>
                        </div>

                        {/* Attachments: thumbnails for images and playable videos */}
                        {mediaList.length > 0 && (
                          <div className="mt-1">
                            <p className="text-[11px] font-semibold text-gray-600 mb-2">Attachments</p>

                            <div className="flex flex-wrap gap-2">
                              {mediaList.map((m, idx) => {
                                const url = safeUrlFrom(m);
                                if (!url) {
                                  console.warn("Media without URL", m, "orderId:", o._id);
                                  return (
                                    <div
                                      key={`missing-${o._id}-${idx}`}
                                      className="w-[120px] md:w-[140px] border border-slate-100 rounded-lg overflow-hidden bg-white shadow-sm flex items-center justify-center p-4"
                                    >
                                      <span className="text-xs text-gray-500">No preview</span>
                                    </div>
                                  );
                                }

                                const originalName = getOriginalName(m, idx);
                                const showAsImage = isImage(m, url);
                                const showAsVideo = isVideo(m, url);
                                const mediaKey = m?.public_id || url || `${o._id}-media-${idx}`;

                                return (
                                  <div
                                    key={mediaKey}
                                    className="w-[120px] md:w-[140px] border border-slate-100 rounded-lg overflow-hidden bg-white shadow-sm"
                                  >
                                    {showAsImage ? (
                                      <button
                                        type="button"
                                        onClick={() => openPreview(m, idx)}
                                        className="block p-1 w-full text-left"
                                      >
                                        <img
                                          src={url}
                                          alt={originalName}
                                          className="w-full h-[88px] object-cover rounded-md transition-transform hover:scale-[1.03]"
                                        />
                                      </button>
                                    ) : showAsVideo ? (
                                      <button
                                        type="button"
                                        onClick={() => openPreview(m, idx)}
                                        className="w-full h-[88px] flex items-center justify-center bg-black/5"
                                      >
                                        <video
                                          className="w-full h-[88px] object-cover"
                                          src={url}
                                          // do not autoplay
                                        >
                                          Your browser does not support the video tag.
                                        </video>
                                      </button>
                                    ) : (
                                      <div className="flex flex-col h-[88px] items-center justify-center p-2">
                                        <div className="text-[11px] text-center text-gray-700 line-clamp-2 mb-1">
                                          {originalName}
                                        </div>
                                        <div className="text-[10px] text-gray-400">Click to open</div>
                                        <div className="mt-2">
                                          <button
                                            onClick={() => openPreview(m, idx)}
                                            className="text-[11px] text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                          >
                                            <FaExternalLinkAlt className="text-[10px]" />
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    <div className="px-2 py-1 border-t border-slate-100 text-[11px] text-gray-600 flex items-center justify-between">
                                      <span className="truncate">{originalName}</span>
                                      <div className="inline-flex items-center gap-2">
                                        <button
                                          onClick={() => {
                                            // open in new tab (fallback)
                                            window.open(url, "_blank", "noopener");
                                          }}
                                          className="text-[12px] text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                          title="Open in new tab"
                                        >
                                          <FaExternalLinkAlt className="text-[10px]" />
                                        </button>

                                        <button
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            try {
                                              toast.loading("Starting download...");
                                              const res = await fetch(url, { mode: "cors" });
                                              if (!res.ok) throw new Error("Failed to fetch file");
                                              const blob = await res.blob();
                                              const blobUrl = window.URL.createObjectURL(blob);
                                              const a = document.createElement("a");
                                              a.href = blobUrl;
                                              a.download = originalName || "download";
                                              document.body.appendChild(a);
                                              a.click();
                                              a.remove();
                                              window.URL.revokeObjectURL(blobUrl);
                                              toast.dismiss();
                                              toast.success("Download started");
                                            } catch (err) {
                                              console.error("Direct download failed", err);
                                              toast.dismiss();
                                              toast.error("Download failed, opening in new tab");
                                              window.open(url, "_blank", "noopener");
                                            }
                                          }}
                                          className="text-[12px] text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                          title="Download"
                                        >
                                          <FaDownload className="text-[11px]" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination controls */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{Math.min(total, startIdx + 1)}</span> -{" "}
                  <span className="font-medium">{Math.min(total, startIdx + paginatedOrders.length)}</span> of{" "}
                  <span className="font-medium">{total}</span> reviews
                </div>

                <div className="inline-flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    disabled={page === 1}
                    className={`inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-md border ${
                      page === 1
                        ? "text-gray-400 border-slate-100 bg-slate-50 cursor-not-allowed"
                        : "text-gray-700 border-slate-200 bg-white hover:shadow-sm"
                    }`}
                    aria-label="Previous page"
                  >
                    <FaChevronLeft />
                    Prev
                  </button>

                  <div className="hidden sm:inline-flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      if (
                        totalPages > 7 &&
                        Math.abs(p - page) > 2 &&
                        p !== 1 &&
                        p !== totalPages
                      ) {
                        if (p === 2 && page > 4) {
                          return (
                            <span key={`dots-left-${p}`} className="px-3 py-1 text-sm text-gray-400">
                              …
                            </span>
                          );
                        }
                        if (p === totalPages - 1 && page < totalPages - 3) {
                          return (
                            <span key={`dots-right-${p}`} className="px-3 py-1 text-sm text-gray-400">
                              …
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={p}
                          onClick={() => goTo(p)}
                          className={`px-3 py-1 rounded-md text-sm border ${
                            p === page ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-slate-200 hover:shadow-sm"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <div className="sm:hidden text-[13px] px-2 py-1 text-gray-600">
                    {page} / {totalPages}
                  </div>

                  <button
                    onClick={goNext}
                    disabled={page === totalPages}
                    className={`inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-md border ${
                      page === totalPages
                        ? "text-gray-400 border-slate-100 bg-slate-50 cursor-not-allowed"
                        : "text-gray-700 border-slate-200 bg-white hover:shadow-sm"
                    }`}
                    aria-label="Next page"
                  >
                    Next
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal: preview + download */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              role="dialog"
              aria-modal="true"
            >
              <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">{modalName}</h3>
                    <span className="text-xs text-gray-500">Preview</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-md border text-gray-700 bg-white hover:shadow-sm"
                      title="Download"
                    >
                      <FaDownload />
                      Download
                    </button>
                    <button
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-md border text-gray-700 bg-white hover:shadow-sm"
                      aria-label="Close preview"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                <div className="p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-slate-50">
                  {modalType === "image" ? (
                    <img src={modalUrl} alt={modalName} className="max-h-[70vh] w-auto object-contain" />
                  ) : modalType === "video" ? (
                    <video controls className="max-h-[70vh] w-full object-contain">
                      <source src={modalUrl} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-6">
                      <div className="text-gray-700">{modalName}</div>
                      <div className="text-sm text-gray-500">No inline preview available</div>
                      <div>
                        <a
                          href={modalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-blue-600 hover:text-blue-800"
                        >
                          Open file in new tab
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminOrderReviews;
