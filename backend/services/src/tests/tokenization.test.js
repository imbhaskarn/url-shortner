const { tokenize, detokenize } = require('../payment/tokenization');

describe('Tokenization', () => {
  it('should tokenize and detokenize card details', () => {
    const cardDetails = {
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
    };

    const { token, iv } = tokenize(cardDetails);
    const decryptedCardDetails = detokenize(token, iv);

    expect(decryptedCardDetails.cardNumber).toBe(cardDetails.cardNumber);
    expect(decryptedCardDetails.expiryDate).toBe(cardDetails.expiryDate);
    expect(decryptedCardDetails.cvv).toBe(cardDetails.cvv);
  });
});
