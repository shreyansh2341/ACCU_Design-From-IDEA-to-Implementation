// // routes/vendor.routes.js
// const express = require("express");
// const router = express.Router();

// const vendorController = require("../controller/vendor.controller");

// // Middleware - replace with your project's auth middleware
// // authenticatedUser should populate req.user
// const { authenticatedUser } = require("../middleware/authUser"); // adjust path

// // Optional: a role-check middleware (if you have one). If not, controller checks role.
// const requireVendor = (req, res, next) => {
//   if (!req.user) return res.status(401).json({ message: "Not authenticated" });
//   if (req.user.role !== "vendor") return res.status(403).json({ message: "Vendor access only" });
//   return next();
// };

// /**
//  * Vendor routes
//  */
// router.get("/orders", authenticatedUser, requireVendor, vendorController.getVendorOrders);
// router.get("/reviews", authenticatedUser, requireVendor, vendorController.getVendorReviewedOrders);

// router.get("/profile/me", authenticatedUser, requireVendor, vendorController.getVendorProfile);
// router.patch("/profile/update", authenticatedUser, requireVendor, vendorController.updateVendorProfile);

// router.get("/notifications", authenticatedUser, requireVendor, vendorController.getVendorNotifications);
// router.post("/notifications/mark-all-read", authenticatedUser, requireVendor, vendorController.markAllVendorNotificationsRead);

// module.exports = router;
