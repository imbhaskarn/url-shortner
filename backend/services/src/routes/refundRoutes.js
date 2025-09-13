const express = require('express');
const {
  createRefund,
  getRefunds,
  getRefundById,
  updateRefundStatus,
} = require('../controllers/refundController');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createRefund)          // Create a refund
  .get(protect, admin, getRefunds);     // Admin can get all refunds

router.route('/:id')
  .get(protect, getRefundById)          // Get a single refund by ID
  .put(protect, admin, updateRefundStatus); // Admin can update refund status

module.exports = router;
