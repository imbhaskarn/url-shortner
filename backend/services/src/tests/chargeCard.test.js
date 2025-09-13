const { chargeCard } = require('./controllers/chargeCard');
const axios = require('axios');
jest.mock('axios');

describe('Card Charging', () => {
  it('should charge a Visa card successfully', async () => {
    axios.post.mockResolvedValue({
      data: { status: 'success', transactionId: 'TX123456789' },
    });

    const response = await chargeCard({
      number: '4111111111111111',
      expiration: '12/25',
      cvv: '123',
      amount: 100,
      token: 'AUTH_TOKEN_VISA',
      type: 'Visa',
    });

    expect(response.status).toBe('charged');
    expect(response.transactionId).toBe('TX123456789');
  });

  it('should return an error if the card charge fails', async () => {
    axios.post.mockRejectedValue(new Error('Charge failed due to insufficient funds'));

    await expect(
      chargeCard({
        number: '4111111111111111',
        expiration: '12/25',
        cvv: '123',
        amount: 1000,
        token: 'AUTH_TOKEN_VISA',
        type: 'Visa',
      })
    ).rejects.toThrow('Charge failed: Charge failed due to insufficient funds');
  });
});
