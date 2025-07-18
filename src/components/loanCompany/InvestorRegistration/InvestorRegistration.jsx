import React, { useState, useEffect } from 'react';
import './InvestorRegistration.css';

const InvestorRegistration = () => {
  const [formData, setFormData] = useState({
    surname: '', firstName: '', otherName: '', residentialAddress: '', homeAddress: '',
    phoneNumber: '', sex: '', roiFrequency: '', policyDate: '', investmentAmount: '',
    interestAmount: '', disbursementBank: '', accountName: '', accountNumber: '',
    nextOfKinName: '', nextOfKinAddress: '', nextOfKinPhone: '', nextOfKinSex: '',
    referredBy: '', investorSignature: '', investorDate: '', directorSignature: '', directorDate: ''
  });
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // Dummy logo URL for now, to be replaced with API call
    setLogoUrl('https://via.placeholder.com/150?text=Dummy+Logo');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger PDF download
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('RODRIMINE LIMITED', 20, 20);
    doc.text('HEAD OFFICE: 82 Ikwerre Road, Opposite Seventh-Day Adventist Church, Rumuokwuta, Port Harcourt, Rivers State', 20, 30);
    doc.text('+2349163287340 | +2348033199472', 20, 40);
    doc.text('FLEXIBLE INVESTMENT PLAN', 20, 50);
    let yPos = 60;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        doc.text(`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`, 20, yPos += 10);
      }
    });
    doc.save('investor_registration.pdf');
  };

  return (
    <div className="registration-container">
      {logoUrl && <img src={logoUrl} alt="Company Logo" className="company-logo" />}
      <div className="registration-header">
        <h1>Investor Registration & KYC</h1>
        <p>Complete your flexible investment plan with secure online registration.</p>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Investor's Full Name</label>
          <div className="name-fields">
            <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="otherName" placeholder="Other Name" value={formData.otherName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Residential Address</label>
          <input type="text" name="residentialAddress" placeholder="Enter residential address" value={formData.residentialAddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Home Address</label>
          <input type="text" name="homeAddress" placeholder="Enter home address" value={formData.homeAddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>ROI Frequency</label>
          <select name="roiFrequency" value={formData.roiFrequency} onChange={handleChange}>
            <option value="">Select Frequency</option>
            <option value="monthly">Monthly</option>
            <option value="on-demand">On Demand</option>
          </select>
        </div>
        <div className="form-group">
          <label>Policy Date</label>
          <input type="date" name="policyDate" value={formData.policyDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Investment Amount</label>
          <input type="number" name="investmentAmount" placeholder="Enter amount" value={formData.investmentAmount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Interest Amount</label>
          <input type="number" name="interestAmount" placeholder="Enter interest amount" value={formData.interestAmount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Disbursement Bank</label>
          <input type="text" name="disbursementBank" placeholder="Enter bank name" value={formData.disbursementBank} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Account Name</label>
          <input type="text" name="accountName" placeholder="Enter account name" value={formData.accountName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input type="text" name="accountNumber" placeholder="Enter account number" value={formData.accountNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Next of Kin Name</label>
          <input type="text" name="nextOfKinName" placeholder="Enter next of kin name" value={formData.nextOfKinName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Next of Kin Address</label>
          <input type="text" name="nextOfKinAddress" placeholder="Enter next of kin address" value={formData.nextOfKinAddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Next of Kin Phone</label>
          <input type="tel" name="nextOfKinPhone" placeholder="Enter next of kin phone" value={formData.nextOfKinPhone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Next of Kin Sex</label>
          <select name="nextOfKinSex" value={formData.nextOfKinSex} onChange={handleChange}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Referred By</label>
          <input type="text" name="referredBy" placeholder="Enter referrer name" value={formData.referredBy} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Investor's Signature & Date</label>
          <input type="text" name="investorSignature" placeholder="Enter signature or upload" value={formData.investorSignature} onChange={handleChange} />
          <input type="date" name="investorDate" value={formData.investorDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Rodrimine Director's Signature & Date</label>
          <input type="text" name="directorSignature" placeholder="Enter signature or upload" value={formData.directorSignature} onChange={handleChange} />
          <input type="date" name="directorDate" value={formData.directorDate} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Submit Registration</button>
        <button type="button" className="download-button" onClick={handleSubmit}>Download PDF</button>
      </form>
    </div>
  );
};

export default InvestorRegistration;

