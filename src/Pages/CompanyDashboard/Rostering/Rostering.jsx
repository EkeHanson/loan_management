import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './Rostering.css';
import SideNavBar from './SideNavBar';
import SubNav from './SubNav';
import RosteringHome from './RosteringHome';


const Rostering = () => {
const [shrinkNav, setShrinkNav] = useState(false);

  return (
    <div className='RosttDDn-PAg'>
      <SubNav />
      <div className='RostMain-DB-Envt'>
        <div className='RostDB-Envt-Container'>
          <Routes>
            <Route path="/" element={<RosteringHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Rostering;