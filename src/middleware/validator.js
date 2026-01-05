const Joi = require("joi");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net", "org"] }
    }),
  password: Joi.string()
    .required()
    .pattern(passwordRegex)
    .message("Please create strong password"),
  firstName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/[A-Za-z]/)
    .required()
    .label("firstName"),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/[A-Za-z]/)
    .required()
    .label("lastName"),
  role: Joi.string()
    .required()
    .valid("user", "creator", "vendor")
    .default("user"),
});

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net", "org"] }
    }),
  password: Joi.string()
    .required()
    .pattern(passwordRegex),
});

exports.acceptedCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  providedCode: Joi.number().required()
});

exports.changePasswordSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .pattern(passwordRegex),
  oldPassword: Joi.string()
    .required()
    .pattern(passwordRegex),
});

exports.acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  providedCode: Joi.number().required(),
  newPassword: Joi.string()
    .required()
    .pattern(passwordRegex)
});

exports.updateUserProfileSchema = Joi.object({
  firstName: Joi.string().max(30).optional(),
  lastName: Joi.string().max(30).optional(),
  bio: Joi.string().max(200).allow("").optional(),
  birthdate: Joi.date().iso().optional(),
  gender: Joi.string().valid("Man", "Woman", "Rather not say").optional(),
  profileImage: Joi.string().optional(),
  coverImage: Joi.string().optional(),
});

exports.updateSocialLinksSchema = Joi.object({
  tiktok: Joi.string().allow("").max(100).optional(),
  instagram: Joi.string().allow("").max(100).optional(),
  facebook: Joi.string().allow("").max(100).optional(),
  snapchat: Joi.string().allow("").max(100).optional()
});