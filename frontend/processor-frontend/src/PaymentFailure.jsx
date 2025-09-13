
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-center p-6">
      <FaTimesCircle size={80} className="text-red-600 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-red-700">Payment Failed</h1>
      <p className="text-lg mt-2 mb-6 text-red-600">
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go to Homepage
        </button>
        <button
          onClick={() => navigate('/confirmation')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Retry Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
