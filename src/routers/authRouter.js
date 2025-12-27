const express = require("express");
const authController = require("../../src/controllers/authController");
const { identifier } = require("../../src/middleware/identification");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", identifier, authController.signout);

router.patch("/send-verification-code", identifier, authController.sendVerificationCode);
router.patch("/verify-verification-code", identifier, authController.verifyVerificationCode);

module.exports = router;