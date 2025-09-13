const express = require('express');
const { createDispute, getDisputes, updateDisputeStatus } = require('../controllers/disputeController');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createDispute)    // Users can create disputes
  .get(protect, admin, getDisputes); // Admin can view all disputes

router.route('/:id')
  .put(protect, admin, updateDisputeStatus); // Admin can update dispute status

module.exports = router;
