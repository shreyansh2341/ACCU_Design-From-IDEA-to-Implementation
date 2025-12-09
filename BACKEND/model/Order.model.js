const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    public_id: String,
    url: String,
    originalName: String,
    mimeType: String,
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    ratingManufacturing: Number,
    ratingDelivery: Number,
    ratingHandling: Number,
    comment: String,
    media: {
      url: String,
      public_id: String,
      format: String,
      mimeType: String,
      originalName: String,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    deliveryAddress: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "requested",
        "received",
        "reviewed_by_vendor",
        "in_production",
        "completed",
        "out_for_delivery",
        "cancelled",
        "cancel_requested",
        "cancelled"
      ],
      default: "requested",
    },

    assignedVendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    cancellation: {
      requested: { type: Boolean, default: false },
      reasonType: { type: String, default: "" },
      reasonText: { type: String, default: "" },
      requestedAt: { type: Date },
      requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "none"],
        default: "none",
      },
      reviewedAt: { type: Date },
      reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },

    statusHistory: [
      {
        status: String,
        updatedAt: { type: Date, default: Date.now },
        note: String,
      },
    ],
    statusHistory: [statusHistorySchema],
    estimatedCompletionAt: {
      type: Date,
    },
    files: [fileSchema],
    review: reviewSchema,
  },

  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
