const Joi = require("joi");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const accountNumberRegex = /^[0-9]+$/;
const activityIdRegex = /^[0-9a-fA-F]{24}$/;

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

exports.updateUserAddressSchema = Joi.object({
  country: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  shopAddress: Joi.string().allow("").optional(),
  landmark: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional()
}).xor("country", "address");

exports.updateBankDetailsSchema = Joi.object({
  accountType: Joi.string().max(20).optional().messages({
    "string.base": "Account type must be a string"
  }),
  bankName: Joi.string().max(50).optional(),
  accountNumber: Joi.string().pattern(accountNumberRegex).min(8).max(12).optional().messages({
    "string.pattern.base": "Account number must only contain digits",
    "string.min": "Account number is too short",
    "string.max": "Account number is too long"
  }),
  accountName: Joi.string().max(100).optional()
});

exports.saveUserActivitiesSchema = Joi.object({
  activityIds: Joi.array()
    .items(Joi.string().regex(activityIdRegex).message("Invalid activity id format"))
    .min(1)
    .required()
    .messages({
      "array.min": "Please select at least one activity",
      "any.required": "activityIds field is required"
    })
});