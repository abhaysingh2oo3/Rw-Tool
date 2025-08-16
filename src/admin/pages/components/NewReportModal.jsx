import React, { useState } from 'react';
import { useReports } from '../../context/ReportsContext';
import './NewReportModal.css';

// Professional SVG Icons
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NewReportModal = ({ isOpen, onClose }) => {
  const { addReport } = useReports();
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    module: '',
    requestedBy: '',
    priority: 'Medium',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const branches = [
    'North America',
    'Europe',
    'Asia Pacific', 
    'EMEA',
    'Americas',
    'Global'
  ];

  const modules = [
    'Financial',
    'Compliance',
    'Operations',
    'Market Risk',
    'Credit Risk',
    'Technology',
    'Regulatory'
  ];

  const priorities = ['High', 'Medium', 'Low'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.branch || !formData.module || !formData.requestedBy) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add the report
      const newReport = addReport(formData);
      
      // Reset form
      setFormData({
        name: '',
        branch: '',
        module: '',
        requestedBy: '',
        priority: 'Medium',
        description: ''
      });
      
      // Show success message
      alert(`Report "${newReport.name}" has been submitted for approval!`);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error adding report:', error);
      alert('Failed to submit report. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      name: '',
      branch: '',
      module: '',
      requestedBy: '',
      priority: 'Medium',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="new-report-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>New Report Request</h2>
            <p className="modal-description">Create a new report request for approval</p>
          </div>
          <button className="close-button" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                Report Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Q1 Financial Analysis Report"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="requestedBy" className="form-label required">
                Requested By
              </label>
              <input
                type="text"
                id="requestedBy"
                name="requestedBy"
                value={formData.requestedBy}
                onChange={handleInputChange}
                placeholder="e.g., John Smith"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="branch" className="form-label required">
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="module" className="form-label required">
                Module
              </label>
              <select
                id="module"
                name="module"
                value={formData.module}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Module</option>
                {modules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the report purpose and scope..."
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReportModal;
