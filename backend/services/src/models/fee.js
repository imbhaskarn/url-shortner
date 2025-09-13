const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const FeeSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: 'MerchantProfile' },
  transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  feeType: { type: String, enum: ['platform', 'interchange'], default: 'platform' },
  percentage: Number,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('fee', FeeSchema);
