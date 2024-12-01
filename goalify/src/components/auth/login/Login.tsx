import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './login.styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  // Check if the user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    navigate('/task-list'); // Redirect if already logged in
    return null;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
  
    if (!email || !password) {
      setErrorMessage('Both fields are required!');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[email];
  
    if (!user || user.password !== password) {
      setErrorMessage('Invalid email or password');
      return;
    }
  
    // Proceed with successful login
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/task-list');
  };
  

  return (
    <div className='login_parent-container'>
      <div>
        <div className="head-section">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="body-section">
          {/* Email Input */}
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setErrorMessage('')} // Clear error when the user focuses on the input
          />
          
          {/* Password Input */}
          <input
            type='password'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMessage('')} // Clear error when the user focuses on the input
          />
          
          {/* Error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          {/* Login Button */}
          <button type='submit'>Login</button>
        </form>
        <div className="register-section">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
