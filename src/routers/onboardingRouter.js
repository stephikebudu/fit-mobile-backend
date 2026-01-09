const express = require("express");
const router = express.Router();
const onboardingController = require("../../src/controllers/onboardingController");
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");
const { validateSaveUserActivities } = require("../../src/middleware/onboardingAuth");

router.get("/", onboardingController.getActivitiesList);
router.patch("/", validateUserProfileUpdateAuth, validateSaveUserActivities, onboardingController.saveUserActivities);

module.exports = router;