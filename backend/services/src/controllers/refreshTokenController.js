const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken
} = require('../utils/jwt');

const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { refreshTokenHandler };
