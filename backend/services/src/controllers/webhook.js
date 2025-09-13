const express = require('express');
const router = express.Router();

/
router.post('/webhook', async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data);
      // Handle successful payment
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data);
      // Handle failed payment
      break;
    // Add other event types as needed
    default:
      console.warn(`Unhandled event type: ${event.type}`);
      break;
  }

  res.status(200).send('Webhook received');
});

module.exports = router;
