// routes/billing.js
const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// POST /api/billing/record-decline
// Record a declined payment attempt for a subscription
router.post('/record-decline', async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: 'Missing subscriptionId' });
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    subscription.declines = (subscription.declines || 0) + 1;

    // Cancel subscription after 3 failed attempts
    if (subscription.declines >= 3) {
      subscription.status = 'canceled';
      subscription.canceledAt = new Date();
    }

    await subscription.save();

    res.json({
      message: 'Decline recorded',
      subscription
    });

  } catch (err) {
    console.error('Error recording decline:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/billing/trial-status/:subscriptionId
// Check if a subscription is still in trial
router.get('/trial-status/:subscriptionId', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    const now = new Date();
    const inTrial = subscription.trialEnd && now < subscription.trialEnd;

    res.json({
      inTrial,
      trialEnds: subscription.trialEnd
    });

  } catch (err) {
    console.error('Error checking trial status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
