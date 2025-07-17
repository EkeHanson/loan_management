import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import usePageTitle from '../../hooks/usecrmPageTitle';

// Components
import DashboardHome from './DashboardHome';
import DashboardNavBar from './DashboardNavBar';
import DashFooter from './DashFooter';

const Dashboard = () => {
  usePageTitle();

  const [shrinkNav, setShrinkNav] = useState(false);

  return (
    <div className={`Dashboard-Page Staff-Dashboard ${shrinkNav ? 'ShrinkNav' : ''}`}>
      <DashboardNavBar />
      <div className='Main_Dashboard_Page Full-MMains'>
        <Routes>
          {/* Pass shrinkNav and setShrinkNav as props */}
          <Route
            path="/*"
            element={<DashboardHome shrinkNav={shrinkNav} setShrinkNav={setShrinkNav} />}
          />
        </Routes>
      </div>
      <DashFooter />
    </div>
  );
};

export default Dashboard;
