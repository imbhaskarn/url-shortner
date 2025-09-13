const Dispute = require('../models/disputeModel');
const asyncHandler = require('express-async-handler');

// Create a dispute
const createDispute = asyncHandler(async (req, res) => {
  const { transactionId, reason, evidence } = req.body;

  const dispute = new Dispute({
    transaction: transactionId,
    reason,
    evidence
  });

  const savedDispute = await dispute.save();
  res.status(201).json(savedDispute);
});

// Get all disputes (admin)
const getDisputes = asyncHandler(async (req, res) => {
  const disputes = await Dispute.find().populate('transaction');
  res.json(disputes);
});

// Update dispute status (admin)
const updateDisputeStatus = asyncHandler(async (req, res) => {
  const dispute = await Dispute.findById(req.params.id);

  if (dispute) {
    dispute.status = req.body.status || dispute.status;
    const updatedDispute = await dispute.save();
    res.json(updatedDispute);
  } else {
    res.status(404);
    throw new Error('Dispute not found');
  }
});

module.exports = { createDispute, getDisputes, updateDisputeStatus };
