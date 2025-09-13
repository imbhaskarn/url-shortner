const express = require('express');
const { simulateTransaction } = require('../controllers/sandboxController');
const router = express.Router();

// Sandbox route for simulating a transaction
router.post('/simulate', simulateTransaction);

module.exports = router;
