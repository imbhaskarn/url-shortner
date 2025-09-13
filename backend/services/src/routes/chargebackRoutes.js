const express = require('express');
const { createChargeback, getChargebacks, updateChargebackStatus } = require('../controllers/chargebackController');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createChargeback)    // Users can create chargebacks
  .get(protect, admin, getChargebacks); // Admin can view all chargebacks

router.route('/:id')
  .put(protect, admin, updateChargebackStatus); // Admin can update chargeback status

module.exports = router;
