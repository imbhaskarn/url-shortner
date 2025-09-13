// Utility to determine card type based on the card number
function getCardTypeProvider(cardNumber) {
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;

  if (visaRegex.test(cardNumber)) {
    return 'Visa';
  } else if (mastercardRegex.test(cardNumber)) {
    return 'MasterCard';
  } else if (amexRegex.test(cardNumber)) {
    return 'Amex';
  }

  return null;
}

module.exports = { getCardTypeProvider };
