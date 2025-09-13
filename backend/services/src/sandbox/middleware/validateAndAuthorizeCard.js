const validateAndAuthorizeCard = (req, res, next) => {
  const { cardNumber, expirationDate, cvv } = req.body;

  // Simulate card validation
  if (!cardNumber || cardNumber.length !== 16) {
    return res.status(400).json({ message: "Invalid card number" });
  }

  if (!expirationDate || new Date(expirationDate) < new Date()) {
    return res.status(400).json({ message: "Card has expired" });
  }

  if (!cvv || cvv.length !== 3) {
    return res.status(400).json({ message: "Invalid CVV" });
  }

  // Simulate card authorization success
  req.cardAuthorized = true; // Flag that can be used later in the process
  next();
};

module.exports = validateAndAuthorizeCard;
