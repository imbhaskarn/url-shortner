const crypto = require("crypto");

// Generate a random 6-digit OTP
exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};
