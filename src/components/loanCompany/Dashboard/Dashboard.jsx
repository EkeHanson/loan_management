import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ActivityLog from './ActivityLog';
import './Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-wrapper">
          <Outlet />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;