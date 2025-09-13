const MerchantProfile = require("../models/MerchantProfile");

async function apiKeyAuth(req, res, next) {
    const { merchantId, developerApiKey } = req.body;

    try {
        if (!merchantId || !developerApiKey) {
            return res.status(400).json({ error: "MISSING_API_KEY", message: "Merchant ID and API key are required." });
        }

        const merchant = await MerchantProfile.findById(merchantId);
        if (!merchant) {
            return res.status(404).json({ error: 'MERCHANT_NOT_FOUND', message: 'Merchant not found.' });
        }

        if (!merchant.apiKey || merchant.apiKey !== developerApiKey) {
            return res.status(403).json({ error: 'INVALID_API_KEY', message: 'Invalid API key.' });
        }

        // Attach merchant profile for downstream use
        req.merchantProfile = merchant;
        next();

    } catch (err) {
        console.error("API Key auth error:", err);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", message: "API authentication failed." });
    }
}

module.exports = apiKeyAuth;
