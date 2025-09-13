const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const disputeSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: ['fraud', 'product not received', 'service not provided', 'other'], // Enum of potential reasons for disputes
  },
  status: {
    type: String,
    enum: ['pending', 'resolved', 'rejected'],
    default: 'pending'
  },
  evidence: {
    type: String, // URL or file path of the evidence provided by the user
  },
  resolutionMessage: {
    type: String, // Used by admins to provide feedback or resolution details
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date, // Tracks when the dispute was resolved
  },
}, { timestamps: true });

const Dispute = mongoose.model('Dispute', disputeSchema);

module.exports = Dispute;
