import React from 'react';
import { Route, Routes } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import Home from '../CRMLandingPages/Home';

const LandingPage = () => {
  usePageTitle(); 

  return (
    <div className='AdminPage'>
      <div className='Main_Company_Page'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default LandingPage;