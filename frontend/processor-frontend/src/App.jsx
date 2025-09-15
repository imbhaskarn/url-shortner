// src/App.js
import  { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./index.css";

import DashboardLayout from "./pages/Dashboard";
import Navigation from "./components/Navigation";
// Adjusted case to match actual file `signup.jsx`
import MultiStepForm from "./pages/signup";
import ProfilePage from "./pages/Profile";
import PaymentInterface from "./pages/payment_page";
// Adjusted Signin import to match actual file `Signin.jsx`
import { LoginPage } from "./pages/Signin";
import NotFoundPage from "./pages/404ErrorPage";
import { ResetPassword } from "./pages/forgot_password";
import { SupportPage } from "./pages/support";
import { PasswordResetRequest } from "./pages/PasswordResetRequest";
// Removed missing ServerErrorPage and config/roles modules; using services/api instead
import { Roles, API_URL } from "./services/api";

// ✅ Wrapper to allow useNavigate outside component
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await Roles();
        setDarkMode(data["dark_mode"]);
        setUserRole(data["name"]);
        setAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleDarkMode = async () => {
    const token = localStorage.getItem("access_token");
    const newMode = !darkMode;
    setDarkMode(newMode);

    try {
      const response = await fetch(`${API_URL}/api/role/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dark_mode: newMode }),
      });

      if (!response.ok) {
        throw new Error("Failed to update dark mode");
      }
    } catch (error) {
      console.error("Error updating dark mode:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuthenticated(false);
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {authenticated && (
        <Navigation
          userRole={userRole}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleLogout={handleLogout}
        />
      )}

      <main className={`flex-1 ${authenticated ? "mt-16 lg:ml-64" : ""}`}>
        <Routes>
          {!authenticated && <Route path="/" element={<LoginPage />} />}
          {/* Non-authenticated routes */}
          {!authenticated ? (
            <>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<MultiStepForm />} />
              {/* Removed 500 route until page implemented */}
              <Route
                path="/reset_password/:uidb64/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/password_reset_request"
                element={<PasswordResetRequest />}
              />
              <Route path="/clarity/payment" element={<PaymentInterface />} />
              <Route path="*" element={<LoginPage />} />
            </>
          ) : (
            <>
              {/* Authenticated routes */}
              <Route
                path="/"
                element={<DashboardLayout darkMode={darkMode} />}
              />
              <Route
                path="/profile"
                element={<ProfilePage darkMode={darkMode} />}
              />
              <Route
                path="/support/tickets"
                element={<SupportPage darkMode={darkMode} />}
              />
              <Route path="/clarity/payment" element={<PaymentInterface />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default AppWrapper;
