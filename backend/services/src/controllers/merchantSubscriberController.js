const MerchantSubscriber = require('../models/merchantSubscriber');
async function createSubscription(req, res) {

    try {
        const { merchantId, userId, subscriptionFee, nextBillingDate } = req.body;

        // Validate required fields
        if (!merchantId || !userId || !subscriptionFee || !nextBillingDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new subscription
        const newSubscription = new MerchantSubscriber({
            merchant: merchantId,
            user: userId,
            subscriptionFee,
            nextBillingDate
        });

        // Save the subscription to the database
        await newSubscription.save();

        res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subscription', error });
    }
};
async function getSubscriptions(req, res) {

    try {
        const { merchantId } = req.query;

        // Validate that the merchant ID is provided
        if (!merchantId) {
            return res.status(400).json({ message: 'Merchant ID is required' });
        }

        // Find all subscriptions for the given merchant
        const subscriptions = await MerchantSubscriber.find({ merchant: merchantId }).populate('user', 'name email');

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this merchant' });
        }

        res.status(200).json({ subscriptions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscriptions', error });
    }
};

async function cancelSubscription(req, res) {
    try {
        const { subscriptionId } = req.params;

        // Validate that the subscription ID is provided
        if (!subscriptionId) {
            return res.status(400).json({ message: 'Subscription ID is required' });
        }

        // Find and remove the subscription
        const deletedSubscription = await MerchantSubscriber.findByIdAndDelete(subscriptionId);

        if (!deletedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.status(200).json({ message: `Subscription ${subscriptionId} canceled successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling subscription', error });
    }
};


module.exports = { cancelSubscription,createSubscription, getSubscriptions };
