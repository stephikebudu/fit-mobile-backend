const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity"
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number // in minutes
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);