const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const transactionLogSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  merchantId: { type: String, required: true },
  superMerchantId: { type: String, required: true },
  bankResponse: {
    status: { type: String, required: true },
    message: { type: String, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

const TransactionLog = mongoose.model("TransactionLog", transactionLogSchema);

module.exports = TransactionLog;
