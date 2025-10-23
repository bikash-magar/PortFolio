import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('portfolio_auth') === 'true';
  
  // Optional: Check if session is still valid (e.g., within 24 hours)
  const authTime = localStorage.getItem('portfolio_auth_time');
  const isSessionValid = authTime && (Date.now() - parseInt(authTime)) < 24 * 60 * 60 * 1000; // 24 hours
  
  if (!isAuthenticated || !isSessionValid) {
    // If session expired, clear the auth
    if (!isSessionValid) {
      localStorage.removeItem('portfolio_auth');
      localStorage.removeItem('portfolio_auth_time');
    }
    
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated and session valid, render the protected component
  return children;
}

export default ProtectedRoute;