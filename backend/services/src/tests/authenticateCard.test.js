const { authenticateCard } = require('./controllers/authenticateCard');
const axios = require('axios');
jest.mock('axios');

describe('Card Authentication', () => {
  it('should authenticate a valid Visa card successfully', async () => {
    axios.post.mockResolvedValue({
      data: { status: 'success', token: 'AUTH_TOKEN_VISA' },
    });

    const response = await authenticateCard({
      number: '4111111111111111',
      expiration: '12/25',
      cvv: '123',
      type: 'Visa',
    });

    expect(response.status).toBe('authenticated');
    expect(response.token).toBe('AUTH_TOKEN_VISA');
  });

  it('should return an error for an unsupported card type', async () => {
    await expect(
      authenticateCard({
        number: '6011111111111117', // Discover, unsupported
        expiration: '12/25',
        cvv: '123',
        type: 'Discover',
      })
    ).rejects.toThrow('Unsupported card type');
  });
});
