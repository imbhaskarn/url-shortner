const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const validateAndAuthorizeCard = require("../middleware/preChecks");
const apiKeyAuth = require("../middleware/apiKeyAuth"); // ⬅️ create/import this

// Existing routes...
router.post(
  "/initiate",
  validateAndAuthorizeCard,
  paymentController.initiatePayment
);

router.post(
  "/authorize",
  validateAndAuthorizeCard,
  paymentController.authorizePayment
);

router.get("/logs", paymentController.getTransactionLogs);

router.get("/:transactionId", paymentController.getTransactionById);

router.get(
  "/merchant/:merchantId",
  paymentController.listTransactionsForMerchant
);

router.post("/void/:transactionId", paymentController.voidPayment);

router.put("/update/:transactionId", paymentController.updatePaymentStatus);

// ✅ New route for processPayment
router.post(
  "/process",
  apiKeyAuth, // 🔑 Checks merchant API key before continuing
  paymentController.processPayment
);

module.exports = router;
