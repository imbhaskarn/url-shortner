// routes/usage.js
const express = require('express');
const router = express.Router();
const UsageRecord = require('../models/usageRecord');

// POST /api/usage - Record a new usage entry
router.post('/', async (req, res) => {
  try {
    const { customerId, metric, units, billingCycleStart, billingCycleEnd } = req.body;

    if (!customerId || !metric || !units || !billingCycleStart || !billingCycleEnd) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const usage = new UsageRecord({
      customerId,
      metric,
      units,
      billingCycleStart: new Date(billingCycleStart),
      billingCycleEnd: new Date(billingCycleEnd)
    });

    await usage.save();
    res.status(201).json({ message: 'Usage recorded successfully', usage });

  } catch (err) {
    console.error('Error recording usage:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/usage/:customerId - Get all usage records for a customer
router.get('/:customerId', async (req, res) => {
  try {
    const usageRecords = await UsageRecord.find({ customerId: req.params.customerId });
    res.json(usageRecords);
  } catch (err) {
    console.error('Error fetching usage:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
