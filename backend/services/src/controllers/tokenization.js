const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Store this securely
const iv = crypto.randomBytes(16); // Initialization vector

// Tokenize card details
function tokenize(cardDetails) {
  const cardString = JSON.stringify(cardDetails);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(cardString, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {
    token: encrypted,
    iv: iv.toString('hex'),
  };
}

// Decrypt tokenized details
function detokenize(token, ivHex) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(token, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return JSON.parse(decrypted);
}

module.exports = { tokenize, detokenize };
