// const express = require("express");
// const {
//   createOrder,
//   getMyOrders,
//   getSingleOrder,
//   getOrderMessages,
//   addOrderMessage,
//   addOrderReview,
//   getAllOrdersAdmin,
//   updateOrderStatusAdmin,
//   assignVendorAdmin,
//   getAllVendorsAdmin,
//   requestOrderCancellation,
//   adminCancelAndDeleteOrder,
// } = require("../controller/order.controller");

// const { authenticatedUser, isAdmin } = require("../middleware/authUser");

// const orderRouter = express.Router();

// // ---------- USER ROUTES ----------
// orderRouter.post("/create-order", authenticatedUser, createOrder);
// orderRouter.get("/my-orders", authenticatedUser, getMyOrders);
// orderRouter.get("/single-order/:id", authenticatedUser, getSingleOrder);

// orderRouter.get(
//   "/single-order/:id/messages",
//   authenticatedUser,
//   getOrderMessages
// );
// orderRouter.post(
//   "/single-order/:id/messages",
//   authenticatedUser,
//   addOrderMessage
// );

// orderRouter.post(
//   "/single-order/:id/review",
//   authenticatedUser,
//   addOrderReview
// );
// orderRouter.post(
//   "/single-order/:id/request-cancel",
//   authenticatedUser,
//   requestOrderCancellation
// );

// // ---------- ADMIN ROUTES ----------
// orderRouter.get(
//   "/admin/all-orders",
//   authenticatedUser,
//   isAdmin("admin"),
//   getAllOrdersAdmin
// );

// orderRouter.patch(
//   "/admin/order/:id/status",
//   authenticatedUser,
//   isAdmin("admin"),
//   updateOrderStatusAdmin
// );

// orderRouter.patch(
//   "/admin/order/:id/assign-vendor",
//   authenticatedUser,
//   isAdmin("admin"),
//   assignVendorAdmin
// );

// orderRouter.get(
//   "/admin/vendors",
//   authenticatedUser,
//   isAdmin("admin"),
//   getAllVendorsAdmin
// );

// orderRouter.post(
//   "/admin/cancel-order/:id",
//   authenticatedUser,
//   isAdmin("admin"),
//   adminCancelAndDeleteOrder
// );

// module.exports = orderRouter;

const express = require("express");
const {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getOrderMessages,
  addOrderMessage,
  addOrderReview,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  assignVendorAdmin,
  getAllVendorsAdmin,
  requestOrderCancellation,
  adminCancelAndDeleteOrder,
  getCancelRequestsAdmin,
  adminApproveCancellation,
  adminRejectCancellation,
  getOrderReviewsAdmin,
  deleteOrderAdmin,
} = require("../controller/order.controller");

const { authenticatedUser, isAdmin } = require("../middleware/authUser");

const orderRouter = express.Router();

// ---------- USER ROUTES ----------
orderRouter.post("/create-order", authenticatedUser, createOrder);
orderRouter.get("/my-orders", authenticatedUser, getMyOrders);
orderRouter.get("/single-order/:id", authenticatedUser, getSingleOrder);

orderRouter.get(
  "/single-order/:id/messages",
  authenticatedUser,
  getOrderMessages
);
orderRouter.post(
  "/single-order/:id/messages",
  authenticatedUser,
  addOrderMessage
);

orderRouter.post(
  "/single-order/:id/review",
  authenticatedUser,
  addOrderReview
);
orderRouter.post(
  "/single-order/:id/request-cancel",
  authenticatedUser,
  requestOrderCancellation
);

// ---------- ADMIN ROUTES ----------
orderRouter.get(
  "/admin/all-orders",
  authenticatedUser,
  isAdmin("admin"),
  getAllOrdersAdmin
);

orderRouter.patch(
  "/admin/order/:id/status",
  authenticatedUser,
  isAdmin("admin"),
  updateOrderStatusAdmin
);

orderRouter.patch(
  "/admin/order/:id/assign-vendor",
  authenticatedUser,
  isAdmin("admin"),
  assignVendorAdmin
);

orderRouter.get(
  "/admin/vendors",
  authenticatedUser,
  isAdmin("admin"),
  getAllVendorsAdmin
);

// ✅ NEW: list all pending cancel requests
orderRouter.get(
  "/admin/cancel-requests",
  authenticatedUser,
  isAdmin("admin"),
  getCancelRequestsAdmin
);

// ✅ NEW: approve / reject cancellation (used by AdminCancelRequests.jsx)
orderRouter.post(
  "/admin/order/:id/cancel-approve",
  authenticatedUser,
  isAdmin("admin"),
  adminApproveCancellation
);

orderRouter.post(
  "/admin/order/:id/cancel-reject",
  authenticatedUser,
  isAdmin("admin"),
  adminRejectCancellation
);

// existing alias – still used by AdminOrderDetail "Approve & Delete Order" button
orderRouter.post(
  "/admin/cancel-order/:id",
  authenticatedUser,
  isAdmin("admin"),
  adminCancelAndDeleteOrder
);

orderRouter.get(
  "/admin/reviews",
  authenticatedUser,
  isAdmin("admin"),
  getOrderReviewsAdmin
);

orderRouter.delete(
  "/admin/order/:id",
  authenticatedUser,
  isAdmin("admin"),
  deleteOrderAdmin
);

module.exports = orderRouter;
