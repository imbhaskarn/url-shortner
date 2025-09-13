const jwt = require('jsonwebtoken');

// Load secrets from .env (never hardcode them!)
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

// Create Access Token (short-lived, 15m)
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
}

// Create Refresh Token (long-lived, 7d)
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
}

// Verify Access Token
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

// Verify Refresh Token
function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
