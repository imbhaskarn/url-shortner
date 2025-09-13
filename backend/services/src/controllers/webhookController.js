const { processWebhookEvent } = require('../services/webhookService');
const { verifyWebhookSignature } = require('../utils/verifySignature');

async function handleWebhook(req, res) {
  try {
    const event = req.body;
    const signature = req.headers['x-webhook-signature']; // The signature provided by the webhook

    // Verify the webhook signature using the secret key (stored in your environment)
    const secretKey = process.env.WEBHOOK_SECRET;
    if (!verifyWebhookSignature(signature, event, secretKey)) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    // Process the webhook event
    const result = await processWebhookEvent(event);

    // Respond with 200 OK
    return res.status(200).json({ message: 'Webhook received and processed', result });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleWebhook };
