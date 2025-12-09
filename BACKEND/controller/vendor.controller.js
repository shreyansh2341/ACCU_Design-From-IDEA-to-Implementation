// // controllers/vendor.controller.js
// const Order = require("../model/Order.model");
// const User = require("../model/user.model");
// // const Notification = require("../models/Notification");
// const { verifyOtp } = require("../utils/otpUtils"); // adjust path if needed

// /**
//  * NOTE: All handlers expect `req.user` to contain authenticated user (set by your auth middleware).
//  * These handlers will check role === 'vendor' when appropriate.
//  */

// /**
//  * GET /api/vendor/orders
//  * Get all orders assigned to the logged-in vendor (most recent first).
//  */
// const getVendorOrders = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "vendor") {
//       return res.status(403).json({ message: "Access denied. Vendor only." });
//     }

//     const vendorId = req.user._id;

//     const orders = await Order.find({ vendor: vendorId })
//       .populate("user", "name email")
//       .populate("vendor", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ success: true, orders });
//   } catch (err) {
//     console.error("getVendorOrders:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * GET /api/vendor/reviews
//  * Get orders assigned to vendor that have reviews.
//  */
// const getVendorReviewedOrders = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "vendor") {
//       return res.status(403).json({ message: "Access denied. Vendor only." });
//     }

//     const vendorId = req.user._id;

//     const orders = await Order.find({
//       vendor: vendorId,
//       review: { $exists: true, $ne: null },
//     })
//       .populate("user", "name email")
//       .populate("vendor", "name email")
//       .sort({ updatedAt: -1 });

//     return res.status(200).json({ success: true, orders });
//   } catch (err) {
//     console.error("getVendorReviewedOrders:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * GET /api/vendor/profile/me
//  * Return vendor's profile (the currently logged in vendor).
//  */
// const getVendorProfile = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Not authenticated" });

//     // If you store profile in User schema directly:
//     const user = await User.findById(req.user._id).select("-password -__v");
//     if (!user) return res.status(404).json({ message: "Vendor not found" });

//     return res.status(200).json({ success: true, profile: user });
//   } catch (err) {
//     console.error("getVendorProfile:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * PATCH /api/vendor/profile/update
//  * Update vendor profile. If email/phone change requires OTP verification (optional).
//  * Body:
//  *  - fields to update (name, phone, companyName, companyAddress, social links...)
//  *  - optionally: { otp, otpFor: "email" | "phone" }  <-- if you want OTP verification
//  */
// const updateVendorProfile = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Not authenticated" });

//     const vendorId = req.user._id;
//     const updates = { ...(req.body || {}) };

//     // If OTP verification is required for sensitive changes (email/phone), handle it:
//     // If front-end sends otp & otpFor then we use it; else we allow non-sensitive updates.
//     const sensitiveFields = ["email", "phone"];
//     const wantsSensitiveChange = sensitiveFields.some((f) => updates[f] !== undefined);

//     if (wantsSensitiveChange) {
//       const { otp, otpFor } = req.body;
//       if (!otp || !otpFor) {
//         return res.status(400).json({
//           success: false,
//           message: "OTP required for changing email/phone. Send otp and otpFor ('email' or 'phone').",
//         });
//       }

//       // calls verifyOtp util (you provided earlier). It should throw/return false on invalid OTP.
//       const ok = await verifyOtp(req.user._id.toString(), otpFor, otp);
//       if (!ok) {
//         return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
//       }
//     }

//     // Remove fields you don't want to allow direct updates for
//     delete updates.role;
//     delete updates.password;
//     delete updates._id;
//     delete updates.createdAt;
//     delete updates.updatedAt;

//     const updated = await User.findByIdAndUpdate(vendorId, updates, {
//       new: true,
//       runValidators: true,
//     }).select("-password -__v");

//     return res.status(200).json({ success: true, profile: updated });
//   } catch (err) {
//     console.error("updateVendorProfile:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * GET /api/vendor/notifications
//  * Return notifications for current vendor.
//  */
// const getVendorNotifications = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Not authenticated" });

//     const notifications = await Notification.find({ recipient: req.user._id })
//       .sort({ createdAt: -1 })
//       .limit(200);

//     return res.status(200).json({ success: true, notifications });
//   } catch (err) {
//     console.error("getVendorNotifications:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * POST /api/vendor/notifications/mark-all-read
//  * Mark all vendor notifications as read.
//  */
// const markAllVendorNotificationsRead = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Not authenticated" });

//     await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true });
//     return res.status(200).json({ success: true, message: "All notifications marked read" });
//   } catch (err) {
//     console.error("markAllVendorNotificationsRead:", err);
//     return res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// module.exports = {
//   getVendorOrders,
//   getVendorReviewedOrders,
//   getVendorProfile,
//   updateVendorProfile,
//   getVendorNotifications,
//   markAllVendorNotificationsRead,
// };
