// File: ./components/ui/slider.jsx
import React, { useState } from 'react';
import './slider.css'; // Import the CSS file for styling

const Slider = ({ min, max, step, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || min);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="styled-slider"
      />
      <div className="slider-value">{value}</div>
    </div>
  );
};

export default Slider;
