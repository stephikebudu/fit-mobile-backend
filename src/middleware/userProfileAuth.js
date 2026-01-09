const jwt = require("jsonwebtoken");
const {
  updateUserProfileSchema,
  updateSocialLinksSchema,
  updateUserAddressSchema,
  updateBankDetailsSchema
} = require("../../src/middleware/validator.js");

exports.userProfileAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Cross-check Header for authorization key and value"
    })
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: payload.userId };
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: "Authorization failure: User not authorized!"
    });
  }
}

exports.validateUserProfileUpdate = (req, res, next) => {
  const { error } = updateUserProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
}

exports.validateUserProfileUpdateAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = {
      id: payload.id || payload.userId,
      socialLinks: payload.socialLinks,
    };
    next();
  } catch (error) {
    console.error("User Authorization Error:", error);
    res.status(401).json({
      success: false,
      message: "User not authorized"
    });
  }
}

exports.validateUserSocialLinks = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body is missing or empty"
    });
  }
  const { error } = updateSocialLinksSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
}

exports.validateUserAddressUpdate = (req, res, next) => {
  const { error } = updateUserAddressSchema.validate(req.body);
  if (error) {
    const messageInfo = error.details[0].type === "object.xor"
      ? "Provide either structured address in different fields OR a single address string, not both."
      : error.details[0].message;
    return res.status(400).json({
      success: false,
      message: messageInfo
    });
  }
  next();
}

exports.validateBankDetailsUpdate = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No bank details provided"
    });
  }

  const { error } = updateBankDetailsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
}