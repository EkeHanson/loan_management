import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import ChattingSystem from './ChattingApp';
import './DashboardHome.css';

import Home from './Home';
import MyTasks from './MyTasks';

const DashboardHome = ({ shrinkNav, setShrinkNav }) => {
  return (
    <div className="DB-Envt">
      {/* Pass setShrinkNav so SideNavBar can toggle */}
      <SideNavBar setShrinkNav={setShrinkNav} />
      <ChattingSystem />
      <div className='Main-DB-Envt'>
        <div className='DB-Envt-Container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-tasks" element={<MyTasks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
