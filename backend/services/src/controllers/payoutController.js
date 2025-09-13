const Payout = require('../models/payout');
const Merchant = require('../models/merchantProfile');

async function processPayout(req, res) {
  try {
    const merchantId = req.params.merchantId;

    // Find pending payouts for the merchant
    const payouts = await Payout.find({ merchant: merchantId, status: 'pending' });

    if (payouts.length === 0) {
      return res.status(404).json({ message: "No pending payouts" });
    }

    // Mark payouts as processed
    payouts.forEach(async (payout) => {
      payout.status = 'processed';
      await payout.save();
    });

    return res.status(200).json({ message: `Payouts processed for merchant ${merchantId}`, payouts });
  } catch (error) {
    console.error('Payout processing error:', error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: 'Error processing payouts' });
  }
}

module.exports = { processPayout };
