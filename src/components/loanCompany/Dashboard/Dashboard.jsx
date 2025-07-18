import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ActivityLog from './ActivityLog';
import DashboardContent from './DashboardContent';
import './Dashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <DashboardContent activeSection={activeSection} />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;