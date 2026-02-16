const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendorName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ["GEARS", "SUPPLEMENTS", "PLANS"],
    required: true
  },
  images: [{ type: String }],
  availableSizes: [{ type: String }],
  availableColors: [{ type: String }],
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now }
});

productSchema.index({
  name: "text",
  description: "text"
});

module.exports = mongoose.model("Product", productSchema);