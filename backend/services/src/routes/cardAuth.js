const express = require('express');
const { authenticateCard } = require('../controllers/authenticateCard');
const router = express.Router();

router.post('/card/auth', async (req, res) => {
    try {
        const result = await authenticateCard(req.body.cardDetails);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
