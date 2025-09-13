const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MerchantSubscriberSchema = new Schema({
    merchant: { type: Schema.Types.ObjectId, ref: 'MerchantProfile' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    subscriptionFee: { type: Number, required: true },
    subscribedAt: { type: Date, default: Date.now },
    nextBillingDate: { type: Date, required: true },
});

module.exports = mongoose.model('MerchantSubscriber', MerchantSubscriberSchema);
