import React, { useState } from 'react';

export const SwitchComponent = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center">
      <label className="mr-2 text-gray-700">{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="toggle-switch"
      />
    </div>
  );
};

