import React, { useState, useEffect } from 'react';
import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import './Dashboard.css';

let logIdCounter = 0;

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const addLog = (action, user = 'Admin') => {
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
      setLogs(prevLogs => [
        { id: `${Date.now()}-${logIdCounter++}`, action, timestamp, user },
        ...prevLogs
      ].slice(0, 10));
    };

    addLog('User logged in');
    addLog('Investor "John Doe" added');

    const interval = setInterval(() => {
      const actions = ['Investment plan updated', 'Investor status changed to active'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      addLog(randomAction);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="activity-log">
      <h2 className="activity-title">Activity Log</h2>
      <div className="log-list">
        {logs.length > 0 ? (
          logs.map(log => (
            <div key={log.id} className="log-item">
              <AccessTimeIcon className="log-icon" />
              <div className="log-content">
                <span>{log.action}</span>
                <span className="log-time">{log.timestamp} by {log.user}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="log-no-data">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;