const mongoose = require("mongoose");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const Order = require("../model/Order.model");
const OrderMessage = require("../model/Message.model");
const User = require("../model/user.model");

// reuse style from your blog controller
const uploadFileToCloudinary = async (tempFilePath, originalName) => {
  const result = await cloudinary.uploader.upload(tempFilePath, {
    folder: "order_files",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });

  try {
    await fs.unlink(tempFilePath);
  } catch (err) {
    console.warn("Failed to remove temp file:", tempFilePath, err.message);
  }

  return {
    public_id: result.public_id,
    url: result.secure_url || result.url,
    originalName,
  };
};

// ---------------- USER: CREATE ORDER ----------------
const createOrder = async (req, res) => {
  try {
    const { title, serviceType, description, quantity, deliveryAddress } =
      req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required" });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const filesArray = [];

    // express-fileupload: req.files.attachment can be single or array
    if (req.files && req.files.attachment) {
      const attachments = Array.isArray(req.files.attachment)
        ? req.files.attachment
        : [req.files.attachment];

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/svg+xml",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // CAD-like generic types may come as octet-stream
        "application/octet-stream",
      ];

      for (const file of attachments) {
        if (!file.tempFilePath) continue;

        if (!allowedTypes.includes(file.mimetype)) {
          // clean up invalid
          await fs.unlink(file.tempFilePath).catch(() => { });
          return res.status(400).json({
            message: `Invalid file type (${file.mimetype}).`,
          });
        }

        const uploaded = await uploadFileToCloudinary(
          file.tempFilePath,
          file.name
        );
        filesArray.push({
          ...uploaded,
          mimeType: file.mimetype,
        });
      }
    }

    const now = new Date();

    const order = await Order.create({
      title,
      serviceType: serviceType || "",
      description,
      quantity: quantity || 1,
      deliveryAddress: deliveryAddress || "",
      user: userId,
      files: filesArray,
      status: "requested",
      statusHistory: [
        {
          status: "requested",
          note: "Order created by user",
          updatedBy: userId,
          updatedAt: now,
        },
      ],
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- USER: GET MY ORDERS ----------------
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?._id;
    const orders = await Order.find({ user: userId })
      .populate("vendor", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My orders retrieved",
      orders,
    });
  } catch (error) {
    console.error("getMyOrders error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- USER/ADMIN/VENDOR: SINGLE ORDER ----------------
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email role")
      .populate("vendor", "name email role");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Access control: user can only see own order, vendor only their order
    const role = req.user?.role;
    if (role === "user" && String(order.user._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (
      role === "vendor" &&
      (!order.vendor || String(order.vendor._id) !== String(req.user._id))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      message: "Order retrieved",
      order,
    });
  } catch (error) {
    console.error("getSingleOrder error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ---------------- MESSAGES (CHAT) ----------------
// const getOrderMessages = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid order ID" });
//     }

//     const messages = await OrderMessage.find({ order: id })
//       .populate("sender", "name email role")
//       .sort({ createdAt: 1 });

//     return res.status(200).json({
//       message: "Messages retrieved",
//       messages,
//     });
//   } catch (error) {
//     console.error("getOrderMessages error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

const getOrderMessages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    let chatExpired = false;

    // ✅ If order is completed / cancelled, delete chat after 30 days
    if (["completed", "cancelled"].includes(order.status)) {
      let baseDate = null;

      // If you track status history, try to get the exact date when it became completed/cancelled
      if (Array.isArray(order.statusHistory) && order.statusHistory.length) {
        const matching = order.statusHistory.filter(
          (item) => item.status === order.status
        );
        if (matching.length) {
          baseDate = matching[matching.length - 1].updatedAt;
        }
      }

      // fallback: use updatedAt or createdAt
      if (!baseDate) {
        baseDate = order.updatedAt || order.createdAt;
      }

      const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
      const expiryTime = new Date(baseDate).getTime() + THIRTY_DAYS_MS;

      if (Date.now() > expiryTime) {
        chatExpired = true;
        await OrderMessage.deleteMany({ order: id }); // actual delete here
      }
    }

    let messages = [];
    if (!chatExpired) {
      messages = await OrderMessage.find({ order: id })
        .populate("sender", "name email role")
        .sort({ createdAt: 1 });
    }

    return res.status(200).json({
      message: "Messages retrieved",
      messages,
      chatExpired, // frontend can choose to show a small note if true
    });
  } catch (error) {
    console.error("getOrderMessages error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// const addOrderMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid order ID" });
//     }
//     if (!text || !text.trim()) {
//       return res.status(400).json({ message: "Message text is required" });
//     }

//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // access control similar to getSingleOrder
//     const role = req.user?.role;
//     if (role === "user" && String(order.user) !== String(req.user._id)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     if (
//       role === "vendor" &&
//       (!order.vendor || String(order.vendor) !== String(req.user._id))
//     ) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const message = await OrderMessage.create({
//       order: id,
//       sender: req.user._id,
//       senderRole: role,
//       text: text.trim(),
//     });

//     return res.status(201).json({
//       message: "Message added",
//       item: message,
//     });
//   } catch (error) {
//     console.error("addOrderMessage error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// ---------------- USER: REVIEW ORDER ----------------

const addOrderMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ❌ Block chat when order is completed / cancelled
    if (["completed", "cancelled"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Chat is closed for this order." });
    }

    // access control
    const role = req.user?.role;
    if (role === "user" && String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (
      role === "vendor" &&
      (!order.vendor || String(order.vendor) !== String(req.user._id))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const message = await OrderMessage.create({
      order: id,
      sender: req.user._id,
      senderRole: role,
      text: text.trim(),
    });

    return res.status(201).json({
      message: "Message added",
      item: message,
    });
  } catch (error) {
    console.error("addOrderMessage error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// const addOrderReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       ratingManufacturing,
//       ratingDelivery,
//       ratingHandling,
//       comment,
//     } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid order ID" });
//     }

//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // only order owner can review
//     if (String(order.user) !== String(req.user._id)) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // if you want to restrict: only when completed
//     // if (order.status !== "completed") { ... }

//     order.review = {
//       ratingManufacturing: ratingManufacturing || null,
//       ratingDelivery: ratingDelivery || null,
//       ratingHandling: ratingHandling || null,
//       comment: comment || "",
//       createdAt: new Date(),
//     };

//     await order.save();

//     return res.status(200).json({
//       message: "Review saved",
//       order,
//     });
//   } catch (error) {
//     console.error("addOrderReview error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

const addOrderReview = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      ratingManufacturing,
      ratingDelivery,
      ratingHandling,
      comment,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // only order owner can review
    if (String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    let reviewMedia = null;

    // Single file: reviewMedia
    if (req.files && req.files.reviewMedia) {
      const file = req.files.reviewMedia;

      const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "video/mp4",
        "video/quicktime",
        "video/webm",
      ];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: "Unsupported file type for review media",
        });
      }

      const uploaded = await uploadFileToCloudinary(
        file.tempFilePath,
        file.name,
        "order_review_media" // folder
      );

      reviewMedia = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
        format: uploaded.format,
        mimeType: file.mimetype,
        originalName: file.name,
      };
    }

    order.review = {
      ratingManufacturing: ratingManufacturing || null,
      ratingDelivery: ratingDelivery || null,
      ratingHandling: ratingHandling || null,
      comment: comment || "",
      media: reviewMedia, // can be null
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await order.save();

    return res.status(200).json({
      message: "Review saved",
      order,
    });
  } catch (error) {
    console.error("addOrderReview error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const requestOrderCancellation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reasonType, reasonText } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Must be order owner
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to cancel this order" });
    }

    // Already completed or cancelled
    if (["completed", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: "This order is already completed or cancelled",
      });
    }

    // ✅ If vendor assigned, user cannot request through button
    if (order.vendor) {
      return res.status(400).json({
        message:
          "This order has already been assigned to a vendor. Please use Messages to talk with admin.",
      });
    }

    // Already requested
    if (order.cancellation?.requested && order.cancellation?.status === "pending") {
      return res.status(400).json({
        message: "Cancellation request is already pending for this order",
      });
    }

    order.cancellation = {
      requested: true,
      reasonType: reasonType || "Not specified",
      reasonText: reasonText || "",
      requestedAt: new Date(),
      requestedBy: req.user._id,
      status: "pending",
    };

    order.status = "cancel_requested";
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: "cancel_requested",
      updatedAt: new Date(),
      note: `User requested cancellation: ${reasonType || "Not specified"}`,
    });

    await order.save();

    return res.status(200).json({
      message: "Cancellation request submitted to admin",
      order,
    });
  } catch (error) {
    console.error("requestOrderCancellation error:", error);
    return res.status(500).json({
      message: "Internal server error while requesting cancellation",
      error: error.message,
    });
  }
};

