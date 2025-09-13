import React from 'react';

export const Avatar: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`flex items-center justify-center ${className}`} {...props}>
    {children}
  </div>
);

export const AvatarFallback: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`flex items-center justify-center text-gray-400 ${className}`} {...props}>
    {children}
  </div>
);

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => (
  <img className={`w-10 h-10 rounded-full ${className}`} {...props} />
);


