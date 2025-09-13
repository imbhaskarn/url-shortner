// Process the incoming webhook event
async function processWebhookEvent(event) {
  const { type, data } = event;

  switch (type) {
    case 'payment.success':
      // Handle successful payment
      return await handlePaymentSuccess(data);

    case 'payment.failed':
      // Handle failed payment
      return await handlePaymentFailure(data);

    case 'payout.completed':
      // Handle completed payout
      return await handlePayoutCompleted(data);

    case 'chargeback.initiated':
      // Handle chargeback initiation
      return await handleChargebackInitiated(data);

    default:
      console.log(`Unhandled event type: ${type}`);
      return { message: `Unhandled event type: ${type}` };
  }
}

async function handlePaymentSuccess(data) {
  // Example: Update order/payment status in the database
  // You can extract details from `data` like transaction ID, amount, etc.
  console.log(`Payment successful for transaction ${data.transactionId}`);
  // Update database, notify merchant, etc.
  return { message: `Payment success processed for ${data.transactionId}` };
}

async function handlePaymentFailure(data) {
  console.log(`Payment failed for transaction ${data.transactionId}`);
  // Handle payment failure, update status in DB
  return { message: `Payment failure processed for ${data.transactionId}` };
}

async function handlePayoutCompleted(data) {
  console.log(`Payout completed for merchant ${data.merchantId}`);
  // Handle payout completion, update merchant's balance, etc.
  return { message: `Payout completion processed for merchant ${data.merchantId}` };
}

async function handleChargebackInitiated(data) {
  console.log(`Chargeback initiated for transaction ${data.transactionId}`);
  // Handle chargeback initiation, notify merchant, etc.
  return { message: `Chargeback initiated for ${data.transactionId}` };
}

module.exports = { processWebhookEvent };
