import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element, userRole, allowedRoles }) => {
  // Check if user is authenticated (you can adjust this check as per your logic)
  const isAuthenticated = !!userRole; 

  // Check if user has the required role
  const hasRequiredRole = allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (!hasRequiredRole) {
    // Redirect to not found if not authorized
    return <Navigate to="/404" />;
  }

  return element; // Render the protected component
};

export default AuthRoute;
