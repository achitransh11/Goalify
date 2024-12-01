import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    // Validate input fields
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required!');
      return;
    }

    // Validate email format (basic validation)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    // Check if the user already exists in localStorage
    const usersData = JSON.parse(localStorage.getItem('users') || '{}');
    if (usersData[email]) {
      setErrorMessage('User already exists!');
      return;
    }

    // Store user data in localStorage
    usersData[email] = { password, tasks: [] }; // User data format (email -> {password, tasks})
    localStorage.setItem('users', JSON.stringify(usersData));

    // Show success toast
    setToastMessage('Registration successful!');
    setToastVisible(true);

    // Redirect user to the login page after the toast disappears
    setTimeout(() => {
      navigate('/login');
      setToastVisible(false);  // Hide toast after redirect
    }, 3000);  // Toast duration: 3 seconds
  };

  return (
    <div className="register_parent-container">
      <div className="register_form">
        <div className="head-section">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit} className="body-section">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Register Button */}
          <button type="submit">Register</button>
        </form>
        <div className="login-section">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>

      {/* Toast Message */}
      {toastVisible && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Register;
