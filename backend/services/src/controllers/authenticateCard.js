const axios = require('axios');
const { getCardTypeProvider } = require('./CardTypeProvider'); // Utility to get provider based on card type

const VISA_API = process.env.VISA_API_URL;
const MASTERCARD_API = process.env.MASTERCARD_API_URL;
const AMEX_API = process.env.AMEX_API_URL;

// Utility function to call respective API for card authentication
async function authenticateCard({ number, expiration, cvv, type }) {
  const provider = getCardTypeProvider(type);

  if (!provider) {
    throw new Error('Unsupported card type');
  }

  let apiEndpoint;
  let payload;
  switch (provider) {
    case 'Visa':
      apiEndpoint = VISA_API;
      payload = {
        cardNumber: number,
        expDate: expiration,
        cvv: cvv,
        type: 'Visa',
      };
      break;
    case 'MasterCard':
      apiEndpoint = MASTERCARD_API;
      payload = {
        cardNumber: number,
        expDate: expiration,
        cvv: cvv,
        type: 'MasterCard',
      };
      break;
    case 'Amex':
      apiEndpoint = AMEX_API;
      payload = {
        cardNumber: number,
        expDate: expiration,
        cvv: cvv,
        type: 'Amex',
      };
      break;
    default:
      throw new Error('Invalid card type');
  }

  try {
    // Make a request to the respective card provider API
    const response = await axios.post(`${apiEndpoint}/authenticate`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status === 'success') {
      return {
        status: 'authenticated',
        token: response.data.token, // Store the token for future transactions
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Card authentication failed: ${error.message}`);
  }
}

module.exports = { authenticateCard };
