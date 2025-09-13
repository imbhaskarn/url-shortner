// models/UsageRecord.js
const mongoose = require('mongoose');

const usageRecordSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Assuming you have a Customer model
    required: true
  },
  metric: {
    type: String,
    required: true,
    enum: ['inference', 'api_calls', 'storage'] // you can expand
  },
  units: {
    type: Number,
    required: true,
    min: 0
  },
  billed: {
    type: Boolean,
    default: false
  },
  billingCycleStart: {
    type: Date,
    required: true
  },
  billingCycleEnd: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('UsageRecord', usageRecordSchema);
