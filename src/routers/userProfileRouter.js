const express = require("express");
const userProfileController = require("../../src/controllers/userProfileController");
const userProfileAuth = require("../../src/middleware/userProfileAuth");
const router = express.Router();

router.get("/profile", userProfileAuth, userProfileController.getUserProfile)

module.exports = router;