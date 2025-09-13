const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Optional for guests
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true }, // Link to main merchant account
  amount: { type: Number, required: true },
  currency: { 
    type: String, 
    enum: ['USD', 'EUR', 'EGP', 'GBP'], // Add more as needed
    default: 'USD' 
  },
  cardToken: { type: String }, // Tokenized card info (never raw PANs!)
  status: { 
    type: String, 
    enum: ['success', 'failed', 'pending'], 
    default: 'pending' 
  },
  transactionType: { 
    type: String, 
    enum: ['charge', 'refund'], 
    default: 'charge' 
  },
  description: { type: String, trim: true },
  metadata: { type: Schema.Types.Mixed }, // Flexible for extra info
  parentTransaction: { type: Schema.Types.ObjectId, ref: 'Transaction', default: null }, // For refunds
}, { timestamps: true }); // Adds createdAt + updatedAt

// Index for faster merchant + status queries (payouts, dashboards, etc.)
TransactionSchema.index({ merchant: 1, status: 1 });

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
