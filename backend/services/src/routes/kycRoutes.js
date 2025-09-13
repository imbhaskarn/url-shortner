const express = require('express');
const { createOrUpdateMerchantProfile } = require('../controllers/kycController'); // Path to the KYC processing controller
const router = express.Router();

router.post('/kyc', createOrUpdateMerchantProfile);

module.exports = router;



