import React, { useState, useEffect } from 'react';
import { Add as AddIcon, Delete as DeleteIcon, MonetizationOn as MonetizationIcon, Close as CloseIcon } from '@mui/icons-material';
import './Dashboard.css';
// ...imports remain unchanged
import Tooltip from '@mui/material/Tooltip';

import { Visibility as ViewIcon, FileDownload as ContractIcon } from '@mui/icons-material';


const InvestmentManagement = () => {
  const [investments, setInvestments] = useState([]);
  const [selectedInvestments, setSelectedInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ name: '', amount: '' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    count: 0,
  });


useEffect(() => {
  setInvestments([
    {
      id: 1,
      name: 'Plan A',
      amount: 1000,
      status: 'Active',
      startDate: '2024-01-01',
      maturityDate: '2025-01-01',
      roi: 40,
      autoCompound: true,
      contractUrl: '/contracts/plan-a.pdf',
      lastROIPaidDate: '2024-06-01',
    },
    {
      id: 2,
      name: 'Plan B',
      amount: 1500,
      status: 'Inactive',
      startDate: '2023-08-15',
      maturityDate: '2024-08-15',
      roi: 36,
      autoCompound: false,
      contractUrl: '/contracts/plan-b.pdf',
      lastROIPaidDate: '2024-07-01',
    },
    // ...add more mock items if needed
  ]);
}, []);




  useEffect(() => {
    setPagination(prev => ({ ...prev, count: investments.length }));
  }, [investments]);

  const paginatedInvestments = investments.slice(
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

  const handleSelectInvestment = (id) => setSelectedInvestments(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedInvestments(selectedInvestments.length === paginatedInvestments.length ? [] : paginatedInvestments.map(i => i.id));

  const stats = [
    { title: 'Total Plans', value: investments.length, icon: MonetizationIcon, change: '+10% this quarter' },
    { title: 'Active', value: investments.filter(i => i.status === 'active').length, icon: MonetizationIcon, change: 'Active' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvestments([...investments, { id: Date.now(), ...newInvestment, status: 'active' }]);
    setNewInvestment({ name: '', amount: '' });
  };

  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Investment Management</h1>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <span>{stat.title}</span>
              {stat.icon && <stat.icon className="stat-icon" />}
            </div>
            <h3>{stat.value}</h3>
            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => setNewInvestment({ name: '', amount: '' })}>
          <AddIcon className="btn-icon" /> Add Plan
        </button>
        {selectedInvestments.length > 0 && (
          <button className="btn btn-error" onClick={() => {}}>
            <DeleteIcon className="btn-icon" /> Delete Selected ({selectedInvestments.length})
          </button>
        )}
      </div>
      <div className="form-section">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Plan Name</label>
            <input type="text" value={newInvestment.name} onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" value={newInvestment.amount} onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-confirm">Submit</button>
        </form>
      </div>
      <div className="table-container">
        <table className="data-table">
        <thead>
            <tr>
            <th><input type="checkbox" checked={selectedInvestments.length === paginatedInvestments.length} onChange={handleSelectAll} /></th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Start</th>
            <th>Maturity</th>
            <th>ROI %</th>
            <th>Compound</th>
            <th>Contract</th>
            <th>Last ROI</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {paginatedInvestments.map((investment) => (
            <tr key={investment.id}>
                <td>
                <input
                    type="checkbox"
                    checked={selectedInvestments.includes(investment.id)}
                    onChange={() => handleSelectInvestment(investment.id)}
                />
                </td>
                <td>{investment.name}</td>
                <td>${investment.amount}</td>
                <td>{investment.status}</td>
                <td>{investment.startDate}</td>
                <td>{investment.maturityDate}</td>
                <td>{investment.roi}%</td>
                <td>{investment.autoCompound ? 'Yes' : 'No'}</td>
                    <td>
                    {investment.contractUrl && (
                        <Tooltip title="Download Contract">
                        <a href={investment.contractUrl} target="_blank" rel="noopener noreferrer">
                            <ContractIcon className="btn-icon" />
                        </a>
                        </Tooltip>
                    )}
                    </td>
                    <td>{investment.lastROIPaidDate}</td>
                    <td>
                <Tooltip title="View Details">
                    <button className="btn btn-icon">
                    <ViewIcon className="btn-icon" />
                    </button>
                </Tooltip>
                <Tooltip title="Pay ROI">
                    <button className="btn btn-icon">
                    <MonetizationIcon className="btn-icon" />
                    </button>
                </Tooltip>
                </td>

            </tr>
            ))}
        </tbody>
        </table>

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
              {(pagination.currentPage - 1) * pagination.rowsPerPage + 1}-
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

export default InvestmentManagement;


