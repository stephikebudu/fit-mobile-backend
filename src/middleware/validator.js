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