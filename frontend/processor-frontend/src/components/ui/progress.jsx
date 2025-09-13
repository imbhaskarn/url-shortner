// File: ../components/ui/progress.jsx
import React from 'react';
import './progress.css'; // Import the CSS for styling

export const Progress = ({ value }) => {
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${value}%` }}
      >
        <span className="progress-value">{value}%</span>
      </div>
    </div>
  );
};
