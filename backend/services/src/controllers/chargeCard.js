const axios = require('axios');

const VISA_API = process.env.VISA_API_URL;
const MASTERCARD_API = process.env.MASTERCARD_API_URL;
const AMEX_API = process.env.AMEX_API_URL;

// Function to charge a card by calling the respective provider's API
async function chargeCard({ number, expiration, cvv, amount, currency = 'USD', token, type }) {
  let apiEndpoint;
  let payload;

  switch (type) {
    case 'Visa':
      apiEndpoint = VISA_API;
      payload = {
        token, // Auth token received from the authentication API
        amount,
        currency,
      };
      break;
    case 'MasterCard':
      apiEndpoint = MASTERCARD_API;
      payload = {
        token,
        amount,
        currency,
      };
      break;
    case 'Amex':
      apiEndpoint = AMEX_API;
      payload = {
        token,
        amount,
        currency,
      };
      break;
    default:
      throw new Error('Unsupported card type');
  }

  try {
    // Make a request to the respective card provider's API to charge the card
    const response = await axios.post(`${apiEndpoint}/charge`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status === 'success') {
      return {
        status: 'charged',
        transactionId: response.data.transactionId,
        message: 'Card charged successfully',
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Charge failed: ${error.message}`);
  }
}

module.exports = { chargeCard };
