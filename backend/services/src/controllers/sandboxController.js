const { validateCard } = require("./cardValidator");
const { authenticateCard } = require("./authenticateCard");
const { processTransaction } = require("./transactionService");

async function simulateTransaction(req, res) {
    try {
        const { developerApiKey, cardNumber, expiryDate, cvv, amount } = req.body;

        // Check if the developer API key is valid (you can implement a better check)
        if (developerApiKey !== process.env.DEVELOPER_API_KEY) {
            return res.status(403).json({ message: "Invalid developer API key" });
        }

        // Validate the card details
        const validationResponse = validateCard({ cardNumber, expiryDate, cvv });
        if (!validationResponse.isValid) {
            return res.status(400).json({ error: "INVALID_CARD", message: validationResponse.message });
        }

        // Simulate card authentication