// // --------------- ADMIN: GET ALL ORDERS ----------------
// const getAllOrdersAdmin = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email role")
//       .populate("vendor", "name email role")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       message: "All orders retrieved",
//       orders,
//     });
//   } catch (error) {
//     console.error("getAllOrdersAdmin error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // --------------- ADMIN: UPDATE STATUS ----------------
// const updateOrderStatusAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, note, estimatedCompletionAt } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid order ID" });
//     }
//     if (!status) {
//       return res.status(400).json({ message: "status is required" });
//     }

//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.status = status;
//     order.updatedAt = new Date();

//     if (estimatedCompletionAt) {
//       order.estimatedCompletionAt = new Date(estimatedCompletionAt);
//     }

//     order.statusHistory = order.statusHistory || [];
//     order.statusHistory.push({
//       status,
//       note: note || "",
//       updatedBy: req.user?._id || null,
//       updatedAt: new Date(),
//     });

//     await order.save();

//     const populated = await Order.findById(id)
//       .populate("user", "name email role")
//       .populate("vendor", "name email role");

//     return res.status(200).json({
//       message: "Order status updated",
//       order: populated,
//     });
//   } catch (error) {
//     console.error("updateOrderStatusAdmin error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // ADMIN: approve cancellation and delete order
// const adminCancelAndDeleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminNote } = req.body;

