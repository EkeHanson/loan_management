import React, { useState, useEffect, useContext } from 'react';
import { Tooltip } from '@mui/material';
import {
  Lock as LockIcon,
  Block as SuspendIcon,
  Restore as RestoreIcon,
  DeleteForever as HardDeleteIcon,
  Search as SearchIcon,
  Delete as SoftDeleteIcon,
} from '@mui/icons-material';

import { DashboardContext } from '../../../context/DashboardContext';
import './Dashboard.css';

const InvestorActions = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    console.error('DashboardContext is undefined. Ensure InvestorActions is wrapped in DashboardProvider.');
    return <div>Error: Context not found. Please try again later.</div>;
  }
  const { investorsData, setInvestorsData } = context;

  const [filters, setFilters] = useState({ search: '', showDeleted: false });
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    count: 0,
  });

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectInvestor = (id) => setSelectedInvestors(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedInvestors(selectedInvestors.length === paginatedInvestors.length ? [] : paginatedInvestors.map(i => i.id));

  const filteredInvestors = investorsData.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(filters.search.toLowerCase()) || investor.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDeleted = filters.showDeleted ? investor.isDeleted : !investor.isDeleted;
    return matchesSearch && matchesDeleted;
  });

  useEffect(() => {
    setPagination(prev => ({ ...prev, count: filteredInvestors.length }));
  }, [filteredInvestors]);

  const paginatedInvestors = filteredInvestors.slice(
    (pagination.currentPage - 1) * pagination.rowsPerPage,
    pagination.currentPage * pagination.rowsPerPage
  );

  const handleChangePage = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination(prev => ({
      ...prev,
      rowsPerPage: parseInt(event.target.value, 10),
      currentPage: 1,
    }));
  };

  const handleLockToggle = (id) => {
    if (window.confirm('Are you sure you want to toggle the account lock status?')) {
      setInvestorsData(prev =>
        prev.map(investor =>
          investor.id === id ? { ...investor, isLocked: !investor.isLocked } : investor
        )
      );
    }
  };

  const handleSuspendToggle = (id) => {
    if (window.confirm('Are you sure you want to toggle the suspension status?')) {
      setInvestorsData(prev =>
        prev.map(investor =>
          investor.id === id ? { ...investor, isSuspended: !investor.isSuspended } : investor
        )
      );
    }
  };

  const handleSoftDelete = (id) => {
    if (window.confirm('Are you sure you want to soft delete this investor? They can be recovered later.')) {
      setInvestorsData(prev =>
        prev.map(investor =>
          investor.id === id ? { ...investor, isDeleted: true } : investor
        )
      );
      setSelectedInvestors(prev => prev.filter(i => i !== id));
    }
  };

  const handleHardDelete = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this investor? This action cannot be undone.')) {
      setInvestorsData(prev => prev.filter(investor => investor.id !== id));
      setSelectedInvestors(prev => prev.filter(i => i !== id));
    }
  };

  const handleRecover = (id) => {
    if (window.confirm('Are you sure you want to recover this investor?')) {
      setInvestorsData(prev =>
        prev.map(investor =>
          investor.id === id ? { ...investor, isDeleted: false } : investor
        )
      );
      setSelectedInvestors(prev => prev.filter(i => i !== id));
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Investor Actions</h1>
      <div className="filters">
        <div className="filter-item">
          <div className="search-input">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search investors..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
        <div className="filter-item">
          <label>Show Deleted</label>
          <input
            type="checkbox"
            checked={filters.showDeleted}
            onChange={(e) => handleFilterChange('showDeleted', e.target.checked)}
          />
        </div>
      </div>
      <div className="table-container">
        {paginatedInvestors.length === 0 ? (
          <div className="no-data">No investors found.</div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={selectedInvestors.length === paginatedInvestors.length} onChange={handleSelectAll} /></th>
                  <th>Investor</th>
                  <th>Email</th>
                  <th>2FA</th>
                  <th>ID Verified</th>
                  <th>Auto Reinvest</th>
                  <th>Pending Withdrawals</th>
                  <th>Last Login</th>
                  <th>Suspended</th>
                  <th>Locked</th>
                  <th>Tax ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvestors.map(investor => (
                  <tr key={investor.id}>
                    <td><input type="checkbox" checked={selectedInvestors.includes(investor.id)} onChange={() => handleSelectInvestor(investor.id)} /></td>
                    <td>{investor.name || 'N/A'}</td>
                    <td>{investor.email || 'N/A'}</td>
                    <td>{investor.twoFactorEnabled ? 'Yes' : 'No'}</td>
                    <td>{investor.idVerified ? 'Yes' : 'No'}</td>
                    <td>{investor.autoReinvest ? 'Yes' : 'No'}</td>
                    <td>${(investor.pendingWithdrawals || 0).toLocaleString()}</td>
                    <td className="hide-on-mobile">{formatDate(investor.lastLogin)}</td>
                    <td>{investor.isSuspended ? 'Yes' : 'No'}</td>
                    <td>{investor.isLocked ? 'Yes' : 'No'}</td>
                    <td className="hide-on-mobile">{investor.taxId || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        {investor.isDeleted ? (
                          <Tooltip title="Recover Investor" arrow>
                            <button className="btn btn-icon" onClick={() => handleRecover(investor.id)}>
                              <RestoreIcon className="btn-icon" />
                            </button>
                          </Tooltip>
                        ) : (
                          <>
                            <Tooltip title={investor.isLocked ? 'Unlock Account' : 'Lock Account'} arrow>
                              <button className="btn btn-icon" onClick={() => handleLockToggle(investor.id)}>
                                {investor.isLocked ? <UnlockIcon className="btn-icon" /> : <LockIcon className="btn-icon" />}
                              </button>
                            </Tooltip>
                            <Tooltip title={investor.isSuspended ? 'Unsuspend' : 'Suspend'} arrow>
                              <button className="btn btn-icon" onClick={() => handleSuspendToggle(investor.id)}>
                                <SuspendIcon className="btn-icon" />
                              </button>
                            </Tooltip>
                            <Tooltip title="Soft Delete" arrow>
                              <button className="btn btn-icon" onClick={() => handleSoftDelete(investor.id)}>
                                <SoftDeleteIcon className="btn-icon" />
                              </button>
                            </Tooltip>
                            <Tooltip title="Hard Delete" arrow>
                              <button className="btn btn-icon" onClick={() => handleHardDelete(investor.id)}>
                                <HardDeleteIcon className="btn-icon" />
                              </button>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card-list">
              {paginatedInvestors.map(investor => (
                <div key={investor.id} className="investor-card">
                  <div className="card-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedInvestors.includes(investor.id)}
                      onChange={() => handleSelectInvestor(investor.id)}
                    />
                  </div>
                  <div className="card-content">
                    <div><strong>Name:</strong> {investor.name || 'N/A'}</div>
                    <div><strong>Email:</strong> {investor.email || 'N/A'}</div>
                    <div><strong>2FA:</strong> {investor.twoFactorEnabled ? 'Yes' : 'No'}</div>
                    <div><strong>ID Verified:</strong> {investor.idVerified ? 'Yes' : 'No'}</div>
                    <div><strong>Auto Reinvest:</strong> {investor.autoReinvest ? 'Yes' : 'No'}</div>
                    <div><strong>Pending Withdrawals:</strong> ${(investor.pendingWithdrawals || 0).toLocaleString()}</div>
                    <div><strong>Suspended:</strong> {investor.isSuspended ? 'Yes' : 'No'}</div>
                    <div><strong>Locked:</strong> {investor.isLocked ? 'Yes' : 'No'}</div>
                  </div>
                  <div className="card-actions">
                    {investor.isDeleted ? (
                      <Tooltip title="Recover Investor" arrow>
                        <button className="btn btn-icon" onClick={() => handleRecover(investor.id)}>
                          <RestoreIcon className="btn-icon" />
                        </button>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip title={investor.isLocked ? 'Unlock Account' : 'Lock Account'} arrow>
                          <button className="btn btn-icon" onClick={() => handleLockToggle(investor.id)}>
                            {investor.isLocked ? <UnlockIcon className="btn-icon" /> : <LockIcon className="btn-icon" />}
                          </button>
                        </Tooltip>
                        <Tooltip title={investor.isSuspended ? 'Unsuspend' : 'Suspend'} arrow>
                          <button className="btn btn-icon" onClick={() => handleSuspendToggle(investor.id)}>
                            <SuspendIcon className="btn-icon" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Soft Delete" arrow>
                          <button className="btn btn-icon" onClick={() => handleSoftDelete(investor.id)}>
                            <SoftDeleteIcon className="btn-icon" />
                          </button>
                        </Tooltip>
                        <Tooltip title="Hard Delete" arrow>
                          <button className="btn btn-icon" onClick={() => handleHardDelete(investor.id)}>
                            <HardDeleteIcon className="btn-icon" />
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="custom-pagination">
          <div className="pagination-items">
            <span>Items per page:</span>
            <select value={pagination.rowsPerPage} onChange={handleChangeRowsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
          <div className="pagination-nav">
            <span className="page-info">
              {((pagination.currentPage - 1) * pagination.rowsPerPage + 1)}-
              {Math.min(pagination.currentPage * pagination.rowsPerPage, pagination.count)} of {pagination.count}
            </span>
            <div className="pagination-buttons">
              <button
                onClick={() => handleChangePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="pagination-prev"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={() => handleChangePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage * pagination.rowsPerPage >= pagination.count}
                className="pagination-next"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorActions;

