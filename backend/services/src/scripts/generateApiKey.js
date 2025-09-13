const mongoose = require('mongoose');
const crypto = require('crypto');
const MerchantProfile = require('../models/MerchantProfile');

// Replace with your own MongoDB URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/yourdbname';

async function generateApiKey(merchantId) {
  try {
    await mongoose.connect(MONGODB_URI);
    const apiKey = crypto.randomBytes(32).toString('hex');

    const merchant = await MerchantProfile.findByIdAndUpdate(
      merchantId,
      { apiKey },
      { new: true }
    );

    if (!merchant) {
      console.error('❌ Merchant not found');
      process.exit(1);
    }

    console.log('✅ API Key generated successfully:');
    console.log(apiKey);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating API key:', error);
    process.exit(1);
  }
}

// Run: node scripts/generateApiKey.js <merchantId>
const merchantId = process.argv[2];
if (!merchantId) {
  console.error('❌ Please provide a merchantId');
  process.exit(1);
}

generateApiKey(merchantId);
