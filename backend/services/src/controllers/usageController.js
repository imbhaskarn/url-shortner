const Usage = require('../models/Usage');

// @desc    Create a new usage record
// @route   POST /api/usage
// @access  Public (or protect with authMiddleware if needed)
const createUsage = async (req, res) => {
  try {
    const { merchantId, endpoint, method, responseTime, statusCode } = req.body;

    if (!merchantId || !endpoint || !method) {
      return res.status(400).json({ message: 'merchantId, endpoint, and method are required' });
    }

    const usage = new Usage({
      merchantId,
      endpoint,
      method,
      responseTime,
      statusCode
    });

    const savedUsage = await usage.save();
    res.status(201).json(savedUsage);
  } catch (error) {
    console.error('Error creating usage:', error);
    res.status(500).json({ message: 'Server error creating usage record' });
  }
};

// @desc    Get all usage records (or filter by merchantId)
// @route   GET /api/usage
// @access  Public (or protect with authMiddleware if needed)
const getUsage = async (req, res) => {
  try {
    const { merchantId } = req.query;
    let query = {};

    if (merchantId) {
      query.merchantId = merchantId;
    }

    const usageRecords = await Usage.find(query).sort({ createdAt: -1 });
    res.status(200).json(usageRecords);
  } catch (error) {
    console.error('Error fetching usage:', error);
    res.status(500).json({ message: 'Server error fetching usage records' });
  }
};

module.exports = {
  createUsage,
  getUsage
};
