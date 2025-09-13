import React from 'react';

export const Alert = ({ children, variant = "default" }) => {
  const baseClasses = "p-4 rounded-md mb-4";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <div className="text-sm">{children}</div>;
};



export const AlertTitle = ({ title }) => (
  <div className="mb-4 border-b border-gray-200 pb-2">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);