//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Optional: you could log cancellation info somewhere else before delete

//     // Log final status before deleting (for statusHistory if you keep it)
//     order.statusHistory = order.statusHistory || [];
//     order.statusHistory.push({
//       status: "cancelled",
//       updatedAt: new Date(),
//       note: adminNote || "Order cancelled by admin",
//     });

//     order.cancellation = {
//       ...(order.cancellation || {}),
//       status: "approved",
//       reviewedAt: new Date(),
//       reviewedBy: req.user._id,
//     };

//     await order.save();

//     // Now delete order from DB as per your requirement
//     await Order.findByIdAndDelete(order._id);

//     return res.status(200).json({
//       message: "Order cancelled and deleted successfully",
//     });
//   } catch (error) {
//     console.error("adminCancelAndDeleteOrder error:", error);
//     return res.status(500).json({
//       message: "Internal server error while cancelling order",
//       error: error.message,
//     });
//   }
// };


// --------------- ADMIN: ASSIGN VENDOR ----------------
const assignVendorAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { vendorId, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid vendor ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== "vendor") {
      return res.status(400).json({ message: "Selected user is not a vendor" });
    }

    order.vendor = vendorId;
    order.updatedAt = new Date();
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: order.status,
      note: note || `Vendor assigned: ${vendor.name}`,
      updatedBy: req.user?._id || null,
      updatedAt: new Date(),
    });

    await order.save();

    const populated = await Order.findById(id)
      .populate("user", "name email role")
      .populate("vendor", "name email role");

    return res.status(200).json({
      message: "Vendor assigned to order",
      order: populated,
    });
  } catch (error) {
    console.error("assignVendorAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// // --------------- ADMIN: GET VENDORS ----------------
// const getAllVendorsAdmin = async (req, res) => {
//   try {
//     const vendors = await User.find({ role: "vendor" }).select(
//       "name email role"
//     );
//     return res.status(200).json({
//       message: "Vendors retrieved",
//       vendors,
//     });
//   } catch (error) {
//     console.error("getAllVendorsAdmin error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
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
// };

// --------------- ADMIN: GET ALL ORDERS ----------------
const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("vendor", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All orders retrieved",
      orders,
    });
  } catch (error) {
    console.error("getAllOrdersAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- ADMIN: UPDATE STATUS ----------------
const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note, estimatedCompletionAt } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    order.updatedAt = new Date();

    if (estimatedCompletionAt) {
      order.estimatedCompletionAt = new Date(estimatedCompletionAt);
    }

    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status,
      note: note || "",
      updatedBy: req.user?._id || null,
      updatedAt: new Date(),
    });

    await order.save();

    const populated = await Order.findById(id)
      .populate("user", "name email role")
      .populate("vendor", "name email role");

    return res.status(200).json({
      message: "Order status updated",
      order: populated,
    });
  } catch (error) {
    console.error("updateOrderStatusAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- ADMIN: HARD DELETE ORDER + ALL CHATS ----------------
const deleteOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Remove ALL messages for this order so chat is fully wiped
    await OrderMessage.deleteMany({ order: id });

    // Finally delete the order itself
    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Order and all related chats deleted successfully",
    });
  } catch (error) {
    console.error("deleteOrderAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// ADMIN: approve cancellation and delete order (existing)
// const adminCancelAndDeleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { adminNote } = req.body;

//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.statusHistory = order.statusHistory || [];
//     order.statusHistory.push({
//       status: "cancelled",
//       updatedAt: new Date(),
//       note: adminNote || "Order cancelled by admin",
//     });

//     order.cancellation = {
//       ...(order.cancellation || {}),
//       requested: true,
//       status: "approved",
//       reviewedAt: new Date(),
//       reviewedBy: req.user._id,
//       reasonType: order.cancellation?.reasonType || "Admin",
//       reasonText:
//         order.cancellation?.reasonText || adminNote || "Order cancelled by admin",
//     };

//     await order.save();
//     await Order.findByIdAndDelete(order._id);

//     return res.status(200).json({
//       message: "Order cancelled and deleted successfully",
//     });
//   } catch (error) {
//     console.error("adminCancelAndDeleteOrder error:", error);
//     return res.status(500).json({
//       message: "Internal server error while cancelling order",
//       error: error.message,
//     });
//   }
// };

const adminCancelAndDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ just mark as cancelled – do not delete the document
    order.status = "cancelled";

    // status history
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: "cancelled",
      updatedAt: new Date(),
      note: adminNote || "Order cancelled by admin",
    });

    // cancellation info (merge with existing)
    order.cancellation = {
      ...(order.cancellation || {}),
      requested: true,
      status: "approved",
      reviewedAt: new Date(),
      reviewedBy: req.user._id,
      reasonType: order.cancellation?.reasonType || "Admin",
      reasonText:
        order.cancellation?.reasonText ||
        adminNote ||
        "Order cancelled by admin",
    };

    await order.save();

    const populated = await Order.findById(order._id)
      .populate("user", "name email role")
      .populate("vendor", "name email role");

    return res.status(200).json({
      message: "Order cancelled successfully",
      order: populated,
    });
  } catch (error) {
    console.error("adminCancelAndDeleteOrder error:", error);
    return res.status(500).json({
      message: "Internal server error while cancelling order",
      error: error.message,
    });
  }
};

