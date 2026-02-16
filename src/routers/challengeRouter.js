const express = require("express");
const router = express.Router();
const challengeController = require("../../src/controllers/challengeController");
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");
// const { leaderboardSchema, validateLeaderboardSchema } = require("../../src/middleware/validator");

router.get("/", validateUserProfileUpdateAuth, challengeController.getChallengesList);
router.get("/:challengeId", validateUserProfileUpdateAuth, challengeController.getChallengeDetails);
router.post("/:challengeId/join", validateUserProfileUpdateAuth, challengeController.joinChallenge);
router.get("/:challengeId/leaderboard", validateUserProfileUpdateAuth, challengeController.getChallengeLeaderboard);

module.exports = router;