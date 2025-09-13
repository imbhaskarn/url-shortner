
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-center p-6">
      <FaCheckCircle size={80} className="text-green-600 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
      <p className="text-lg mt-2 mb-6 text-green-600">
        Thank you for your payment. Your transaction has been completed successfully.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default PaymentSuccess;
