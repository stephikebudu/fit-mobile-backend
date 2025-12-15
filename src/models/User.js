const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: [true, "Email must be unique"],
    minLength: [5, "Email must have at least five characters"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    trim: true,
    minLength: [6, "Password must have at least six characters"],
    select: false,
  },
  phone: {
    type: String,
    required: [false],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "creator", "vendor"],
    default: "user",
    required: [true, "Role cannot be blank"],
  },
  firstName: {
    type: String,
    default: "",
    required: [true, "First name cannot be blank"],
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    default: "",
    required: [true, "Last name cannot be blank"],
    trim: true,
    minLength: 2,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    select: false,
  },
  verificationCodeValidation: {
    type: Number,
    select: false,
  },
  forgotPasswordCode: {
    type: String,
    select: false,
  },
  forgotPasswordCodeValidation: {
    type: Number,
    select: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);