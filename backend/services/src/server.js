const path = require('path');
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

// ✅ Validate required env variables before starting
process.env.MONGO_URI=`mongodb+srv://satyamkumark12_db_user:ELln7F7YovHBn5SL@cluster0.e2qg72z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// ✅ Connect to database
connectDB();

// Controllers
const { authenticateUser } = require('./middleware/authMiddleware'); // Fixed casing
const { handleWebhook } = require('./controllers/webhookController');
const { processPayment } = require('./controllers/paymentController');
const { processPayout } = require('./controllers/payoutController');
const { createSettlement } = require('./controllers/settlementController');
const { createChargeback } = require('./controllers/chargebackController');
const { createRefund } = require('./controllers/refundController');
const transactionController = require('./controllers/transactionController'); // Fixed casing

// Routes
const auth = require('./routes/authRoutes');
const merchantSubscriberRoutes = require('./routes/merchantSubscriberRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const kycRoutes = require('./routes/kycRoutes');
const notificationRoutes = require('./routes/notifications');
const usageRoutes = require('./routes/usage');
const webhooksRoute = require('./routes/webhooks');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⚠️ Stripe Webhooks require raw body before JSON parsing
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhooksRoute);

// Core middleware (after webhooks)
app.use(bodyParser.json());
app.use(cors());
// app.use(authenticateUser); // Enable globally only if needed

// Routes
app.use('/api/auth', auth);
app.use('/api/merchant', merchantRoutes);
app.use('/api/merchant/subscribers', merchantSubscriberRoutes); // ✅ safer subpath
app.use('/api/merchant/kyc', kycRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/role', roleRoutes);

// Payments
app.post('/api/payment', processPayment);

// Transactions
app.get('/api/transactions', transactionController.getAllTransactions);
app.post('/api/transactions/:id/refund', createRefund);
app.post('/api/transactions/:id/chargeback', createChargeback);

// Payouts & Settlements
app.post('/api/payouts', processPayout);
app.post('/api/settlements', createSettlement);

// Extra webhook (non-Stripe)
app.post('/webhook', handleWebhook);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Payment Gateway API is up and running!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Boot server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
