import React from 'react';

export const Separator = ({ className = '', ...props }) => {
  return (
    <hr className={`border-t border-gray-300 my-4 ${className}`} {...props} />
  );
};
