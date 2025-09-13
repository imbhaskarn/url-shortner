// models/FailedPayment.js
const mongoose = require('mongoose');

const FailedPaymentSchema = new mongoose.Schema({
  subscriptionId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  failedCount: { type: Number, default: 0 },
  lastFailedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FailedPayment', FailedPaymentSchema);
