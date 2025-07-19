import React, { useState, useEffect, useContext } from 'react';
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
import { DashboardContext } from '../../../context/DashboardContext';
import InvestorProfile from './InvestorProfile';
import './Dashboard.css';

const InvestorManagement = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    console.error('DashboardContext is undefined. Ensure InvestorManagement is wrapped in DashboardProvider.');
    return <div>Error: Context not found. Please try again later.</div>;
  }
  const { investorsData, setInvestorsData } = context;

  const [filters, setFilters] = useState({ search: '', status: 'all', dateFrom: null, dateTo: null });
  const [selectedInvestors, setSelectedInvestors] = useState([]);
  const [showAddInvestor, setShowAddInvestor] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    count: 0,
  });
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [newInvestor, setNewInvestor] = useState({
    name: '',
    email: '',
    phone: '',
    kycStatus: 'pending',
    totalInvested: 0,
    roiEarned: 0,
    walletBalance: 0,
    referredBy: '',
    taxId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (investorsData.length === 0) {
      setInvestorsData([
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
          referredBy: 'jane@example.com',
          twoFactorEnabled: false,
          idVerified: true,
          activePlans: 2,
          maturedPlans: 0,
          nextRoiDate: '2025-08-01',
          autoReinvest: false,
          pendingWithdrawals: 0,
          lastWithdrawal: null,
          role: 'Investor',
          isSuspended: false,
          lastLogin: '2025-07-15',
          createdBy: 'admin',
          auditTrail: true,
          taxId: '123456789',
          isLocked: false,
          isDeleted: false,
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
          referredBy: 'john@example.com',
          twoFactorEnabled: false,
          idVerified: false,
          activePlans: 1,
          maturedPlans: 0,
          nextRoiDate: '2025-08-01',
          autoReinvest: true,
          pendingWithdrawals: 100,
          lastWithdrawal: '2025-07-10',
          role: 'Investor',
          isSuspended: false,
          lastLogin: '2025-07-12',
          createdBy: 'admin',
          auditTrail: true,
          taxId: '987654321',
          isLocked: false,
          isDeleted: false,
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
          referredBy: 'jane@example.com',
          twoFactorEnabled: false,
          idVerified: false,
          activePlans: 0,
          maturedPlans: 1,
          nextRoiDate: null,
          autoReinvest: false,
          pendingWithdrawals: 0,
          lastWithdrawal: null,
          role: 'Investor',
          isSuspended: true,
          lastLogin: '2025-06-01',
          createdBy: 'admin',
          auditTrail: false,
          taxId: null,
          isLocked: true,
          isDeleted: false,
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
          referredBy: 'michael@example.com',
          twoFactorEnabled: true,
          idVerified: true,
          activePlans: 3,
          maturedPlans: 0,
          nextRoiDate: '2025-07-20',
          autoReinvest: true,
          pendingWithdrawals: 200,
          lastWithdrawal: '2025-07-05',
          role: 'Investor',
          isSuspended: false,
          lastLogin: '2025-07-17',
          createdBy: 'admin',
          auditTrail: true,
          taxId: '456789123',
          isLocked: false,
          isDeleted: false,
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
          referredBy: 'alice@example.com',
          twoFactorEnabled: false,
          idVerified: true,
          activePlans: 2,
          maturedPlans: 1,
          nextRoiDate: '2025-07-25',
          autoReinvest: false,
          pendingWithdrawals: 0,
          lastWithdrawal: '2025-06-20',
          role: 'Investor',
          isSuspended: false,
          lastLogin: '2025-07-16',
          createdBy: 'admin',
          auditTrail: true,
          taxId: '789123456',
          isLocked: false,
          isDeleted: false,
        },
      ]);
    }
  }, [investorsData, setInvestorsData]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectInvestor = (id) => setSelectedInvestors(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleSelectAll = () => setSelectedInvestors(selectedInvestors.length === paginatedInvestors.length ? [] : paginatedInvestors.map(i => i.id));

  const filteredInvestors = investorsData.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(filters.search.toLowerCase()) || investor.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || investor.status === filters.status;
    const matchesDate = (!filters.dateFrom || investor.createdAt >= filters.dateFrom) && (!filters.dateTo || investor.createdAt <= filters.dateTo);
    return matchesSearch && matchesStatus && matchesDate && !investor.isDeleted;
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

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedInvestors.length} investor(s)?`)) {
      setInvestorsData(prev => prev.filter(investor => !selectedInvestors.includes(investor.id)));
      setSelectedInvestors([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newInvestor.name.trim()) newErrors.name = 'Name is required';
    if (!newInvestor.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newInvestor.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (newInvestor.phone && !/^\+?\d{10,15}$/.test(newInvestor.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (newInvestor.totalInvested < 0) newErrors.totalInvested = 'Total invested cannot be negative';
    if (newInvestor.roiEarned < 0) newErrors.roiEarned = 'ROI earned cannot be negative';
    if (newInvestor.walletBalance < 0) newErrors.walletBalance = 'Wallet balance cannot be negative';
    if (newInvestor.taxId && !/^\d{9}$/.test(newInvestor.taxId)) {
      newErrors.taxId = 'Tax ID must be 9 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddInvestor = () => {
    if (!validateForm()) return;
    const newId = investorsData.length > 0 ? Math.max(...investorsData.map(i => i.id)) + 1 : 1;
    const investor = {
      id: newId,
      name: newInvestor.name,
      email: newInvestor.email,
      status: newInvestor.kycStatus === 'verified' ? 'active' : 'pending',
      createdAt: new Date(),
      phone: newInvestor.phone || 'N/A',
      kycStatus: newInvestor.kycStatus,
      totalInvested: Number(newInvestor.totalInvested) || 0,
      roiEarned: Number(newInvestor.roiEarned) || 0,
      walletBalance: Number(newInvestor.walletBalance) || 0,
      referredBy: newInvestor.referredBy || 'N/A',
      twoFactorEnabled: false,
      idVerified: newInvestor.kycStatus === 'verified',
      activePlans: 0,
      maturedPlans: 0,
      nextRoiDate: null,
      autoReinvest: false,
      pendingWithdrawals: 0,
      lastWithdrawal: null,
      role: 'Investor',
      isSuspended: false,
      lastLogin: null,
      createdBy: 'admin',
      auditTrail: true,
      taxId: newInvestor.taxId || 'N/A',
      isLocked: false,
      isDeleted: false,
    };
    setInvestorsData(prev => [...prev, investor]);
    setNewInvestor({
      name: '',
      email: '',
      phone: '',
      kycStatus: 'pending',
      totalInvested: 0,
      roiEarned: 0,
      walletBalance: 0,
      referredBy: '',
      taxId: '',
    });
    setShowAddInvestor(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestor(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const stats = [
    { title: 'Total Investors', value: investorsData.filter(i => !i.isDeleted).length, icon: AddIcon, change: '+5% this month' },
    { title: 'Active', value: investorsData.filter(i => i.status === 'active' && !i.isDeleted).length, icon: AddIcon, change: 'Active' },
    { title: 'Pending KYC', value: investorsData.filter(i => i.status === 'pending' && !i.isDeleted).length, icon: UploadIcon, change: 'Pending' },
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
          <button className="btn btn-primary" onClick={() => setShowAddInvestor(true)}>
            <AddIcon className="btn-icon" /> Add Investor
          </button>
          {selectedInvestors.length > 0 && (
            <button className="btn btn-error" onClick={handleDeleteSelected}>
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
              <option value="inactive">Inactive</option>
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
                    <th>Status</th>
                    <th>Phone</th>
                    <th>KYC Status</th>
                    <th>Total Invested</th>
                    <th>ROI Earned</th>
                    <th>Wallet</th>
                    <th>Referred By</th>
                    <th>Active Plans</th>
                    <th>Matured Plans</th>
                    <th>Next ROI Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvestors.map(investor => (
                    <tr key={investor.id}>
                      <td><input type="checkbox" checked={selectedInvestors.includes(investor.id)} onChange={() => handleSelectInvestor(investor.id)} /></td>
                      <td>{investor.name || 'N/A'}</td>
                      <td>{investor.email || 'N/A'}</td>
                      <td>{investor.status || 'N/A'}</td>
                      <td className="hide-on-mobile">{investor.phone || 'N/A'}</td>
                      <td>{investor.kycStatus || 'N/A'}</td>
                      <td>${(investor.totalInvested || 0).toLocaleString()}</td>
                      <td>${(investor.roiEarned || 0).toLocaleString()}</td>
                      <td>${(investor.walletBalance || 0).toLocaleString()}</td>
                      <td className="hide-on-mobile">{investor.referredBy || 'N/A'}</td>
                      <td>{investor.activePlans || 0}</td>
                      <td className="hide-on-mobile">{investor.maturedPlans || 0}</td>
                      <td className="hide-on-mobile">{formatDate(investor.nextRoiDate)}</td>
                      <td>
                        <Tooltip title="View Investor Profile" arrow>
                          <button className="btn btn-icon" onClick={() => handleViewProfile(investor)}>
                            <UploadIcon className="btn-icon" />
                          </button>
                        </Tooltip>
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
                      <div><strong>Status:</strong> {investor.status || 'N/A'}</div>
                      <div><strong>KYC Status:</strong> {investor.kycStatus || 'N/A'}</div>
                      <div><strong>Total Invested:</strong> ${(investor.totalInvested || 0).toLocaleString()}</div>
                      <div><strong>ROI Earned:</strong> ${(investor.roiEarned || 0).toLocaleString()}</div>
                      <div><strong>Wallet:</strong> ${(investor.walletBalance || 0).toLocaleString()}</div>
                      <div><strong>Active Plans:</strong> {investor.activePlans || 0}</div>
                    </div>
                    <div className="card-actions">
                      <Tooltip title="View Investor Profile" arrow>
                        <button className="btn btn-icon" onClick={() => handleViewProfile(investor)}>
                          <UploadIcon className="btn-icon" />
                        </button>
                      </Tooltip>
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
        {showAddInvestor && (
          <div className="dialog">
            <div className="dialog-backdrop" onClick={() => setShowAddInvestor(false)}></div>
            <div className="dialog-content">
              <div className="dialog-header">
                <h3>Add New Investor</h3>
                <button className="dialog-close" onClick={() => setShowAddInvestor(false)}>
                  <CloseIcon className="btn-icon" />
                </button>
              </div>
              <div className="dialog-body">
                <div className="form">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newInvestor.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={newInvestor.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={newInvestor.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label>KYC Status</label>
                    <select
                      name="kycStatus"
                      value={newInvestor.kycStatus}
                      onChange={handleInputChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Total Invested ($)</label>
                    <input
                      type="number"
                      name="totalInvested"
                      value={newInvestor.totalInvested}
                      onChange={handleInputChange}
                      placeholder="Enter total invested"
                      min="0"
                    />
                    {errors.totalInvested && <span className="error">{errors.totalInvested}</span>}
                  </div>
                  <div className="form-group">
                    <label>ROI Earned ($)</label>
                    <input
                      type="number"
                      name="roiEarned"
                      value={newInvestor.roiEarned}
                      onChange={handleInputChange}
                      placeholder="Enter ROI earned"
                      min="0"
                    />
                    {errors.roiEarned && <span className="error">{errors.roiEarned}</span>}
                  </div>
                  <div className="form-group">
                    <label>Wallet Balance ($)</label>
                    <input
                      type="number"
                      name="walletBalance"
                      value={newInvestor.walletBalance}
                      onChange={handleInputChange}
                      placeholder="Enter wallet balance"
                      min="0"
                    />
                    {errors.walletBalance && <span className="error">{errors.walletBalance}</span>}
                  </div>
                  <div className="form-group">
                    <label>Referred By</label>
                    <input
                      type="text"
                      name="referredBy"
                      value={newInvestor.referredBy}
                      onChange={handleInputChange}
                      placeholder="Enter referrer email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tax ID</label>
                    <input
                      type="text"
                      name="taxId"
                      value={newInvestor.taxId}
                      onChange={handleInputChange}
                      placeholder="Enter 9-digit tax ID"
                    />
                    {errors.taxId && <span className="error">{errors.taxId}</span>}
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary" onClick={handleAddInvestor}>
                    Add Investor
                  </button>
                  <button className="btn btn-error" onClick={() => setShowAddInvestor(false)}>
                    Cancel
                  </button>
                </div>
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