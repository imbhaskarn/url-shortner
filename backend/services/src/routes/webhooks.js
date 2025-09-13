// routes/webhooks.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = 'new Stripe(process.env.STRIPE_SECRET_KEY);'
const FailedPayment = require('../models/failedPayment');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle failed payment
    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;
      const customerId = invoice.customer;

      let record = await FailedPayment.findOne({ subscriptionId });

      if (!record) {
        record = new FailedPayment({ subscriptionId, customerId, failedCount: 1 });
      } else {
        record.failedCount += 1;
        record.lastFailedAt = new Date();
      }

      await record.save();
      console.log(`Failed payment recorded for ${subscriptionId} (Count: ${record.failedCount})`);

      if (record.failedCount >= 3) {
        console.log(`Auto-cancelling subscription ${subscriptionId} due to repeated failures`);
        await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
      }
    }

    // Handle successful payment — reset counter
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      await FailedPayment.deleteOne({ subscriptionId });
      console.log(`Reset failed payment count for ${subscriptionId}`);
    }

    res.status(200).send('Webhook processed');
  } catch (err) {
    console.error('Error processing webhook event:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
