const crypto = require('crypto');

const generateApiKey = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = { generateApiKey };
