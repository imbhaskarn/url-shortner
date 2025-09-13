const Chargeback = require('../models/chargebackModel');
const asyncHandler = require('express-async-handler');

// Create a chargeback
const createChargeback = asyncHandler(async (req, res) => {
  const { transactionId, reason } = req.body;

  const chargeback = new Chargeback({
    transaction: transactionId,
    reason
  });

  const savedChargeback = await chargeback.save();
  res.status(201).json(savedChargeback);
});

// Get all chargebacks
const getChargebacks = asyncHandler(async (req, res) => {
  const chargebacks = await Chargeback.find().populate('transaction');
  res.json(chargebacks);
});

// Update chargeback status (admin)
const updateChargebackStatus = asyncHandler(async (req, res) => {
  const chargeback = await Chargeback.findById(req.params.id);

  if (chargeback) {
    chargeback.status = req.body.status || chargeback.status;
    const updatedChargeback = await chargeback.save();
    res.json(updatedChargeback);
  } else {
    res.status(404);
    throw new Error('Chargeback not found');
  }
});

module.exports = { createChargeback, getChargebacks, updateChargebackStatus };
