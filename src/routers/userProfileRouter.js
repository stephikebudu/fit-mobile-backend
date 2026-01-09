const express = require("express");
const userProfileController = require("../../src/controllers/userProfileController");
const {
  userProfileAuth,
  validateUserProfileUpdateAuth,
  validateUserProfileUpdate,
  validateUserSocialLinks,
  validateUserAddressUpdate,
  validateBankDetailsUpdate
} = require("../../src/middleware/userProfileAuth");
const router = express.Router();

router.get("/profile", userProfileAuth, userProfileController.getUserProfile);
router.patch("/profile/update", validateUserProfileUpdateAuth, validateUserProfileUpdate, userProfileController.updateUserProfile);
router.patch("/profile/social-links", validateUserProfileUpdateAuth, validateUserSocialLinks, userProfileController.updateUserSocialLinks);
router.patch("/profile/address", validateUserProfileUpdateAuth, validateUserAddressUpdate, userProfileController.updateUserAddress);
router.patch("/profile/bank-details", validateUserProfileUpdateAuth, validateBankDetailsUpdate, userProfileController.updateUserBankDetails);

module.exports = router;