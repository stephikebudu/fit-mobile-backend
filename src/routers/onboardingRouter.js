const express = require("express");
const router = express.Router();
const onboardingController = require("../../src/controllers/onboardingController");

router.get("/", onboardingController.getActivitiesList);

module.exports = router;