// controllers/merchantController.js
const { Merchant } = require('../models/merchantProfile');
const MerchantProfile = require('../models/merchantProfile');

// Onboard a new merchant
async function onboardMerchant(req, res) {
    const { name, email, phone, address, apiKey } = req.body;
    
    try {
        const existingMerchant = await Merchant.findOne({ email });
        if (existingMerchant) {
            return res.status(400).json({ message: 'Merchant already exists.' });
        }

        const newMerchant = new Merchant({ name, email, phone, address, apiKey });
        await newMerchant.save();

        return res.status(201).json({ message: 'Merchant onboarded successfully.', merchant: newMerchant });
    } catch (error) {
        console.error('Error onboarding merchant:', error);
        return res.status(500).json({ message: 'Error onboarding merchant.' });
    }
}

// Retrieve merchant profile
async function getMerchantProfile(req, res) {
    const { merchantId } = req.params;

    try {
        const merchant = await Merchant.findById(merchantId);
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found.' });
        }

        return res.status(200).json({ merchant });
    } catch (error) {
        console.error('Error retrieving merchant profile:', error);
        return res.status(500).json({ message: 'Error retrieving merchant profile.' });
    }
}

module.exports = { onboardMerchant, getMerchantProfile };
