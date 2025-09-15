import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle, Upload, Chrome } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/CardComponents2';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/AvatarComponents';
import { submitForm } from '../services/api';
import logo from "../assets/logo.jpg"; 

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user: { name: '', email: '', password: '' },
    avatar: {image: null},
    organization: { name: '', category: '', organization_size: '' },
  });
  const [loading, setLoading] = useState(false); // Loading state
  
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // Previous handlers remain the same...
  // (handleChange, handleFileChange, validateStep, handleNext, handleSubmit functions stay unchanged)
  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          
          user: { ...prevData.user, avatar: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const validateStep = () => {
    const newErrors = [];
    switch (step) {
      case 1:
        if (!formData.user.name) newErrors.push('First Name is required');
        // if (!formData.user.last_name) newErrors.push('Last Name is required');
        if (!formData.user.email) newErrors.push('Email is required');
        if (!formData.user.password) newErrors.push('Password is required');
        break;
      case 2:
        // You can add more validations here as needed
        break;
      case 3:
        if (!formData.organization.name) newErrors.push('Organization Name is required');

        break;
      default:
        break;
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
      setErrors([]);
    }
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setLoading(true);

      try {
        const response = await submitForm(formData); 
        console.log('Form submitted:', response);

         if (response.accessToken && response.refreshToken) {
          localStorage.setItem("access_token", response.accessToken);
          localStorage.setItem("refresh_token", response.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.user));
          // navigate("/dashboard"); 
          window.location.href = "/";
        } else {
           console.error('No token received:', response);
        }
  
        // if (response.access && response.refresh) {
        //   localStorage.setItem('access_token', response.access);
        //   localStorage.setItem('refresh_token', response.refresh);
        //   localStorage.setItem('user', JSON.stringify(response.user));
        //   window.location.href = '/';
        // } else {
        //   console.error('No token received:', response);
        // }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessages = error.response.data.non_field_errors || 
            Object.values(error.response.data).flat();
          setErrors(errorMessages.map(msg => msg.replace(/email|username/i, "this information")));
        } else {
          console.error('Error Registration in:', error);
        }
      
    } finally {
      setLoading(false);
    }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Create Your Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your first name"
                  value={formData.user.name}
                  onChange={(e) => handleChange('user', 'name', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Enter your last name"
                  value={formData.user.last_name}
                  onChange={(e) => handleChange('user', 'last_name', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your work email"
                value={formData.user.email}
                onChange={(e) => handleChange('user', 'email', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={formData.user.password}
                onChange={(e) => handleChange('user', 'password', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Personalize Your Profile</h2>
            <div className="space-y-2">
              <Label htmlFor="avatar" className="text-gray-700">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 border-2 border-gray-200">
                  <AvatarImage src={formData.user.avatar} alt="Avatar" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {formData.user.name.charAt(0)}
                    {/* {formData.user.last_name.charAt(0)} */}
                  </AvatarFallback>
                </Avatar>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image').click()}
            className="border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Photo
          </Button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Company Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-gray-700">Company Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.organization.name}
                  onChange={(e) => handleChange('organization', 'name', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization_size" className="text-gray-700">Company Size</Label>
                <select
                  id="organization_size"
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.organization.organization_size}
                  onChange={(e) => handleChange('organization', 'organization_size', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Select Your Plan</h2>
            <div className="flex justify-center space-x-4">
              <Button
                variant={formData.organization.category === 'solo' ? 'solid' : 'outline'}
                onClick={() => handleChange('organization', 'category', 'solo')}
                className={`w-1/2 p-6 ${
                  formData.organization.category === 'solo' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="font-semibold">Individual</div>
                </div>
              </Button>
              <Button
                variant={formData.organization.category === 'team' ? 'solid' : 'outline'}
                onClick={() => handleChange('organization', 'category', 'team')}
                className={`w-1/2 p-6 ${
                  formData.organization.category === 'team' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="space-y-2">
                  <div className="font-semibold">Team</div>
                </div>
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
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
          <CardHeader>
            <CardTitle className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="text-2xl font-bold text-gray-900">
                Clarity                  </span>
              </div>
              <div className="text-gray-600">
                {step === 4 ? 'Final Step' : `Step ${step} of 4`}
              </div>
              
              <Button 
                className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300  flex items-center justify-center space-x-2"
                onClick={() => console.log('Google Sign In')}
              >


<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='h-5 w-5' width="100" height="100" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>


                <span>Continue with Google</span>
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {renderStep()}
          </CardContent>

          <div className="p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2"
            >
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 flex items-center"
              >
                Next <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2"
              >
                Get Started
              </Button>
            )}
          </div>


          <div className="p-6 text-center text-sm text-gray-600">
            <span>By clicking proceed you agree with our </span>
          

            <Link className="text-blue-600 top-20 hover:text-gray-800" to="/terms">
            Terms & Conditions
          </Link>
          </div>

        </Card>

     
       

      </div>
    </div>
  );
};

export default MultiStepForm;
