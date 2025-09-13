const MerchantProfile = require('../models/MerchantProfile');

// Create or update merchant KYC profile
async function createOrUpdateMerchantProfile(req, res) {
    const { merchantId } = req.params;
    const { businessName, businessAddress } = req.body;
    const documents = req.files.map(file => ({
        documentType: file.fieldname,
        documentUrl: file.path,
    }));

    try {
        let profile = await MerchantProfile.findOne({ merchant: merchantId });

        if (profile) {
            profile.businessName = businessName;
            profile.businessAddress = businessAddress;
            profile.documents.push(...documents);
            await profile.save();
            return res.status(200).json({ message: 'Merchant profile updated successfully.', profile });
        } else {
            profile = new MerchantProfile({
                merchant: merchantId,
                businessName,
                businessAddress,
                documents,
            });
            await profile.save();
            return res.status(201).json({ message: 'Merchant profile created successfully.', profile });
        }
    } catch (error) {
        console.error('Error creating/updating merchant profile:', error);
        return res.status(500).json({ message: 'Error creating/updating merchant profile.' });
    }
}

// Retrieve KYC profile
async function getMerchantKYCProfile(req, res) {
    const { merchantId } = req.params;

    try {
        const profile = await MerchantProfile.findOne({ merchant: merchantId });
        if (!profile) {
            return res.status(404).json({ message: 'Merchant KYC profile not found.' });
        }

        return res.status(200).json({ profile });
    } catch (error) {
        console.error('Error retrieving merchant KYC profile:', error);
        return res.status(500).json({ message: 'Error retrieving merchant KYC profile.' });
    }
}

module.exports = {
    createOrUpdateMerchantProfile,
    getMerchantKYCProfile,
};
