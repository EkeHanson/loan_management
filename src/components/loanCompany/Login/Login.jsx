import React, { useState, useEffect } from 'react';
import './Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberedEmail'));
  const [logoUrl, setLogoUrl] = useState('');
  const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    // Dummy logo URL for now, to be replaced with API call
    setLogoUrl('https://via.placeholder.com/150?text=Dummy+Logo');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', credentials.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    // Add login logic here
    console.log('Login submitted', credentials);
  };

  return (
    <div className="auth-container">
      {logoUrl && <img src={logoUrl} alt="Company Logo" className="company-logo" />}
      <div className="auth-header">
        <h1>Login to LoanElite</h1>
        <p>Welcome back! Access your account securely.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>
        <div className="form-options">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} /> Remember Me
          </label>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <div className="company-details">
        <p><strong>RODRIMINE LIMITED</strong></p>
        <p>Head Office: 82 Ikwerre Road, Opposite Seventh-Day Adventist Church, Rumuokwuta, Port Harcourt, Rivers State</p>
        <p>Phone: +2349163287340 | +2348033199472</p>
        <p>Current Date & Time: {currentDateTime} WAT</p>
      </div>
      <p className="switch-link">Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;