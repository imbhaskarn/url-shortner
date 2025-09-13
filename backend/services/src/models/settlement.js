const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const SettlementSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: 'MerchantProfile' },
  amount: Number,
  settlementDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['settled', 'pending'], default: 'pending' },
  payoutId: { type: Schema.Types.ObjectId, ref: 'Payout' },
});


module.exports = mongoose.model('Settlement', SettlementSchema );
