const Developer = require('../models/Developer');

async function developerAuth(req, res, next) {
  const { publicKey, secretKey } = req.headers;

  if (!publicKey || !secretKey) {
    return res.status(401).json({ message: 'API keys missing' });
  }

  const developer = await Developer.findOne({ publicKey, secretKey });
  if (!developer) {
    return res.status(401).json({ message: 'Invalid API keys' });
  }

  req.developer = developer;
  next();
}

module.exports = developerAuth;
