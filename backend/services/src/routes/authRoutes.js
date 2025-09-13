const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  sendResetEmail,
  resetPassword,
  verifyOTP,
  resendOTP,
  register,
  login
} = require('../controllers/authController');

const {
  validateLogin,
  validateRegister
} = require('../middleware/validateAuth');

const {
  refreshTokenHandler
} = require('../controllers/refreshTokenController');

const router = express.Router();

// Rate limiter for login route
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: {
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes with validation
router.post('/register', validateRegister, register);
router.post('/login', loginRateLimiter, validateLogin, login);

// No validation needed for these
router.post('/password-reset', resetPassword);
router.post('/sendreset', sendResetEmail);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// ✅ Refresh token route
router.post('/refresh-token', refreshTokenHandler);

module.exports = router;
