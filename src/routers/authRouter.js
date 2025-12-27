const express = require("express");
const authController = require("../../src/controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

router.patch("/verify-reset-code", authController.sendVerificationCode);
module.exports = router;