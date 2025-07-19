import React, { useState } from 'react';
import { Dashboard as DashboardIcon, People as PeopleIcon, MonetizationOn as MonetizationIcon } from '@mui/icons-material';
import './Dashboard.css';

const Sidebar = ({ setActiveSection, activeSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { name: 'Dashboard', section: 'dashboard', icon: DashboardIcon },
    { name: 'Investors', section: 'investors', icon: PeopleIcon },
    { name: 'Investments', section: 'investments', icon: MonetizationIcon },
  ];

  const handleMenuClick = (section) => {
    setActiveSection(section);
    window.history.pushState({}, '', `/company/admin/${section === 'dashboard' ? '' : section}`);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span>{isCollapsed ? '>' : '<'}</span>
      </button>
      <ul>
        {menuItems.map(item => (
          <li key={item.section}>
            <button
              className={`nav-link ${activeSection === item.section ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.section)}
            >
              <item.icon className="nav-icon" />
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

