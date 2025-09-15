import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, ArrowRight, CheckCircle, Chrome } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/CardComponents2";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/label";
import { loginForm } from "../services/api";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.email) newErrors.push("Email is required");
    if (!formData.password) newErrors.push("Password is required");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await loginForm(formData);

        console.log("Login response:", response);

        if (response.accessToken && response.refreshToken) {
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.user));
          // navigate("/dashboard"); 
          window.location.href = "/";
        } if (response.detail) {
          setErrors([response.detail]);
        }
        // else {
        //   setErrors(["An unknown error occurred. Please try again."]);
        // }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrors(["Invalid login credentials, Please try again"]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row shadow-none bg-gray-50">
      {/* Left Panel */}

      {/* Center Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 shadow-none">
        <Card className="w-full bg-white border-gray-300 max-w-md bg-gray-50 rounded-xl">
          {errors.length > 0 && (
            <Alert className="absolute top-4 right-4 mb-4 bg-red-50 border-red-200 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <CardHeader>
            <CardTitle className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="text-2xl font-bold text-gray-900">
                  Clarity{" "}
                </span>
              </div>

              <Button
                className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300  flex items-center justify-center space-x-2"
                onClick={() => console.log("Google Sign In")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="h-5 w-5"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span>Continue with Google</span>
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Work Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your work email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to="/password_reset_request"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 flex items-center justify-center"
              >
                Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>

          <div className="p-6 text-center text-sm text-gray-600">
            <span>Don't have an account? </span>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up for free
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
