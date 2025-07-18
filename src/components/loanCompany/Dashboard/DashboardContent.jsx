import React, { useContext } from 'react';
import { DashboardContext } from './DashboardContext';
import InvestorManagement from './InvestorManagement';
import InvestmentManagement from './InvestmentManagement';
import { People as PeopleIcon, MonetizationOn as MonetizationOnIcon, HourglassEmpty as HourglassEmptyIcon } from '@mui/icons-material';
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
            <div className="infographic-card">
              <div className="infographic-header">
                <PeopleIcon className="infographic-icon" />
                <h3>Total Investors</h3>
              </div>
              <div className="infographic-value">{overviewData.totalInvestors}</div>
              <div className="infographic-progress">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring__background"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#EDE9FE"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    className="progress-ring__progress"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#6B21A8"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="226.2"
                    strokeDashoffset={226.2 * (1 - overviewData.totalInvestors / 200)} // Assuming max 200 investors
                  />
                </svg>
                <span className="progress-label">{((overviewData.totalInvestors / 200) * 100).toFixed(0)}% of target</span>
              </div>
            </div>
            <div className="infographic-card">
              <div className="infographic-header">
                <MonetizationOnIcon className="infographic-icon" />
                <h3>Active Investments</h3>
              </div>
              <div className="infographic-value">{overviewData.activeInvestments}</div>
              <div className="infographic-progress">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring__background"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#EDE9FE"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    className="progress-ring__progress"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#A855F7"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="226.2"
                    strokeDashoffset={226.2 * (1 - overviewData.activeInvestments / 150)} // Assuming max 150 investments
                  />
                </svg>
                <span className="progress-label">{((overviewData.activeInvestments / 150) * 100).toFixed(0)}% of target</span>
              </div>
            </div>
            <div className="infographic-card">
              <div className="infographic-header">
                <HourglassEmptyIcon className="infographic-icon" />
                <h3>Pending Withdrawals</h3>
              </div>
              <div className="infographic-value">{overviewData.pendingWithdrawals}</div>
              <div className="infographic-progress">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring__background"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#EDE9FE"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    className="progress-ring__progress"
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#EF4444"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="226.2"
                    strokeDashoffset={226.2 * (1 - overviewData.pendingWithdrawals / 50)} // Assuming max 50 withdrawals
                  />
                </svg>
                <span className="progress-label">{((overviewData.pendingWithdrawals / 50) * 100).toFixed(0)}% of max</span>
              </div>
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