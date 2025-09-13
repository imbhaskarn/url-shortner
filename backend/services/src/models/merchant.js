// models/Merchant.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    apiKey: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Merchant', MerchantSchema);
