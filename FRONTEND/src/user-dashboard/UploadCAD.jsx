import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaClipboardList,
  FaCubes,
  FaRulerCombined,
  FaShippingFast,
  FaExclamationTriangle,
  FaFileUpload,
} from "react-icons/fa";

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || "http://localhost:4000";

const UploadCAD = () => {
  const [title, setTitle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreviewName, setAttachmentPreviewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setAttachmentPreviewName(file.name);
    } else {
      setAttachment(null);
      setAttachmentPreviewName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("serviceType", serviceType);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("deliveryAddress", deliveryAddress);

    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      setIsSubmitting(true);
      const { status } = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/order/create-order`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (status >= 200 && status < 300) {
        toast.success("Order request submitted successfully!");
        setTitle("");
        setServiceType("");
        setDescription("");
        setQuantity(1);
        setDeliveryAddress("");
        setAttachment(null);
        setAttachmentPreviewName("");
      } else {
        toast.error("Failed to submit order request");
      }
    } catch (error) {
      console.error("Error during order creation:", error);
      toast.error(
        error.response?.data?.message || "Error while submitting order request"
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="w-full max-w-6xl mx-auto mt-14 mb-8 px-4">
        {/* Make form wider → 5 columns: form = 3, info = 2 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
          {/* Form (3/5) */}
          <div className="md:col-span-3 bg-white/85 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.15)] border border-blue-50 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-2xl bg-blue-100 text-blue-600 shadow-inner shadow-blue-200">
                  <FaClipboardList className="text-sm" />
                </span>
                <div>
                  <h1 className="text-xl font-bold text-[#2479C2]">
                    Place an Order
                  </h1>
                  <p className="text-[11px] text-gray-500">
                    Provide detailed inputs so we can manufacture exactly what
                    you need.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Order Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Example: CNC machined aluminium bracket"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm bg-white/90
                             focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., CNC machining, 3D printing, fabrication…"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm bg-white/90
                             focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Requirement Description{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe dimensions, tolerances, materials, finish, quantity, usage, or any constraints…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-[18vh] p-2 border rounded-lg text-sm bg-white/90
                             resize-none
                             focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm bg-white/90
                               focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    placeholder="Flat / Building, Street, City, Pincode"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full h-[12vh] p-2 border rounded-lg text-sm bg-white/90
                               resize-none
                               focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Attach CAD / PDF / Image
                </label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-2 border rounded-lg text-xs text-gray-500 bg-gray-50/80">
                      {attachmentPreviewName || "No file selected"}
                    </div>
                    <label
                      className="inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold
                                       bg-gradient-to-r from-blue-500 to-blue-600 text-white
                                       cursor-pointer shadow-md shadow-blue-400/40
                                       hover:from-blue-600 hover:to-blue-700 hover:-translate-y-[1px]
                                       active:translate-y-0 active:shadow-sm
                                       transition"
                    >
                      <FaFileUpload className="mr-1" />
                      Browse
                      <input
                        type="file"
                        onChange={changeFileHandler}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Supported: PDF, images, CAD files (STEP, IGES, DXF, etc.).
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-2 py-2.5 rounded-full text-sm font-semibold text-white
                            bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                            shadow-md shadow-blue-500/40
                            hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                            hover:-translate-y-[1px] hover:shadow-[0_12px_25px_rgba(37,99,235,0.6)]
                            active:translate-y-0 active:shadow-md
                            transition
                            ${
                              isSubmitting
                                ? "opacity-75 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Order Request"}
              </button>
            </form>
          </div>

          {/* Info column (2/5) */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(36,121,194,0.18)] border border-blue-50 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                <FaClipboardList className="text-white text-lg" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-[#2479C2]">
                  Order Guidelines
                </h2>
                <p className="text-xs text-gray-500">
                  Better details = faster, more accurate manufacturing.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-blue-500">
                  <FaCubes />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Manufacturing Capabilities
                  </p>
                  <p className="text-gray-600 text-xs">
                    CNC machining, 3D printing, laser cutting, fabrication, and
                    more. Mention any specific process in the{" "}
                    <span className="font-semibold">Service Type</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-indigo-500">
                  <FaRulerCombined />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Be as Specific as Possible
                  </p>
                  <p className="text-gray-600 text-xs">
                    Include critical dimensions, tolerances, materials, finish,
                    and usage so the outcome matches your expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 text-emerald-500">
                  <FaShippingFast />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Delivery & Lead Time
                  </p>
                  <p className="text-gray-600 text-xs">
                    A clear address helps us estimate shipping feasibility and
                    approximate delivery time once order is accepted.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation warning box */}
            <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 px-3 py-3 text-xs shadow-sm shadow-amber-200/60">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="mt-0.5 text-amber-500" />
                <div>
                  <p className="font-semibold mb-1">
                    Order Cancellation Policy
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      You can request cancellation{" "}
                      <strong>only before</strong> your order is assigned to a
                      vendor.
                    </li>
                    <li>
                      Once a vendor is assigned, use the{" "}
                      <strong>Messages</strong> tab in your dashboard to talk
                      to the admin.
                    </li>
                    <li>
                      Approved cancellations are processed by admin and the
                      order is <strong>removed from our system</strong>.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Track status anytime in{" "}
              <span className="font-semibold text-[#2479C2]">My Orders</span>{" "}
              and discuss details with us in{" "}
              <span className="font-semibold text-[#2479C2]">Messages</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCAD;
