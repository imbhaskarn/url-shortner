const mongoose = require('mongoose');
const { Schema } = mongoose;

const PayoutSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant' }, // Link to main merchant account
  amount: { type: Number, required: true },
  payoutDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'processed'], default: 'pending' },
  transactionIds: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payout', PayoutSchema);
