const mongoose = require('mongoose');

const paymentMethodSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['card', 'bank_transfer'],
    required: true
  },
  type: {
    type: String,
    enum: ['card', 'bank_transfer'],
    required: true
  },
  cardNumber: String, // Stored as masked: "**** **** **** 1234"
  cardHolder: String,
  expiryMonth: Number,
  expiryYear: Number,
  bankName: String,
  accountNumber: String, // Stored as masked: "****7890"
  accountName: String,
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);