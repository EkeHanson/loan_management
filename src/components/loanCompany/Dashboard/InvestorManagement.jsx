import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './Dashboard.css';
import InvestorProfile from './InvestorProfile';

const InvestorManagement = () => {
  const [investors, setInvestors] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: 'all', dateFrom: null, dateTo: null });
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    count: 0,
  });
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  useEffect(() => {
    setInvestors([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        createdAt: new Date('2025-07-01'),
        phone: '+1234567890',
        kycStatus: 'verified',
        totalInvested: 10000,
        roiEarned: 500,
        walletBalance: 300,
        referredBy: 'jane@example.com'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'pending',
        createdAt: new Date('2025-06-15'),
        phone: '+1987654321',
        kycStatus: 'pending',
        totalInvested: 20000,
        roiEarned: 1500,
        walletBalance: 800,
        referredBy: 'john@example.com'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael@example.com',
        status: 'inactive',
        createdAt: new Date('2025-05-20'),
        phone: '+1098765432',
        kycStatus: 'rejected',
        totalInvested: 5000,
        roiEarned: 200,
        walletBalance: 100,
        referredBy: 'jane@example.com'
      },
      {
        id: 4,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        status: 'active',
        createdAt: new Date('2025-04-10'),
        phone: '+1123456789',
        kycStatus: 'verified',
        totalInvested: 15000,
        roiEarned: 700,
        walletBalance: 600,
        referredBy: 'michael@example.com'
      },
      {
        id: 5,
        name: 'Robert Lee',
        email: 'robert@example.com',
        status: 'active',
        createdAt: new Date('2025-03-05'),
        phone: '+1230984567',
        kycStatus: 'verified',
        totalInvested: 12000,
        roiEarned: 900,
        walletBalance: 450,
        referredBy: 'alice@example.com'
      }
    ]);
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectInvestor = (id) => setSelectedInvestors(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedInvestors(selectedInvestors.length === paginatedInvestors.length ? [] : paginatedInvestors.map(i => i.id));

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(filters.search.toLowerCase()) || investor.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || investor.status === filters.status;
    const matchesDate = (!filters.dateFrom || investor.createdAt >= filters.dateFrom) && (!filters.dateTo || investor.createdAt <= filters.dateTo);
    return matchesSearch && matchesStatus && matchesDate;
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

  const handleViewProfile = (investor) => {
    setSelectedInvestor(investor);
  };

  const handleCloseProfile = () => {
    setSelectedInvestor(null);
  };

  const stats = [
    { title: 'Total Investors', value: investors.length, icon: AddIcon, change: '+5% this month' },
    { title: 'Active', value: investors.filter(i => i.status === 'active').length, icon: AddIcon, change: 'Active' },
    { title: 'Pending KYC', value: investors.filter(i => i.status === 'pending').length, icon: UploadIcon, change: 'Pending' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="dashboard-content">
        <h1 className="dashboard-title">Investor Management</h1>
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
          <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
            <AddIcon className="btn-icon" /> Add Investor
          </button>
          {selectedInvestors.length > 0 && (
            <button className="btn btn-error" onClick={() => {}}>
              <DeleteIcon className="btn-icon" /> Delete Selected ({selectedInvestors.length})
            </button>
          )}
        </div>
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
            <label>Status</label>
            <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="filter-item">
            <label>From</label>
            <DatePicker
              value={filters.dateFrom}
              onChange={(newValue) => handleFilterChange('dateFrom', newValue)}
              renderInput={({ inputRef, inputProps }) => <input ref={inputRef} {...inputProps} />}
            />
          </div>
          <div className="filter-item">
            <label>To</label>
            <DatePicker
              value={filters.dateTo}
              onChange={(newValue) => handleFilterChange('dateTo', newValue)}
              renderInput={({ inputRef, inputProps }) => <input ref={inputRef} {...inputProps} />}
            />
          </div>
          <div className="filter-buttons">
            <button className="btn btn-icon" onClick={() => setFilters({ search: '', status: 'all', dateFrom: null, dateTo: null })}>
              <RefreshIcon className="btn-icon" />
            </button>
            <button className="btn btn-icon">
              <FilterIcon className="btn-icon" />
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selectedInvestors.length === paginatedInvestors.length} onChange={handleSelectAll} /></th>
                <th>Investor</th>
                <th>Email</th>
                <th>Status</th>
                <th>Phone</th>
                <th>KYC Status</th>
                <th>Total Invested</th>
                <th>ROI Earned</th>
                <th>Wallet</th>
                <th>Referred By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvestors.map(investor => (
                <tr key={investor.id}>
                  <td><input type="checkbox" checked={selectedInvestors.includes(investor.id)} onChange={() => handleSelectInvestor(investor.id)} /></td>
                  <td>{investor.name}</td>
                  <td>{investor.email}</td>
                  <td>{investor.status}</td>
                  <td>{investor.phone || '-'}</td>
                  <td>{investor.kycStatus || '-'}</td>
                  <td>{investor.totalInvested ? `$${investor.totalInvested}` : '-'}</td>
                  <td>{investor.roiEarned ? `$${investor.roiEarned}` : '-'}</td>
                  <td>{investor.walletBalance ? `$${investor.walletBalance}` : '-'}</td>
                  <td>{investor.referredBy || '-'}</td>
                  <td>
                    <Tooltip title="View Investor Actions" arrow>
                      <button
                        className="btn btn-icon"
                        onClick={() => handleViewProfile(investor)}
                      >
                        <UploadIcon className="btn-icon" />
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
              <select
                value={pagination.rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
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
        {showUpload && (
          <div className="dialog">
            <div className="dialog-backdrop" onClick={() => setShowUpload(false)}></div>
            <div className="dialog-content">
              <div className="dialog-header">
                <h3>Upload Investor Data</h3>
                <button className="dialog-close" onClick={() => setShowUpload(false)}>
                  <CloseIcon className="btn-icon" />
                </button>
              </div>
              <div className="dialog-body">
                <input type="file" onChange={() => {}} />
              </div>
            </div>
          </div>
        )}
        {selectedInvestor && (
          <InvestorProfile
            investor={selectedInvestor}
            onClose={handleCloseProfile}
          />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default InvestorManagement;