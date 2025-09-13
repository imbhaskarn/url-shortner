// src/components/PaymentForm.js
import React, { useState } from "react";
import { processPayment } from "../api/payment";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [merchantId, setMerchantId] = useState(""); // optional: could auto-fill if logged in
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await processPayment({ amount, currency, merchantId });
      setMessage(`✅ Payment successful: Transaction ID ${data.transactionId}`);
    } catch (err) {
      setMessage(
        `❌ Payment failed: ${
          err.response?.data?.error || err.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">Process Payment</h2>

      <div>
        <label className="block text-sm mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="EGP">EGP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Merchant ID</label>
        <input
          type="text"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          placeholder="Optional"
          className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md"
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>

      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </form>
  );
};

export default PaymentForm;
