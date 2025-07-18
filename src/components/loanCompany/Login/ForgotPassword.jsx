import React, { useState, useEffect } from 'react';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    // Dummy logo URL for now, to be replaced with API call
    setLogoUrl('https://via.placeholder.com/150?text=Dummy+Logo');
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    console.log('Password reset requested for', email);
  };

  return (
    <div className="auth-container">
      {logoUrl && <img src={logoUrl} alt="Company Logo" className="company-logo" />}
      <div className="auth-header">
        <h1>Forgot Password</h1>
        <p>Enter your email to reset your password.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <button type="submit" className="submit-button">Reset Password</button>
      </form>
      <div className="company-details">
        <p><strong>RODRIMINE LIMITED</strong></p>
        <p>Head Office: 82 Ikwerre Road, Opposite Seventh-Day Adventist Church, Rumuokwuta, Port Harcourt, Rivers State</p>
        <p>Phone: +2349163287340 | +2348033199472</p>
        <p>Current Date & Time: {currentDateTime} WAT</p>
      </div>
      <p className="switch-link"><a href="/login">Back to Login</a></p>
    </div>
  );
};

export default ForgotPassword;