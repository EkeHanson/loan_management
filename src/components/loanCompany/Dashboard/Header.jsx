import React from 'react';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import './Dashboard.css';

const Header = () => {
  return (
    <header className="header">
      <div className="user-info">
        <span>Welcome, Admin</span>
        <button className="notification-btn">
          <NotificationsIcon className="header-icon" />
          <span>3</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

