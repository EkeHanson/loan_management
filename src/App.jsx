import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/loanCompany/Home/Home';
import InvestorRegistration from './components/loanCompany/InvestorRegistration/InvestorRegistration';
import Login from './components/loanCompany/Login/Login';
import Signup from './components/loanCompany/Login/Signup';
import ForgotPassword from './components/loanCompany/Login/ForgotPassword';
import AdminDashboard from './components/loanCompany/Dashboard/Dashboard';
import InvestorManagement from './components/loanCompany/Dashboard/InvestorManagement';
import InvestmentManagement from './components/loanCompany/Dashboard/InvestmentManagement';

import ScrollToTop from './assets/ScrollToTop';
import { MobileNavProvider, useMobileNav } from './context/MobileNavContext';
import { DashboardProvider } from './context/DashboardContext'; 
import { InvestmentFeaturesProvider } from './context/InvestmentFeaturesContext';
import { ClockProvider } from './context/ClockContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  // const { mobileNavActive } = useMobileNav();

  return (
    <div >
      <ScrollToTop />
      <MobileNavProvider>
        <ClockProvider>
          <InvestmentFeaturesProvider>
            <DashboardProvider>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<InvestorRegistration />} />
                  <Route path="/company/admin/*" element={<AdminDashboard />}>
                    <Route path="investors" element={<InvestorManagement />} />
                    <Route path="investments" element={<InvestmentManagement />} />
                    <Route path="" element={<div>Welcome to Admin Dashboard</div>} />
                  </Route>
                </Routes>
              </ErrorBoundary>
            </DashboardProvider>
          </InvestmentFeaturesProvider>
        </ClockProvider>
      </MobileNavProvider>
    </div>
  );
}

export default App;


