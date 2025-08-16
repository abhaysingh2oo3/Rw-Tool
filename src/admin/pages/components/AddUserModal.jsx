import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Modal from './Modal';
import './AddUserModal.css';

const AddUserModal = ({ isOpen, onClose, onSubmit, initialData = null, title = "Add New User" }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    assignedBranch: initialData?.assignedBranch || '',
    role: initialData?.role || '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Update form data when initial data changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName,
        email: initialData.email,
        assignedBranch: initialData.assignedBranch,
        role: initialData.role,
        password: ''
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        assignedBranch: '',
        role: '',
        password: ''
      });
    }
    setErrors({});
  }, [initialData]);

  const branchOptions = [
    { value: 'HR-01', label: 'HR-01' },
    { value: 'HR-02', label: 'HR-02' },
    { value: 'HR-03', label: 'HR-03' },
    { value: 'FIN-01', label: 'FIN-01' },
    { value: 'FIN-02', label: 'FIN-02' },
    { value: 'FIN-03', label: 'FIN-03' }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.assignedBranch) {
      newErrors.assignedBranch = 'Please select a branch';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    // Password validation only for new users or when password is provided for editing
    if (!initialData && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: initialData?.fullName || '',
      email: initialData?.email || '',
      assignedBranch: initialData?.assignedBranch || '',
      role: initialData?.role || '',
      password: ''
    });
    setErrors({});
    setShowPassword(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={title}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter full name"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row form-row-two">
          <div className="form-group">
            <label htmlFor="assignedBranch">Assigned Branch</label>
            <select
              id="assignedBranch"
              value={formData.assignedBranch}
              onChange={(e) => handleChange('assignedBranch', e.target.value)}
              className={errors.assignedBranch ? 'error' : ''}
            >
              <option value="">Select Branch</option>
              {branchOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.assignedBranch && <span className="error-message">{errors.assignedBranch}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select Role</option>
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">{initialData ? 'New Password (optional)' : 'Password'}</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder={initialData ? 'Leave blank to keep current password' : 'Enter password'}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
