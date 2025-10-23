import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simple hardcoded credentials
  const VALID_CREDENTIALS = {
    username: 'admin',
    password: 'portfolio123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (credentials.username === VALID_CREDENTIALS.username && 
        credentials.password === VALID_CREDENTIALS.password) {
      
      // Set session in localStorage
      localStorage.setItem('portfolio_auth', 'true');
      localStorage.setItem('portfolio_auth_time', Date.now().toString());
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Portfolio Dashboard</h1>
          <p>Please sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-info">
          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> portfolio123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;