const { processPayment } = require('../controllers/payment');
const { authenticateCard } = require('../controllers/authenticateCard');
const { validateCard } = require('../controllers/CardValidator');

// Mock the functions
jest.mock('./authenticateCard');
jest.mock('./CardValidator');

describe('processPayment', () => {
  it('should return success for valid card and successful authentication', async () => {
    
    validateCard.mockReturnValue({ isValid: true, cardType: 'Visa' });

   
    authenticateCard.mockResolvedValue({ status: 'approved' });

   
    const req = { body: { cardNumber: '4111111111111111', expiryDate: '12/25', cvv: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await processPayment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Card validated and authenticated successfully.'
    }));
  });

  
});
