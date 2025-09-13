import React from 'react';

export const CardContent: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`p-4 border-t ${className}`} {...props}>
    {children}
  </div>
);

export const CardDescription: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`p-4 border-t ${className}`} {...props}>
    {children}
  </div>
);
