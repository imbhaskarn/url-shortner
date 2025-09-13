// src/api/payment.js
import api from "./axios";

// Process a new payment
export const processPayment = async (paymentData) => {
  const res = await api.post("/api/payment", paymentData);
  return res.data;
};

// Fetch transactions
export const getTransactions = async () => {
  const res = await api.get("/api/transactions");
  return res.data;
};

// Create a payout
export const createPayout = async (payoutData) => {
  const res = await api.post("/api/payouts", payoutData);
  return res.data;
};
