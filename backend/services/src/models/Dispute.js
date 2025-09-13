const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const DisputeSchema = new Schema({
  transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  status: { type: String, enum: ['open', 'closed', 'in_review'], default: 'open' },
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});




const Dispute = mongoose.model("Dispute", DisputeSchema);

module.exports = Dispute;


