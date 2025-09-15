const { generateOTP } = require("../utils/otpGenerator");
const User = require('../models/user');
const crypto = require('crypto');
const notificationController = require("../controllers/notificationController");
const emailService = require('../utils/emailService');
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/jwt");

// 📦 Register
async function register(req, res) {
  try {
    const { name, email, phone, address, apiKey, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, phone, address, apiKey, password });
    await newUser.save();

    const token = generateAccessToken(newUser); // access token for email verification

    // await emailService.sendVerificationEmail(email, token);

    try {
      await notificationController.createNotification({
        body: {
          userId: newUser._id,
          type: "register",
          title: "Welcome Aboard!",
          message: "Thanks for registering. Your account has been created."
        }
      });
    } catch (err) {
      console.warn("Notification failed:", err.message);
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
}

// 🔐 Login (OTP sent)
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const otp = generateOTP();
    user.otp = await user.encryptOTP(otp);
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log(`OTP for ${email}: ${otp}`); // For testing, log OTP to console
    // await emailService.sendOTPEmail(user.email, otp);

    res.status(200).json({
      message: "OTP sent. Please verify to complete login.",
      userId: user._id
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// ✅ OTP Verification → issues both tokens
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user || !await user.verifyOTP(otp) || user.otpExpiresAt < Date.now())
      return res.status(401).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: "OTP verified successfully.",
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔁 Resend OTP
const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = await user.encryptOTP(otp);
    user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    await emailService.sendOTPEmail(user.email, otp);

    res.status(200).json({ message: "A new OTP has been sent to your email." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Email Verification via token
const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token.', error: err.message });
  }
};

// 🔐 Send Reset Password Email
const sendResetEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const token = crypto.randomBytes(20).toString('hex');
    user.otp = await user.encryptOTP(token);
    user.otpExpiresAt = Date.now() + 3600000;
    await user.save();

    await emailService.sendResetPasswordEmail(user.email, token);

    res.status(200).json({ message: 'Reset password email sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reset email', error: err.message });
  }
};

// ✅ Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const users = await User.find({ otpExpiresAt: { $gt: Date.now() } });
    const matchedUser = await Promise.any(
      users.map(async user => (await user.verifyOTP(token)) ? user : Promise.reject())
    ).catch(() => null);

    if (!matchedUser) return res.status(400).json({ message: 'Invalid or expired token.' });

    matchedUser.password = password;
    matchedUser.otp = undefined;
    matchedUser.otpExpiresAt = undefined;
    await matchedUser.save();

    res.status(200).json({ message: 'Password reset successfully.' });

  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

module.exports = {
  register,
  login,
  verifyOTP,
  resendOTP,
  verifyEmail,
  sendResetEmail,
  resetPassword
};
