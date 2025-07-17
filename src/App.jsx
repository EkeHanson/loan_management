import { Routes, Route } from 'react-router-dom';
import CRMLandingpage from './Pages/CRMLandingPages/CRMLandingpage';
import './App.css';
import Home from './components/Home/Home';
import CompanyDashboard from './Pages/CompanyDashboard/Dashboard';
import StaffDashboard from './Pages/StaffDashboard/Dashboard';
import SocialCallback from './Pages/CRMLandingPages/SocialCallback';
import ScrollToTop from './assets/ScrollToTop';
import JobApplication from './Pages/CRMLandingPages/JobApplication';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import { useMobileNav } from './context/MobileNavContext'; // ✅ Import context



function App() {
  const { mobileNavActive } = useMobileNav();

  return (
    <div className={`App ${mobileNavActive ? 'GenActivee-MObileNav' : ''}`}>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/company/*" element={<CompanyDashboard />} />
          {/* Add other protected routes here if needed */}
        </Route>
        
          <Route path="/staff/*" element={<StaffDashboard />} />
          <Route path="/staff/*" element={<StaffDashboard />} />
        <Route path="/api/social/callback/" element={<SocialCallback />} />
        <Route path="/jobs/:unique_link" element={<JobApplication />} />
      </Routes>
    </div>
  );
}

export default App;