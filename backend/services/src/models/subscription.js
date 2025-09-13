// models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: { type: String, enum: ['active', 'trial', 'canceled'], default: 'trial' },
  trialEnd: { type: Date },
  declines: { type: Number, default: 0 },
  canceledAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
