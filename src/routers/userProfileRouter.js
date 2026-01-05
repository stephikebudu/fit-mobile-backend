const express = require("express");
const userProfileController = require("../../src/controllers/userProfileController");
const { userProfileAuth, validateUserProfileUpdate, validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");
const router = express.Router();

router.get("/profile", userProfileAuth, userProfileController.getUserProfile);
router.patch("/profile/update", validateUserProfileUpdateAuth, validateUserProfileUpdate, userProfileController.updateUserProfile);

module.exports = router;