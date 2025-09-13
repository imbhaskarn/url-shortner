import React, { useState } from "react";

const Checkbox = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {label && <span className="text-gray-900 font-medium">{label}</span>}
    </label>
  );
};

export default Checkbox;
