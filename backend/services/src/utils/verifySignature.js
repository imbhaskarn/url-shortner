const crypto = require('crypto');

// Verify the webhook signature to ensure it came from the payment provider
function verifyWebhookSignature(signature, payload) {
  const secret = process.env.WEBHOOK_SECRET;  // Store your webhook secret in an environment variable
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return expectedSignature === signature;
}

module.exports = { verifyWebhookSignature };
