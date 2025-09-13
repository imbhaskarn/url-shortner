import React, { useState } from 'react';
import logo from '../assets/logo.png';

export const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setMessage('');
        setError('');
       
        try {
            const response = await fetch('http://127.0.0.1:8000/api/forgot-password/', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Password reset link sent! Please check your email.');
            } else {
                const data = await response.json();
                setError(data.message || 'Error sending password reset email.');
            }
        } catch (err) {
            console.log(err)

            setError('Network error. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
               
            <div className="flex justify-center mb-4">
                    <img src={logo} alt="Company Logo" className="h-16" /> {/* Adjust the height as needed */}
                      <h className='text-black text-2xl font-bold text-center' >OrgPro CRM</h>
                
                </div>
                <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};


