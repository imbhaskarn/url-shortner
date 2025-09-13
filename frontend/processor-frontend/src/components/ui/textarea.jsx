import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 4, className = '' }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`border rounded-md p-2 ${className}`}
    />
  );
};

export default Textarea;
