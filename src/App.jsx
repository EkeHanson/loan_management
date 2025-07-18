import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CRMLandingpage from './Pages/CRMLandingPages/CRMLandingpage';
import './App.css';
import Home from './components/loanCompany/Home/Home';
import InvestorRegistration from './components/loanCompany/InvestorRegistration/InvestorRegistration';
import Login from './components/loanCompany/Login/Login';
import Signup from './components/loanCompany/Login/Signup';
import ForgotPassword from './components/loanCompany/Login/ForgotPassword';
import CompanyDashboard from './Pages/CompanyDashboard/Dashboard';
import StaffDashboard from './Pages/StaffDashboard/Dashboard';
import SocialCallback from './Pages/CRMLandingPages/SocialCallback';
import ScrollToTop from './assets/ScrollToTop';
import JobApplication from './Pages/CRMLandingPages/JobApplication';
import { useMobileNav } from './context/MobileNavContext';
import { DashboardProvider } from './components/loanCompany/Dashboard/DashboardContext';
import AdminDashboard from './components/loanCompany/Dashboard/Dashboard';

function App() {
  const { mobileNavActive } = useMobileNav();

  return (
    <div className={`App ${mobileNavActive ? 'GenActivee-MObileNav' : ''}`}>
      <ScrollToTop />
      <DashboardProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<InvestorRegistration />} />
          <Route path="/company/admin" element={<AdminDashboard />} />
          <Route path="/company/*" element={<CompanyDashboard />} />
          <Route path="/staff/*" element={<StaffDashboard />} />
          <Route path="/api/social/callback/" element={<SocialCallback />} />
          <Route path="/jobs/:unique_link" element={<JobApplication />} />
        </Routes>
      </DashboardProvider>
    </div>
  );
}

export default App;