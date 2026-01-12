const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetDistance: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: "km"
  },
  icon: {
    type: String,
    default: "flash_icon_url"
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  sponsor: {
    name: {
      type: String
    },
    logo: {
      type: String
    },
    reward: {
      type: String
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);