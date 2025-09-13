// routes/merchantRoutes.js
const express = require('express');
const { onboardMerchant, getMerchantProfile } = require('../controllers/merchantController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const {
    createOrUpdateMerchantProfile,
    getMerchantKYCProfile,
} = require('../controllers/kycController');

const router = express.Router();

// Merchant onboarding



router.post('/onboard', onboardMerchant);
router.get('/:merchantId', authenticateJWT, getMerchantProfile);

// KYC operations
router.post('/:merchantId/kyc', authenticateJWT, upload.array('documents', 10), createOrUpdateMerchantProfile);
router.get('/:merchantId/kyc', authenticateJWT, getMerchantKYCProfile);

module.exports = router;
