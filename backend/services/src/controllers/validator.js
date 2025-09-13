const moment = require("moment");

function getCardType(cardNumber) {
  const patterns = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    AmericanExpress: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };

  for (const [cardType, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return cardType;
    }
  }

  return "Unknown";
}

function isValidCardNumber(cardNumber) {
  const reversedNumbers = cardNumber.replace(/\D/g, "").split("").reverse();
  let sum = 0;

  for (let i = 0; i < reversedNumbers.length; i++) {
    let digit = parseInt(reversedNumbers[i], 10);
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

function isValidExpiryDate(expiryDate) {
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/").map(Number);
  if (month < 1 || month > 12) return false;

  const currentDate = moment();
  const expiry = moment(`20${year}-${month}`, "YYYY-MM").endOf("month");

  return expiry.isAfter(currentDate);
}

function isValidCVV(cvv, cardType) {
  const cvvPattern = /^\d+$/;

  const cvvLength = {
    Visa: 3,
    MasterCard: 3,
    AmericanExpress: 4,
    Discover: 3,
  };

  return cvvPattern.test(cvv) && cvv.length === cvvLength[cardType];
}

function validateCard(cardDetails) {
  const { cardNumber, expiryDate, cvv } = cardDetails;

  const cardType = getCardType(cardNumber);

  if (cardType === "Unknown") {
    return { isValid: false, message: "Unsupported or invalid card type." };
  }

  if (!isValidCardNumber(cardNumber)) {
    return { isValid: false, message: "Invalid card number." };
  }

  if (!isValidExpiryDate(expiryDate)) {
    return {
      isValid: false,
      message: "Card is expired or expiry date is invalid.",
    };
  }

  if (!isValidCVV(cvv, cardType)) {
    return { isValid: false, message: `Invalid CVV for ${cardType} card.` };
  }

  return { isValid: true, message: "Card is valid.", cardType };
}

module.exports = { validateCard, getCardType };
