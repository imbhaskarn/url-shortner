const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');
const { createSubscription, getSubscriptions, cancelSubscription } = require('../controllers/merchantSubscriberController');

const router = express.Router();

// Create a new subscription
router.post('/subscriptions', authenticateJWT, createSubscription);

// Get all subscriptions for a merchant
router.get('/subscriptions', authenticateJWT, getSubscriptions);

// Cancel a subscription
router.delete('/subscriptions/:subscriptionId', authenticateJWT, cancelSubscription);

module.exports = router;
