const express = require("express");
const {
  getAllUsersAdmin,
  updateUserRoleAdmin,
  toggleUserActiveAdmin,
} = require("../controller/adminUser.controller");

const { authenticatedUser, isAdmin } = require("../middleware/authUser");

const adminUserRouter = express.Router();

adminUserRouter.get(
  "/users",
  authenticatedUser,
  isAdmin("admin"),
  getAllUsersAdmin
);

adminUserRouter.patch(
  "/users/:id/role",
  authenticatedUser,
  isAdmin("admin"),
  updateUserRoleAdmin
);

adminUserRouter.patch(
  "/users/:id/toggle-active",
  authenticatedUser,
  isAdmin("admin"),
  toggleUserActiveAdmin
);

module.exports = adminUserRouter;
