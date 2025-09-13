const { validateCard } = require('./cardValidator');
const { tokenize } = require('./tokenization');
const { authenticateCard } = require('./authenticateCard');

async function processPayment(req, res) {
    const {
        paymentMethod,
        amount,
        description,
        metadata,
        payerName,
        payerEmail,
        currency = "USD"
    } = req.body;

    try {
        // Merchant is already verified by middleware
        const merchant = req.merchantProfile;

        // Validate required fields
        if (!amount?.value || !paymentMethod?.card) {
            return res.status(400).json({ error: "MISSING_FIELDS", message: "Missing required payment details." });
        }

        // Validate card
        const validationResponse = validateCard(paymentMethod.card);
        if (!validationResponse.isValid) {
            return res.status(400).json({ error: "INVALID_CARD", message: validationResponse.message });
        }

        // Tokenize & authenticate
        const tokenData = await tokenize(paymentMethod.card);
        const authResponse = await authenticateCard(paymentMethod.card);
        if (!authResponse.success) {
            return res.status(400).json({ error: "AUTHENTICATION_FAILED", message: "Card authentication failed" });
        }

        // Process charge
        const chargeResponse = await processCharge({
            cardToken: tokenData.token,
            amount: amount.value,
            currency,
            cardType: validationResponse.cardType,
        });
        if (chargeResponse.status !== "success") {
            return res.status(400).json({ error: "CHARGE_FAILED", message: chargeResponse.message });
        }

        // Record transaction
        const transaction = await Transaction.create({
            user: req.user ? req.user._id : null,
            merchant: merchant._id,
            amount: amount.value,
            cardToken: tokenData.token,
            status: chargeResponse.status,
            transactionType: 'charge',
            description,
            metadata,
        });

        // Calculate payout
        const platformFee = (amount.value * 2.9) / 100 + 0.30;
        const merchantAmount = amount.value - platformFee;
        const payout = await Payout.create({
            merchant: merchant._id,
            amount: merchantAmount,
            payoutDate: new Date(),
            status: 'pending',
            transactionIds: [transaction._id],
        });

        // Notification
        if (req.user && req.user._id) {
            const Notification = require("../models/notification");
            await Notification.create({
                user: req.user._id,
                type: "transaction",
                title: "Transaction Completed",
                message: "Your recent transaction was successfully processed.",
            });
        }

        // Emails
        if (payerEmail) {
            await sendEmail(payerEmail, 'Payment Successful', 'payerEmail.html', {
                name: payerName || 'Customer',
                currency,
                amount: amount.value,
                transactionId: transaction._id,
            });
        }
        if (merchant.email) {
            await sendEmail(merchant.email, 'New Payment Received', 'merchantEmail.html', {
                currency,
                amount: amount.value,
                transactionId: transaction._id,
            });
        }

        return res.status(200).json({
            message: chargeResponse.message,
            transaction,
            payout,
        });

    } catch (error) {
        console.error("Payment processing error:", error);
        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while processing the payment."
        });
    }
}

module.exports = { processPayment };
