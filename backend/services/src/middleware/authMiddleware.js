const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authenticate JWT access token and protect routes
const authenticateJWT = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify token using access token secret
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Attach the user to the request object (without password)
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('JWT Error:', err.message);

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }

      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

// Optional role-based restriction
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admins only' });
};

module.exports = {
  authenticateJWT,
  admin,
};
