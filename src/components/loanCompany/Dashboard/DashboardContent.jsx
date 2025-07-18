import React, { useContext } from 'react';
import DashboardContext from './DashboardContext';
import InvestorManagement from './InvestorManagement';
import InvestmentManagement from './InvestmentManagement';
import './Dashboard.css';

const DashboardContent = ({ activeSection }) => {
  const { currentDateTime, notifications } = useContext(DashboardContext);

  const overviewData = {
    totalInvestors: 150,
    activeInvestments: 120,
    pendingWithdrawals: 15,
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="overview-cards">
            <div className="card">
              <h3>Total Investors</h3>
              <p>{overviewData.totalInvestors}</p>
            </div>
            <div className="card">
              <h3>Active Investments</h3>
              <p>{overviewData.activeInvestments}</p>
            </div>
            <div className="card">
              <h3>Pending Withdrawals</h3>
              <p>{overviewData.pendingWithdrawals}</p>
            </div>
          </div>
        );
      case 'investors':
        return <InvestorManagement />;
      case 'investments':
        return <InvestmentManagement />;
      case 'earnings':
        return <p>Earnings & ROI Content Here</p>;
      case 'reports':
        return <p>Reports Content Here</p>;
      case 'analytics':
        return <p>Analytics Content Here</p>;
      case 'settings':
        return <p>Settings Content Here</p>;
      default:
        return <p>Select a section from the sidebar</p>;
    }
  };

  return (
    <div className="dashboard-content">
      <div className="date-time">{currentDateTime} WAT</div>
      {notifications.length > 0 && (
        <div className="notification-panel">
          <h3>Notifications</h3>
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>
                {notification.message} ({notification.time}) [{notification.type.toUpperCase()}]
              </li>
            ))}
          </ul>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default DashboardContent;

