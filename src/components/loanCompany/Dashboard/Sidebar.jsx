import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dashboard as DashboardIcon, People as PeopleIcon, MonetizationOn as MonetizationIcon } from '@mui/icons-material';
import './Dashboard.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { name: 'Dashboard', path: '/company/admin', icon: DashboardIcon },
    { name: 'Investors', path: '/company/admin/investors', icon: PeopleIcon },
    { name: 'Investments', path: '/company/admin/investments', icon: MonetizationIcon },
  ];

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span>{isCollapsed ? '>' : '<'}</span>
      </button>
      <ul>
        {menuItems.map(item => (
          <li key={item.path}>
            <NavLink to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <item.icon className="nav-icon" />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;