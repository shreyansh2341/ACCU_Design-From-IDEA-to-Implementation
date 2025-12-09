// controller/profile.controller.js

const User = require("../model/user.model");
const Order = require("../model/Order.model");
const {
  generateOTP,
  getOTPExpiry,
  sendOTPEmail,
  verifyOTP,
} = require("../utils/otpUtils");

// GET /api/profile/me
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "-password -profileOtp -profileOtpExpiry -pendingProfileUpdate"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Basic order stats
    const [totalOrders, completedOrders, activeOrders, cancelledOrders] =
      await Promise.all([
        Order.countDocuments({ user: userId }),
        Order.countDocuments({ user: userId, status: "completed" }),
        Order.countDocuments({
          user: userId,
          status: { $nin: ["completed", "cancelled"] },
        }),
        Order.countDocuments({ user: userId, status: "cancelled" }),
      ]);

    return res.status(200).json({
      user,
      stats: {
        totalOrders,
        completedOrders,
        activeOrders,
        cancelledOrders,
      },
    });
  } catch (error) {
    console.error("getMyProfile error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// PUT /api/profile/request-update
exports.requestProfileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      email,
      phone,
      companyName,
      companyAddress,
      socials = {},
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build pending update object
    user.pendingProfileUpdate = {
      name: name ?? user.name,
      email: email ?? user.email,
      phone: phone ?? user.phone,
      companyName: companyName ?? user.companyName,
      companyAddress: companyAddress ?? user.companyAddress,
      socials: {
        facebook: socials.facebook ?? user.socials?.facebook ?? "",
        instagram: socials.instagram ?? user.socials?.instagram ?? "",
        linkedin: socials.linkedin ?? user.socials?.linkedin ?? "",
        website: socials.website ?? user.socials?.website ?? "",
      },
    };

    const otp = generateOTP();
    user.profileOtp = otp;
    user.profileOtpExpiry = getOTPExpiry();

    await user.save();

    // Send OTP to (new) email if provided, else current
    const targetEmail = email || user.email;
    await sendOTPEmail(targetEmail, user.name || "User", otp);

    return res.status(200).json({
      message: `OTP sent to ${targetEmail}. Please verify to apply changes.`,
    });
  } catch (error) {
    console.error("requestProfileUpdate error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// POST /api/profile/verify-update
exports.verifyProfileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const user = await User.findById(userId);
    if (!user || !user.pendingProfileUpdate) {
      return res
        .status(400)
        .json({ message: "No pending profile update found" });
    }

    const isValid = verifyOTP(otp, user.profileOtp, user.profileOtpExpiry);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Apply pending changes
    const pending = user.pendingProfileUpdate;

    user.name = pending.name;
    user.email = pending.email;
    user.phone = pending.phone;
    user.companyName = pending.companyName;
    user.companyAddress = pending.companyAddress;
    user.socials = pending.socials;

    // Clear OTP + pending
    user.profileOtp = undefined;
    user.profileOtpExpiry = undefined;
    user.pendingProfileUpdate = undefined;

    await user.save();

    const cleanUser = await User.findById(userId).select(
      "-password -profileOtp -profileOtpExpiry -pendingProfileUpdate"
    );

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: cleanUser });
  } catch (error) {
    console.error("verifyProfileUpdate error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
