import React, { createContext, useState, useEffect } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('superadmin');
  const [notifications, setNotifications] = useState([]);
  const [investorsData, setInvestorsData] = useState([]);
  const [investmentsData, setInvestmentsData] = useState([]);
  const [kycFiles, setKycFiles] = useState({});
  const [roiLogs, setRoiLogs] = useState([]);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({});
  const [emailConfig, setEmailConfig] = useState({ enabled: true, recipient: 'admin@example.com' });
  const [smsConfig, setSmsConfig] = useState({ enabled: true, number: '+1234567890' });
  const currentDateTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    setInvestorsData([
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', kycStatus: 'Pending', createdAt: new Date('2025-07-01') },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', kycStatus: 'Pending', createdAt: new Date('2025-06-15') },
    ]);

    setInvestmentsData([
      { id: 1, planName: 'Fixed 12%', amount: 5000, startDate: new Date('2025-06-01'), status: 'Active', investorId: 1, investorName: 'John Doe' },
      { id: 2, planName: 'Flexible 3.3%', amount: 3000, startDate: new Date('2025-07-01'), status: 'Pending', investorId: 2, investorName: 'Jane Smith' },
    ]);

    setRoiLogs([
      { id: 1, investmentId: 1, amount: 60, date: new Date('2025-07-01'), status: 'Paid' },
      { id: 2, investmentId: 1, amount: 60, date: new Date('2025-07-15'), status: 'Pending' },
    ]);

    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New alert at ${new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}`,
        time: new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: true }),
        type: Math.random() > 0.5 ? 'email' : 'sms',
      };
      setNotifications((prev) => [...prev, newNotification].slice(-3));
      if (emailConfig.enabled) simulateEmailSend(newNotification);
      if (smsConfig.enabled) simulateSmsSend(newNotification);
    }, 10000);

    return () => clearInterval(interval);
  }, [emailConfig.enabled, smsConfig.enabled]);

  const simulateEmailSend = (notification) => {
    console.log(`Sending email to ${emailConfig.recipient}: ${notification.message}`);
  };

  const simulateSmsSend = (notification) => {
    console.log(`Sending SMS to ${smsConfig.number}: ${notification.message}`);
  };

  const processPayment = (investmentId, amount) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [investmentId]: { amount, status: 'Processed', date: new Date().toISOString() },
    }));
    console.log(`Payment of $${amount} processed for investment ${investmentId}`);
  };

  return (
    <DashboardContext.Provider value={{ userRole, setUserRole, notifications, setNotifications, investorsData, setInvestorsData, investmentsData, setInvestmentsData, kycFiles, setKycFiles, roiLogs, setRoiLogs, is2FAEnabled, setIs2FAEnabled, paymentStatus, processPayment, emailConfig, setEmailConfig, smsConfig, setSmsConfig, currentDateTime }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;

