const express = require("express");
const router = express.Router();
const challengeController = require("../../src/controllers/challengeController");
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");

router.get("/", validateUserProfileUpdateAuth, challengeController.getChallengesList);
router.get("/:challengeId", validateUserProfileUpdateAuth, challengeController.getChallengeDetails);
router.post("/:challengeId/join", validateUserProfileUpdateAuth, challengeController.joinChallenge);

module.exports = router;