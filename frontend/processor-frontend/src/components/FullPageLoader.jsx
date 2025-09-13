// FullPageLoader.jsx
import React from 'react';
import './FullPageLoader.css'; // Import CSS for styling

const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <div className="loader"></div>
      <p className="loader-message">Just a moment, loading...</p>
    </div>
  );
};

export default FullPageLoader;
