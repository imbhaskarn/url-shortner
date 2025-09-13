const { verifyToken } = require('../utils/jwt');

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;  // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
