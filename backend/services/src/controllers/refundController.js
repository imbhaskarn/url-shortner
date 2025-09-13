const Refund = require('../models/refundModel');
const Transaction = require('../models/transaction');

// Create a new refund
const createRefund = async (req, res) => {
  const { transactionId, amount, reason } = req.body;

  try {
    // Check if the transaction exists
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Ensure refund amount doesn't exceed the transaction amount
    if (amount > transaction.amount) {
      return res.status(400).json({ message: 'Refund amount exceeds transaction amount' });
    }

    // Create the refund
    const refund = await Refund.create({
      transaction: transactionId,
      amount,
      reason,
      status: 'pending',
    });

    // Update the transaction status if full refund
    if (refund.amount === transaction.amount) {
      transaction.status = 'refunded';
    }
    await transaction.save();

    res.status(201).json({ message: 'Refund created successfully', refund });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all refunds (Admin access)
const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().populate('transaction').sort({ createdAt: -1 });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single refund by ID
const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id).populate('transaction');

    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update refund status (Admin access)
const updateRefundStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const refund = await Refund.findById(req.params.id);

    if (!refund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    refund.status = status;
    refund.updatedAt = Date.now();
    await refund.save();

    res.status(200).json({ message: 'Refund status updated successfully', refund });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createRefund,
  getRefunds,
  getRefundById,
  updateRefundStatus,
};
