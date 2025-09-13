const request = require('supertest');
const express = require('express');
const webhookRouter = require('../payment/webhook');
const app = express();

app.use(express.json());
app.use(webhookRouter);

describe('Webhook Handling', () => {
  it('should handle payment succeeded event', async () => {
    const response = await request(app)
      .post('/webhook')
      .send({
        type: 'payment_intent.succeeded',
        data: { /* mock payment data */ },
      });

    expect(response.status).toBe(200);
  });

  it('should handle payment failed event', async () => {
    const response = await request(app)
      .post('/webhook')
      .send({
        type: 'payment_intent.payment_failed',
        data: { /* mock payment data */ },
      });

    expect(response.status).toBe(200);
  });
});
