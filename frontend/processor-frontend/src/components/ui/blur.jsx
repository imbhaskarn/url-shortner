import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar } from 'lucide-react';

const BillingOverlay = ({ nextBillingDate, onActionClick }) => {
  const isTrialEligible = nextBillingDate === null;
  const hasBillingDatePassed = nextBillingDate && new Date(nextBillingDate) < new Date();

  if (!hasBillingDatePassed && !isTrialEligible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50  flex items-center justify-center"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          {isTrialEligible ? (
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-400" />
          ) : (
            <Calendar className="mx-auto h-12 w-12 text-red-500" />
          )}
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {isTrialEligible ? "Start Your Free Trial" : "Billing Date Passed"}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {isTrialEligible
              ? "Experience our premium features with a free trial."
              : "Your account is currently limited. Please update your billing information to restore full access."}
          </p>
        </div>
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            onClick={onActionClick}
          >
            {isTrialEligible ? "Start Free Trial" : "Pay Now"}
          </motion.button>
        </div>
        {!isTrialEligible && (
          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Your billing date was {new Date(nextBillingDate).toLocaleDateString()}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BillingOverlay;