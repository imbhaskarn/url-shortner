import React from 'react';


export const Form = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};


