const request = require('supertest');
const express = require('express');
const { processPayment } = require('../controllers/payment');
const app = express();

app.use(express.json());
app.post('/process-payment', processPayment);

describe('Payment Processing', () => {
  it('should return 200 for valid payment', async () => {
    const response = await request(app)
      .post('/process-payment')
      .send({
        cardNumber: '4111111111111111', // Sample Visa card number
        expiryDate: '12/25',
        cvv: '123',
        amount: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully charged $100 to the card.');
  });

  it('should return 400 for invalid card number', async () => {
    const response = await request(app)
      .post('/process-payment')
      .send({
        cardNumber: '1234567812345678', // Invalid card number
        expiryDate: '12/25',
        cvv: '123',
        amount: 100,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('INVALID_CARD');
  });
});
