import React from 'react';

export const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const variantClasses = {
    default: "bg-blue-500 text-gray-100 hover:bg-blue-600 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-100 hover:bg-gray-50 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
