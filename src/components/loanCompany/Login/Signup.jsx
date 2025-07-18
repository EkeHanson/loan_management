import React, { useState, useEffect } from 'react';
import './Auth.css';

const Signup = () => {
  const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });
  const [logoUrl, setLogoUrl] = useState('');
  const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    // Dummy logo URL for now, to be replaced with API call
    setLogoUrl('https://via.placeholder.com/150?text=Dummy+Logo');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add signup logic here
    console.log('Signup submitted', userData);
  };

  return (
    <div className="auth-container">
      {logoUrl && <img src={logoUrl} alt="Company Logo" className="company-logo" />}
      <div className="auth-header">
        <h1>Sign Up for LoanElite</h1>
        <p>Create your account to get started with secure loan management.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <div className="company-details">
        <p><strong>RODRIMINE LIMITED</strong></p>
        <p>Head Office: 82 Ikwerre Road, Opposite Seventh-Day Adventist Church, Rumuokwuta, Port Harcourt, Rivers State</p>
        <p>Phone: +2349163287340 | +2348033199472</p>
        <p>Current Date & Time: {currentDateTime} WAT</p>
      </div>
      <p className="switch-link">Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;

