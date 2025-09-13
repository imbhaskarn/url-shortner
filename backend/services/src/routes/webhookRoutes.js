const express = require('express');
const { handleWebhook } = require('../controllers/webhookController');

const router = express.Router();

// Route for receiving webhooks
router.post('/webhook', handleWebhook);

module.exports = router;
