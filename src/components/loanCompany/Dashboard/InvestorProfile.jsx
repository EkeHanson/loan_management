import React from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import './Dashboard.css';

const InvestorProfile = ({ investor, onClose }) => {
  const dummyProfilePic = 'https://i.pravatar.cc/150?img=12';

  return (
    <div className="dialog profile-dialog">
      <div className="dialog-backdrop" onClick={onClose}></div>
      <div className="dialog-content">
        <div className="dialog-header">
          <h3>Investor Profile: {investor.name}</h3>
          <button className="dialog-close" onClick={onClose}>
            <CloseIcon className="btn-icon" />
          </button>
        </div>

        <div className="profile-avatar-container">
          <img src={dummyProfilePic} alt="Investor" className="profile-avatar" />
        </div>

        <div className="dialog-body">
          <div className="profile-details">
            {/* Personal Info */}
            <p><strong>Email:</strong> {investor.email}</p>
            <p><strong>Phone:</strong> {investor.phone || '-'}</p>
            <p><strong>Status:</strong> {investor.status}</p>
            <p><strong>Referred By:</strong> {investor.referredBy || '-'}</p>
            <p><strong>Joined:</strong> {investor.createdAt?.toLocaleDateString() || '-'}</p>

            {/* KYC & Security */}
            <p><strong>KYC Status:</strong> {investor.kycStatus || 'Pending'}</p>
            <p><strong>2FA Enabled:</strong> {investor.twoFactorEnabled ? 'Yes' : 'No'}</p>
            <p><strong>ID Verified:</strong> {investor.idVerified ? 'Yes' : 'No'}</p>

            {/* Investment Summary */}
            <p><strong>Total Invested:</strong> ${investor.totalInvested?.toLocaleString() || '0'}</p>
            <p><strong>ROI Earned:</strong> ${investor.roiEarned?.toLocaleString() || '0'}</p>
            <p><strong>Wallet Balance:</strong> ${investor.walletBalance?.toLocaleString() || '0'}</p>
            <p><strong>Current Plans:</strong> {investor.activePlans || 0}</p>
            <p><strong>Matured Investments:</strong> {investor.maturedPlans || 0}</p>
            <p><strong>Next ROI Due:</strong> {investor.nextRoiDate || '-'}</p>
            <p><strong>Auto-Reinvestment:</strong> {investor.autoReinvest ? 'Enabled' : 'Disabled'}</p>

            {/* Withdrawal */}
            <p><strong>Pending Withdrawals:</strong> ${investor.pendingWithdrawals?.toLocaleString() || '0'}</p>
            <p><strong>Last Withdrawal:</strong> {investor.lastWithdrawal || '-'}</p>

            {/* Technical & Admin */}
            <p><strong>User Role:</strong> {investor.role || 'Investor'}</p>
            <p><strong>Account Suspended:</strong> {investor.isSuspended ? 'Yes' : 'No'}</p>
            <p><strong>Last Login:</strong> {investor.lastLogin || '-'}</p>
            <p><strong>Account Created By:</strong> {investor.createdBy || '-'}</p>

            {/* Compliance */}
            <p><strong>Audit Trail Enabled:</strong> {investor.auditTrail ? 'Yes' : 'No'}</p>
            <p><strong>Tax ID / BVN:</strong> {investor.taxId || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
