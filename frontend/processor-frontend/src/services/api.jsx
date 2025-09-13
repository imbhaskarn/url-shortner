// api.jsx
// Derive API base URL from Vite env (see .env.example). Fallback to localhost.
export const API_URL = (
  import.meta.env?.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

// ---------- AUTH ----------
export const registerMerchant = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Error registering merchant");
    return await response.json();
  } catch (err) {
    console.error("Register error:", err);
    throw err;
  }
};

export const loginMerchant = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return await response.json();
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

// ---------- PAYMENTS ----------
export const processPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error("Payment failed");
    return await response.json();
  } catch (err) {
    console.error("Payment error:", err);
    throw err;
  }
};

// ---------- AUTH SUPPLEMENTARY (signup/login forms used in pages) ----------
export const submitForm = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (err) {
    console.error("submitForm error:", err);
    throw err;
  }
};

export const loginForm = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (err) {
    console.error("loginForm error:", err);
    throw err;
  }
};

export const Roles = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token");
    const response = await fetch(`${API_URL}/api/role/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch role");
    return await response.json();
  } catch (err) {
    console.error("Roles error:", err);
    throw err;
  }
};

// ---------- TRANSACTIONS ----------
export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/transactions`);
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return await response.json();
  } catch (err) {
    console.error("Transactions error:", err);
    throw err;
  }
};

// ---------- PAYOUTS ----------
export const fetchPayouts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/payouts`);
    if (!response.ok) throw new Error("Failed to fetch payouts");
    return await response.json();
  } catch (err) {
    console.error("Payouts error:", err);
    throw err;
  }
};
