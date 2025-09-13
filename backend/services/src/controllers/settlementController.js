const Settlement = require("../models/Settlement");
const MerchantProfile = require("../models/MerchantProfile");
const Payout = require("../models/Payout");

// Create a new settlement
async function createSettlement(req, res) {
  try {
    const { merchantId, amount, payoutId } = req.body;

    if (!merchantId || !amount) {
      return res.status(400).json({ error: "MERCHANT_ID_AND_AMOUNT_REQUIRED", message: "Merchant ID and amount are required." });
    }

    const newSettlement = new Settlement({
      merchant: merchantId,
      amount,
      payoutId: payoutId || null,
    });

    await newSettlement.save();
    res.status(201).json({ success: true, message: "Settlement created successfully.", settlement: newSettlement });
  } catch (error) {
    console.error("Error creating settlement:", error);
    res.status(500).json({ error: "SETTLEMENT_CREATION_FAILED", message: "Failed to create settlement." });
  }
}

// Get all settlements
async function getAllSettlements(req, res) {
  try {
    const settlements = await Settlement.find()
      .populate("merchant", "name") // Adjust to match your MerchantProfile fields
      .populate("payoutId");

    res.status(200).json({ success: true, settlements });
  } catch (error) {
    console.error("Error fetching settlements:", error);
    res.status(500).json({ error: "FETCH_SETTLEMENTS_FAILED", message: "Failed to fetch settlements." });
  }
}

// Update settlement status
async function updateSettlementStatus(req, res) {
  try {
    const { settlementId } = req.params;
    const { status } = req.body;

    if (!["settled", "pending"].includes(status)) {
      return res.status(400).json({ error: "INVALID_STATUS", message: "Status must be 'settled' or 'pending'." });
    }

    const settlement = await Settlement.findByIdAndUpdate(
      settlementId,
      { status },
      { new: true }
    );

    if (!settlement) {
      return res.status(404).json({ error: "SETTLEMENT_NOT_FOUND", message: "Settlement not found." });
    }

    res.status(200).json({ success: true, message: "Settlement status updated.", settlement });
  } catch (error) {
    console.error("Error updating settlement status:", error);
    res.status(500).json({ error: "UPDATE_STATUS_FAILED", message: "Failed to update settlement status." });
  }
}

// Get a settlement by ID
async function getSettlementById(req, res) {
  try {
    const { settlementId } = req.params;

    const settlement = await Settlement.findById(settlementId)
      .populate("merchant", "name") // Adjust to match your MerchantProfile fields
      .populate("payoutId");

    if (!settlement) {
      return res.status(404).json({ error: "SETTLEMENT_NOT_FOUND", message: "Settlement not found." });
    }

    res.status(200).json({ success: true, settlement });
  } catch (error) {
    console.error("Error fetching settlement:", error);
    res.status(500).json({ error: "FETCH_SETTLEMENT_FAILED", message: "Failed to fetch settlement." });
  }
}

module.exports = {
  createSettlement,
  getAllSettlements,
  updateSettlementStatus,
  getSettlementById,
};

