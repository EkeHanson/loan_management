import React, { useState, useEffect, useContext } from 'react';
import { Tooltip } from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { DashboardContext } from '../../../context/DashboardContext';
import './Dashboard.css';

const InvestmentManagement = () => {
  const { investmentsData, setInvestmentsData, processPayment } = useContext(DashboardContext);
  const [filters, setFilters] = useState({ search: '', status: 'all', dateFrom: null, dateTo: null });
  const [selectedInvestments, setSelectedInvestments] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
    count: 0,
  });

  useEffect(() => {
    if (investmentsData.length === 0) {
      setInvestmentsData([
        {
          id: 1,
          planName: 'Fixed 12%',
          amount: 5000,
          startDate: new Date('2025-06-01'),
          status: 'Active',
          investorId: 1,
          investorName: 'John Doe',
        },
        {
          id: 2,
          planName: 'Flexible 3.3%',
          amount: 3000,
          startDate: new Date('2025-07-01'),
          status: 'Pending',
          investorId: 2,
          investorName: 'Jane Smith',
        },
      ]);
    }
  }, [investmentsData, setInvestmentsData]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSelectInvestment = (id) =>
    setSelectedInvestments(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

  const handleSelectAll = () => {
    const allSelected = selectedInvestments.length === paginatedInvestments.length;
    setSelectedInvestments(allSelected ? [] : paginatedInvestments.map(i => i.id));
  };

  const filteredInvestments = investmentsData.filter(investment => {
    const matchesSearch =
      investment.planName.toLowerCase().includes(filters.search.toLowerCase()) ||
      investment.investorName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === 'all' || investment.status === filters.status;
    const startDate = investment.startDate instanceof Date ? investment.startDate : new Date(investment.startDate);
    const matchesDate =
      (!filters.dateFrom || startDate >= filters.dateFrom) &&
      (!filters.dateTo || startDate <= filters.dateTo);
    return matchesSearch && matchesStatus && matchesDate;
  });

  useEffect(() => {
    setPagination(prev => ({ ...prev, count: filteredInvestments.length }));
  }, [filteredInvestments]);

  const paginatedInvestments = filteredInvestments.slice(
    (pagination.currentPage - 1) * pagination.rowsPerPage,
    pagination.currentPage * pagination.rowsPerPage
  );

  const handleChangePage = (newPage) =>
    setPagination(prev => ({ ...prev, currentPage: newPage }));

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      currentPage: 1,
    });
  };

  const handleProcessPayment = (investment) => {
    processPayment(investment.id, investment.amount);
  };

  const stats = [
    { title: 'Total Investments', value: investmentsData.length, icon: AddIcon, change: '+3% this month' },
    { title: 'Active', value: investmentsData.filter(i => i.status === 'Active').length, icon: AddIcon, change: 'Active' },
    { title: 'Pending', value: investmentsData.filter(i => i.status === 'Pending').length, icon: AddIcon, change: 'Pending' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          <button className="btn btn-primary" onClick={() => {}}>
            <AddIcon className="btn-icon" /> Add Investment
          </button>
          {selectedInvestments.length > 0 && (
            <button className="btn btn-error" onClick={() => {}}>
              <DeleteIcon className="btn-icon" /> Delete Selected ({selectedInvestments.length})
            </button>
          )}
        </div>
        <div className="filters">
          <div className="filter-item">
            <div className="search-input">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search investments..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-item">
            <label>Status</label>
            <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="filter-item">
            <label>From</label>
            <DatePicker
              value={filters.dateFrom}
              onChange={(newValue) => handleFilterChange('dateFrom', newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </div>
          <div className="filter-item">
            <label>To</label>
            <DatePicker
              value={filters.dateTo}
              onChange={(newValue) => handleFilterChange('dateTo', newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </div>
          <div className="filter-buttons">
            <button
              className="btn btn-icon"
              onClick={() =>
                setFilters({ search: '', status: 'all', dateFrom: null, dateTo: null })
              }
            >
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
                <th>
                  <input
                    type="checkbox"
                    checked={selectedInvestments.length === paginatedInvestments.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Plan Name</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Investor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvestments.map(investment => (
                <tr key={investment.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedInvestments.includes(investment.id)}
                      onChange={() => handleSelectInvestment(investment.id)}
                    />
                  </td>
                  <td>{investment.planName}</td>
                  <td>${investment.amount}</td>
                  <td>{(investment.startDate instanceof Date ? investment.startDate : new Date(investment.startDate)).toLocaleDateString()}</td>
                  <td>{investment.status}</td>
                  <td>{investment.investorName}</td>
                  <td>
                    <Tooltip title="Process Payment" arrow>
                      <button
                        className="btn btn-icon"
                        onClick={() => handleProcessPayment(investment)}
                      >
                        <AddIcon className="btn-icon" />
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
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => handleChangePage(pagination.currentPage + 1)}
                  disabled={pagination.currentPage * pagination.rowsPerPage >= pagination.count}
                  className="pagination-next"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default InvestmentManagement;