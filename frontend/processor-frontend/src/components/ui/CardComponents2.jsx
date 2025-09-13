import { Roles,API_URL } from '../../services/api';
import React, { useState, useEffect } from 'react';



export const Card = ({ className = '', children, darkMode}) => {
  return (
    <div
      className={`
        rounded-lg
        shadow-md
        border
        mb-4
        overflow-hidden
        ${className}
        flex flex flex-col`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="px-4 py-3 border-b text-center md:text-left">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="px-4 py-3 flex-grow">
      {children}
    </div>
  );
};

export const CardDescription = ({ children }) => {
  return (
    <div className="px-4 py-2 text-sm text-gray-600">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-lg font-bold mb-2 truncate">
      {children}
    </h2>
  );
};

export const CardFooter = ({ children }) => {
  return (
    <div className="px-4 py-3 border-t">
      {children}
    </div>
  );
};
