const express = require("express");
const router = express.Router();
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");
const paymentMethodController = require("../../src/controllers/paymentMethodController");

router.get("/", validateUserProfileUpdateAuth, paymentMethodController.getPaymentMethodsList);

module.exports = router;
