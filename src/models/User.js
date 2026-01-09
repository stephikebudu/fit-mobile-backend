const mongoose = require("mongoose");

// TODO: Add birthdate, coverImage fields
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
  username: {
    type: String,
    default: `user${Math.floor((Math.random() * 10000))}`
  },
  gender: {
    type: String,
    enum: ["Man", "Woman", "Rather not say"],
    default: "Rather not say",
  },
  bio: {
    type: String,
    default: "",
  },
  address: {
    country: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    shopAddress: {
      type: String,
      default: "",
    },
    landmark: {
      type: String,
      default: "",
    },
  },
  bankDetails: {
    accountNumber: {
      type: String,
      minLength: 8,
      maxLength: 12,
    },
    accountName: {
      type: String,
      default: ""
    },
    bankName: {
      type: String,
      default: ""
    }
  },
  profileImage: {
    type: String,
    default: "",
  },
  socialLinks: {
    tiktok: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    snapchat: {
      type: String,
      default: "",
    },
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
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);