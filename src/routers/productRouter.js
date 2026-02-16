const express = require("express");
const productController = require("../../src/controllers/productController");
const { validateUserProfileUpdateAuth } = require("../../src/middleware/userProfileAuth");
const router = express.Router();

router.get("/", validateUserProfileUpdateAuth, productController.getProducts);

module.exports = router;