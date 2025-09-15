/* eslint-disable react-refresh/only-export-components */
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
    const response = await fetch(`${API_URL}/api/auth/register`, {
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
    const response = await fetch(`${API_URL}/api/auth/login`, {
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
    console.log("token from local storage", token)
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

// ---------- USER PROFILE ----------
export const fetchUser = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No auth token");

    // For now, return mock data since the backend endpoint doesn't exist yet
    // TODO: Replace with actual API call when backend endpoint is implemented
    const mockUserData = {
      userData: {
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        organization: "Payment Solutions Inc",
        jobTitle: "Payment Processor",
        dateJoined: new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ).toISOString(), // 1 year ago
        profileImage: null,
      },
      loginActivities: [
        {
          action: "Login",
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          ip: "192.168.1.1",
        },
        {
          action: "Login",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          ip: "192.168.1.1",
        },
        {
          action: "Password Reset",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
          ip: "192.168.1.2",
        },
      ],
      performanceData: [
        { month: "Jan", sales: 4000, leads: 2400 },
        { month: "Feb", sales: 3000, leads: 1398 },
        { month: "Mar", sales: 2000, leads: 9800 },
        { month: "Apr", sales: 2780, leads: 3908 },
        { month: "May", sales: 1890, leads: 4800 },
        { month: "Jun", sales: 2390, leads: 3800 },
      ],
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return mockUserData;

    // Future implementation when backend is ready:
    // const response = await fetch(`${API_URL}/api/user/profile`, {
    //   headers: {
    //     "Authorization": `Bearer ${token}`,
    //     "Content-Type": "application/json"
    //   },
    // });
    // if (!response.ok) throw new Error("Failed to fetch user profile");
    // return await response.json();
  } catch (err) {
    console.error("User profile error:", err);
    throw err;
  }
};

// ---------- SUPPORT TICKETS (TEMPORARY IMPLEMENTATION) ----------
export const CreateTicket = async (ticketData) => {
  try {
    console.log("Creating support ticket:", ticketData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock response - simulate successful ticket creation
    const mockResponse = {
      success: true,
      ticketId: `TICKET-${Date.now()}`,
      message: "Support ticket created successfully",
      ticket: {
        id: `TICKET-${Date.now()}`,
        subject: ticketData.subject,
        category: ticketData.category,
        message: ticketData.message,
        status: "Open",
        createdAt: new Date().toISOString(),
        priority: "Medium",
      },
    };

    return mockResponse;

    // Future implementation when backend is ready:
    // const response = await fetch(`${API_URL}/api/support/tickets`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}` // Add token when auth is implemented
    //   },
    //   body: JSON.stringify(ticketData),
    // });
    // if (!response.ok) throw new Error("Failed to create support ticket");
    // return await response.json();
  } catch (err) {
    console.error("Create ticket error:", err);
    throw err;
  }
};
