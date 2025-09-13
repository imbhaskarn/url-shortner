const mongoose = require('mongoose');
const { Schema } = mongoose;

const MerchantProfileSchema = new Schema({
    merchant: { type: Schema.Types.ObjectId, ref: 'Merchant' },
    businessName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    email: { type: String, required: true }, // 📧 for merchant notifications
    apiKey: { type: String, unique: true }, // 🔑 for developer API access
    currency: { type: String, default: 'USD' }, // 💱 optional default currency
    onboardingStatus: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'], 
        default: 'pending' 
    },
    documents: [{
        documentType: { type: String, required: true },
        documentUrl: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MerchantProfile', MerchantProfileSchema);
