const User = require("../model/user.model");

// ---------- GET ALL USERS ----------
const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email role isActive createdAt photo"
    );
    return res.status(200).json({
      message: "Users retrieved",
      users,
    });
  } catch (error) {
    console.error("getAllUsersAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ---------- UPDATE USER ROLE ----------
const updateUserRoleAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["user", "vendor", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("name email role isActive");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User role updated",
      user,
    });
  } catch (error) {
    console.error("updateUserRoleAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ---------- TOGGLE ACTIVE / INACTIVE ----------
const toggleUserActiveAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("name email role isActive");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    return res.status(200).json({
      message: `User is now ${user.isActive ? "active" : "inactive"}`,
      user,
    });
  } catch (error) {
    console.error("toggleUserActiveAdmin error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsersAdmin,
  updateUserRoleAdmin,
  toggleUserActiveAdmin,
};
