const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const MerchantProfile = require('../models/MerchantProfile');



// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { userId, merchantId, amount, cardToken, transactionType } = req.body;

  const transaction = new Transaction({
    user: userId,
    merchant: merchantId,
    amount,
    cardToken,
    transactionType,
  });

  const savedTransaction = await transaction.save();
  res.status(201).json({ success: true, transaction: savedTransaction });
});

// Get a transaction by ID
const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)
    .populate('user', 'name email')
    .populate('merchant', 'businessName');

  if (!transaction) {
    return res.status(404).json({ success: false, message: 'Transaction not found' });
  }

  res.json({ success: true, transaction });
});

// Update a transaction status
const updateTransactionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return res.status(404).json({ success: false, message: 'Transaction not found' });
  }

  transaction.status = status;
  await transaction.save();
  res.json({ success: true, message: 'Transaction status updated', transaction });
});

// Get all transactions for a user
const getUserTransactions = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const transactions = await Transaction.find({ user: userId });

  res.json({ success: true, transactions });
});
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find()
    .populate('user', 'name email')
    .populate('merchant', 'businessName');

  res.json({ success: true, transactions });
});

// Delete a transaction
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ success: false, message: 'Transaction not found' });
  }

  await transaction.remove();
  res.json({ success: true, message: 'Transaction deleted' });
});

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
  getUserTransactions,
  deleteTransaction,
  getAllTransactions,
};
