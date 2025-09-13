const transactions = []; // In-memory storage for simplicity in sandbox

// Initiate a payment
exports.initiatePayment = (req, res) => {
  const { amount, currency, cardNumber, merchantId } = req.body;
  
  const transaction = {
    id: transactions.length + 1,
    amount,
    currency,
    cardNumber,
    merchantId,
    status: 'Initiated',
    createdAt: new Date(),
  };

  transactions.push(transaction);

  res.status(201).json({
    message: "Payment initiated successfully",
    transactionId: transaction.id,
    status: transaction.status,
  });
};

// Authorize the payment (after validation)
exports.authorizePayment = (req, res) => {
  const { transactionId } = req.body;
  const transaction = transactions.find(t => t.id === parseInt(transactionId));

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.status !== 'Initiated') {
    return res.status(400).json({ message: "Payment already processed" });
  }

  transaction.status = 'Authorized';

  res.json({
    message: "Payment authorized successfully",
    transactionId: transaction.id,
    status: transaction.status,
  });
};

// Get transaction logs
exports.getTransactionLogs = (req, res) => {
  res.json({ transactions });
};

// Get a specific transaction by ID
exports.getTransactionById = (req, res) => {
  const transactionId = parseInt(req.params.transactionId);
  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  res.json(transaction);
};

// List transactions for a specific merchant
exports.listTransactionsForMerchant = (req, res) => {
  const merchantId = req.params.merchantId;
  const merchantTransactions = transactions.filter(t => t.merchantId === merchantId);

  res.json({ transactions: merchantTransactions });
};

// Void a payment (if it's in a voidable state)
exports.voidPayment = (req, res) => {
  const transactionId = parseInt(req.params.transactionId);
  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.status !== 'Authorized') {
    return res.status(400).json({ message: "Only authorized payments can be voided" });
  }

  transaction.status = 'Voided';

  res.json({ message: "Payment voided successfully", transactionId });
};

// Update payment status (e.g., for settlement or refunds)
exports.updatePaymentStatus = (req, res) => {
  const transactionId = parseInt(req.params.transactionId);
  const { newStatus } = req.body;
  const validStatuses = ['Settled', 'Refunded', 'Failed'];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  transaction.status = newStatus;

  res.json({ message: "Payment status updated", transaction });
};
