const express = require("express");
const router = express.Router();
const challengeController = require("../../src/controllers/challengeController");
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");

router.get("/", validateUserProfileUpdateAuth, challengeController.getChallengesList);

module.exports = router;