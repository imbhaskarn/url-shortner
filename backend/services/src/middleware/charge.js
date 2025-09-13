const axios = require("axios");

async function processCharge({ cardToken, amount, currency = 'USD', cardType }) {
    try {
        // Prepare the request to the payment gateway
        const paymentDetails = {
            token: cardToken,
            amount: amount * 100, // Convert to cents
            currency: currency,
            cardType: cardType,
        };

        // Here you would make the actual API call to the payment gateway
        let chargeResponse;

        // Replace with actual API endpoint for Visa, MasterCard, or American Express
        const apiEndpoint = "https://api.yourpaymentgateway.com/charge"; // Example URL
        
        // Send a request to the payment gateway (replace with actual logic)
        chargeResponse = await axios.post(apiEndpoint, paymentDetails, {
            headers: {
                "Authorization": `Bearer YOUR_ACCESS_TOKEN`, // Use your access token
                "Content-Type": "application/json",
            },
        });

        // Handle the response from the payment gateway
        if (chargeResponse.data.status === "success") {
            return {
                status: "success",
                message: `Successfully charged ${currency} ${amount}.`,
                chargeId: chargeResponse.data.chargeId, // Assuming charge ID is returned
            };
        } else {
            return {
                status: "failure",
                message: chargeResponse.data.message || "Charge failed.",
            };
        }
    } catch (error) {
        console.error("Charge error:", error.message);
        return {
            status: "failure",
            message: error.response ? error.response.data.message : "Charge failed due to an unknown error.",
        };
    }
}

module.exports = { processCharge };
