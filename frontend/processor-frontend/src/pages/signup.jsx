import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
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
import { submitForm } from "../services/api";
import logo from "../assets/logo.jpg";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [generatedApiKey, setGeneratedApiKey] = useState(null);

  // Previous handlers remain the same...
  // (handleChange, handleFileChange, validateStep, handleNext, handleSubmit functions stay unchanged)
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.name.trim()) newErrors.push("Name is required");
    if (!formData.email.trim()) newErrors.push("Email is required");
    if (!formData.password.trim()) newErrors.push("Password is required");
    if (!formData.phone.trim()) newErrors.push("Phone is required");
    if (!formData.address.trim()) newErrors.push("Address is required");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.push("Please enter a valid email address");
    }

    // Password length validation
    if (formData.password && formData.password.length < 6) {
      newErrors.push("Password must be at least 6 characters");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      try {
        const response = await submitForm(formData);
        console.log("Form submitted:", response);

        if (response.accessToken && response.refreshToken) {
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.user));

          // Store the generated API key for display
          if (response.apiKey) {
            setGeneratedApiKey(response.apiKey);
            localStorage.setItem("api_key", response.apiKey);
            console.log("Generated API Key:", response.apiKey);

            // Delay redirect to show API key
            setTimeout(() => {
              window.location.href = "/";
            }, 5000); // 5 second delay
          } else {
            window.location.href = "/";
          }
        } else {
          console.error("No token received:", response);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessages =
            error.response.data.errors ||
            error.response.data.non_field_errors ||
            Object.values(error.response.data).flat();
          setErrors(
            errorMessages.map((msg) =>
              msg.replace(/email|username/i, "this information")
            )
          );
        } else {
          console.error("Error Registration in:", error);
          setErrors(["Registration failed. Please try again."]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password (min 6 characters)"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">
              Address
            </Label>
            <Input
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel */}

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md bg-gray-50 shadow-none">
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

          {generatedApiKey && (
            <Alert className="mb-4 bg-green-50 border-green-200 text-green-700">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-semibold">Account created successfully!</p>
                  <p>
                    Your API Key:{" "}
                    <code className="bg-gray-100 px-1 rounded text-sm">
                      {generatedApiKey}
                    </code>
                  </p>
                  <p className="text-sm">
                    Please save this API key securely. You&apos;ll need it for
                    API access.
                  </p>
                </div>
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

          <CardContent>{renderForm()}</CardContent>

          <div className="p-6 text-center text-sm text-gray-600">
            <span>By clicking proceed you agree with our </span>
            <Link className="text-blue-600 hover:text-gray-800" to="/terms">
              Terms & Conditions
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
