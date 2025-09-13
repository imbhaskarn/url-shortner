const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Store this securely
const iv = crypto.randomBytes(16); 

// Encrypt sensitive data
function encrypt(data) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
  };
}

// Decrypt sensitive data
function decrypt(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

module.exports = { encrypt, decrypt };
