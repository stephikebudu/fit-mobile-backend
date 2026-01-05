const express = require("express");
const userProfileController = require("../../src/controllers/userProfileController");
const {
  userProfileAuth,
  validateUserProfileUpdateAuth,
  validateUserProfileUpdate,
  validateUserSocialLinks
} = require("../../src/middleware/userProfileAuth");
const router = express.Router();

router.get("/profile", userProfileAuth, userProfileController.getUserProfile);
router.patch("/profile/update", validateUserProfileUpdateAuth, validateUserProfileUpdate, userProfileController.updateUserProfile);
router.patch("/profile/social-links", validateUserProfileUpdateAuth, validateUserSocialLinks, userProfileController.updateUserSocialLinks);

module.exports = router;