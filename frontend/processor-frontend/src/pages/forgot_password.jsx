import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing
import logo from '../assets/logo.jpg';

export  const ResetPassword = () => {
    const { uid, token } = useParams(); 
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        setMessage('');
        setError('');
    
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        try {
            const accessToken = localStorage.getItem('access_token');

            // Corrected URL with backticks for template literals
            const response = await fetch(`http://127.0.0.1:8000/api/reset-password-confirm/${uid}/${token}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: formData.password }),
            });
    
            if (response.ok) {
                setMessage('Password reset successful! You can now log in.');
                setTimeout(() => {
                    navigate('/'); 
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.message || 'Error resetting password.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Logo Section */}
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Company Logo" className="h-16" /> {/* Adjust the height as needed */}
                </div>
                <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>

                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};