// --------------- ADMIN: LIST PENDING CANCEL REQUESTS ----------------
const getCancelRequestsAdmin = async (req, res) => {
  try {
    const orders = await Order.find({
      "cancellation.requested": true,
      "cancellation.status": "pending",
    })
      .populate("user", "name email role")
      .populate("vendor", "name email role")
      .sort({ "cancellation.requestedAt": -1, createdAt: -1 });

    return res.status(200).json({
      message: "Pending cancellation requests",
      orders,
    });
  } catch (error) {
    console.error("getCancelRequestsAdmin error:", error);
    return res.status(500).json({
      message: "Internal server error while listing cancellation requests",
      error: error.message,
    });
  }
};

// --------------- ADMIN: APPROVE CANCELLATION (alias) ----------------
const adminApproveCancellation = async (req, res) => {
  // same behavior as adminCancelAndDeleteOrder, but on a more REST-y route
  return adminCancelAndDeleteOrder(req, res);
};

// --------------- ADMIN: REJECT CANCELLATION ----------------
const adminRejectCancellation = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      !order.cancellation?.requested ||
      order.cancellation.status !== "pending"
    ) {
      return res.status(400).json({
        message: "No pending cancellation request for this order",
      });
    }

    order.cancellation.status = "rejected";
    order.cancellation.reviewedAt = new Date();
    order.cancellation.reviewedBy = req.user._id;
    if (note) {
      order.cancellation.adminNote = note;
    }

    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status: order.status,
      updatedBy: req.user._id,
      updatedAt: new Date(),
      note: note || "Cancellation request rejected by admin",
    });

    await order.save();

    const populated = await Order.findById(id)
      .populate("user", "name email role")
      .populate("vendor", "name email role");

    return res.status(200).json({
      message: "Cancellation request rejected",
      order: populated,
    });
  } catch (error) {
    console.error("adminRejectCancellation error:", error);
    return res.status(500).json({
      message: "Internal server error while rejecting cancellation",
      error: error.message,
    });
  }
};

// --------------- ADMIN: GET VENDORS ----------------
const getAllVendorsAdmin = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" }).select(
      "name email role"
    );
    return res.status(200).json({
      message: "Vendors retrieved",
      vendors,
    });
  } catch (error) {
    console.error("getAllVendorsAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// const getOrderReviewsAdmin = async (req, res) => {
//   try {
//     const ordersWithReviews = await Order.find({
//       "review.comment": { $ne: "" },
//     })
//       .populate("user", "name email")
//       .sort({ "review.createdAt": -1, createdAt: -1 });

//     return res.status(200).json({
//       message: "Order reviews retrieved",
//       orders: ordersWithReviews,
//     });
//   } catch (error) {
//     console.error("getOrderReviewsAdmin error:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// --------------- ADMIN: GET ORDER REVIEWS OVERVIEW ----------------
const getOrderReviewsAdmin = async (req, res) => {
  try {
    // include all orders that have a review object (even if comment is empty)
    const ordersWithReviews = await Order.find({
      review: { $exists: true, $ne: null },
    })
      .populate("user", "name email")
      .sort({ "review.createdAt": -1 });

    return res.status(200).json({
      message: "Orders with reviews retrieved",
      orders: ordersWithReviews,
    });
  } catch (error) {
    console.error("getOrderReviewsAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



module.exports = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getOrderMessages,
  addOrderMessage,
  addOrderReview,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
  assignVendorAdmin,
  getAllVendorsAdmin,
  requestOrderCancellation,
  adminCancelAndDeleteOrder,
  getCancelRequestsAdmin,
  adminApproveCancellation,
  adminRejectCancellation,
  getOrderReviewsAdmin,
};
