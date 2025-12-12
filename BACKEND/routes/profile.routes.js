const express = require("express");
const {
  getMyProfile,
  requestProfileUpdate,
  verifyProfileUpdate,
} = require("../controller/profile.controller");
const { authenticatedUser } = require("../middleware/authUser");

const profilerouter = express.Router();

profilerouter.get("/me", authenticatedUser, getMyProfile);
profilerouter.put("/request-update", authenticatedUser, requestProfileUpdate);
profilerouter.post("/verify-update", authenticatedUser, verifyProfileUpdate);

module.exports = profilerouter;
