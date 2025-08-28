import React, { useState } from "react";
import "./admin.css";

// Add New User Modal
export function AddUserModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    role: "Active",
    branchAccess: []
  });

  const branches = ["A", "B", "C"];
  const subBranches = {
    "A": ["HR-01", "HR-02", "HR-03"],
    "B": ["FIN-01", "FIN-02", "FIN-03"], 
    "C": ["INV-01", "INV-02", "INV-03"]
  };

  const handleBranchChange = (branch, isChecked) => {
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        branchAccess: [...prev.branchAccess, branch]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        branchAccess: prev.branchAccess.filter(b => b !== branch)
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({ fullName: "", emailAddress: "", password: "", role: "Active", branchAccess: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050
    }}>
      <div className="modal-content" style={{
        background: 'white',
        borderRadius: '12px',
        width: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
          <h5 style={{ margin: 0, fontWeight: '600' }}>Add New User</h5>
          <button 
            className="btn-close" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body" style={{ padding: '20px' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              
              <div className="form-group mb-3">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
                />
              </div>
              
              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              
              <div className="form-group mb-3">
                <label className="form-label">Role</label>
                <select 
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Branch Access</label>
              <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e9ecef', borderRadius: '8px', padding: '10px' }}>
                {branches.map(branch => (
                  <div key={branch} className="mb-2">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={branch}
                        checked={formData.branchAccess.includes(branch)}
                        onChange={(e) => handleBranchChange(branch, e.target.checked)}
                      />
                      <label className="form-check-label fw-bold" htmlFor={branch}>
                        Branch {branch}
                      </label>
                    </div>
                    {subBranches[branch].map(sub => (
                      <div key={sub} className="form-check ms-3">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={sub}
                          checked={formData.branchAccess.includes(sub)}
                          onChange={(e) => handleBranchChange(sub, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={sub}>
                          {sub}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer" style={{ padding: '20px', borderTop: '1px solid #e9ecef', textAlign: 'right' }}>
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Create User</button>
        </div>
      </div>
    </div>
  );
}

// Create Access Module Modal
export function CreateGroupModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    groupName: "",
    mainBranch: "",
    dataBranches: [],
    assignedUsers: []
  });

  const availableUsers = ["John Smith", "Sarah Johnson", "Mike Wilson", "Lisa Anderson", "Tom Brown"];
  const branches = ["Branch A", "Branch B", "Branch C"];
  const dataBranches = ["HR-01", "HR-02", "FIN-01", "FIN-02", "INV-01"];

  const handleDataBranchChange = (branch, isChecked) => {
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        dataBranches: [...prev.dataBranches, branch]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dataBranches: prev.dataBranches.filter(b => b !== branch)
      }));
    }
  };

  const handleUserChange = (user, isChecked) => {
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        assignedUsers: [...prev.assignedUsers, user]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        assignedUsers: prev.assignedUsers.filter(u => u !== user)
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({ groupName: "", mainBranch: "", dataBranches: [], assignedUsers: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050
    }}>
      <div className="modal-content" style={{
        background: 'white',
        borderRadius: '12px',
        width: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
          <h5 style={{ margin: 0, fontWeight: '600' }}>Create New Access Group</h5>
          <button 
            className="btn-close" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body" style={{ padding: '20px' }}>
          <div className="form-group mb-3">
            <label className="form-label">Group Name</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Enter group name"
              value={formData.groupName}
              onChange={(e) => setFormData(prev => ({ ...prev, groupName: e.target.value }))}
            />
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label">Select Main Branch</label>
            <select 
              className="form-select"
              value={formData.mainBranch}
              onChange={(e) => setFormData(prev => ({ ...prev, mainBranch: e.target.value }))}
            >
              <option value="">Select branch...</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Data/Branches</label>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e9ecef', borderRadius: '8px', padding: '10px' }}>
                {dataBranches.map(branch => (
                  <div key={branch} className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`data-${branch}`}
                      checked={formData.dataBranches.includes(branch)}
                      onChange={(e) => handleDataBranchChange(branch, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`data-${branch}`}>
                      {branch}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Assigned Users</label>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e9ecef', borderRadius: '8px', padding: '10px' }}>
                {availableUsers.map(user => (
                  <div key={user} className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`user-${user}`}
                      checked={formData.assignedUsers.includes(user)}
                      onChange={(e) => handleUserChange(user, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`user-${user}`}>
                      {user}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer" style={{ padding: '20px', borderTop: '1px solid #e9ecef', textAlign: 'right' }}>
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Create Group</button>
        </div>
      </div>
    </div>
  );
}

// Filter Modal for Reports
export function FilterModal({ isOpen, onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    branch: "",
    group: "",
    status: "",
    dateRange: "",
    requestedBy: ""
  });

  const branches = ["North America", "Europe", "Asia Pacific", "EMEA", "Americas"];
  const groups = ["Financial", "Compliance", "Operations", "Market Risk", "Credit Risk", "Regulatory"];
  const statuses = ["Requested", "Accessible", "Downloadable"];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({ branch: "", group: "", status: "", dateRange: "", requestedBy: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050
    }}>
      <div className="modal-content" style={{
        background: 'white',
        borderRadius: '12px',
        width: '500px'
      }}>
        <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
          <h5 style={{ margin: 0, fontWeight: '600' }}>Filter Reports</h5>
          <button 
            className="btn-close" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body" style={{ padding: '20px' }}>
          <div className="form-group mb-3">
            <label className="form-label">Branch</label>
            <select 
              className="form-select"
              value={filters.branch}
              onChange={(e) => setFilters(prev => ({ ...prev, branch: e.target.value }))}
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label">Group</label>
            <select 
              className="form-select"
              value={filters.group}
              onChange={(e) => setFilters(prev => ({ ...prev, group: e.target.value }))}
            >
              <option value="">All Groups</option>
              {groups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label">Status</label>
            <select 
              className="form-select"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group mb-3">
            <label className="form-label">Date Range</label>
            <select 
              className="form-select"
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
        
        <div className="modal-footer" style={{ padding: '20px', borderTop: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-outline-secondary" onClick={handleClear}>Clear All</button>
          <div>
            <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleApply}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Recent Reports Modal
export function RecentReportsModal({ isOpen, onClose }) {
  const recentReports = [
    {
      id: 1,
      name: "Q4 Risk Assessment Report",
      requestedBy: { name: "Sarah Johnson", initials: "SJ" },
      branch: "North America",
      group: "Financial",
      date: "Jan 15, 2024",
      status: "requested",
      description: "Quarterly risk assessment for financial operations"
    },
    {
      id: 2,
      name: "Market Risk Assessment",
      requestedBy: { name: "David Smith", initials: "DS" },
      branch: "EMEA",
      group: "Market Risk",
      date: "Jan 12, 2024",
      status: "requested",
      description: "Market risk evaluation for trading operations"
    },
    {
      id: 3,
      name: "Regulatory Impact Study",
      requestedBy: { name: "Michael Chen", initials: "MC" },
      branch: "Asia Pacific",
      group: "Regulatory",
      date: "Jan 10, 2024",
      status: "requested",
      description: "Impact analysis for upcoming regulatory changes"
    }
  ];

  const handleApprove = (reportId) => {
    console.log("Approve report:", reportId);
    // Handle approval logic here
  };

  const handleReject = (reportId) => {
    console.log("Reject report:", reportId);
    // Handle rejection logic here
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050
    }}>
      <div className="modal-content" style={{
        background: 'white',
        borderRadius: '12px',
        width: '800px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="modal-header" style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
          <h5 style={{ margin: 0, fontWeight: '600' }}>Recent Report Requests</h5>
          <small style={{ color: '#6c757d' }}>Latest report requests and pending approvals</small>
          <button 
            className="btn-close" 
            onClick={onClose}
            style={{ 
              position: 'absolute',
              right: '20px',
              top: '20px',
              background: 'none', 
              border: 'none', 
              fontSize: '20px', 
              cursor: 'pointer' 
            }}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <i className="bi bi-hourglass-split" style={{ color: '#ff9800' }}></i>
              <h6 style={{ margin: 0, fontWeight: '600' }}>Pending Approvals (3)</h6>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentReports.map((report) => (
                <div key={report.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '16px',
                  borderLeft: '4px solid #ffc107'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h6 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{report.name}</h6>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#2196f3',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {report.requestedBy.initials}
                          </div>
                          <span style={{ fontWeight: '500' }}>{report.requestedBy.name}</span>
                        </div>
                        <span style={{ color: '#2196f3', fontSize: '12px', background: '#e3f2fd', padding: '2px 8px', borderRadius: '12px' }}>
                          {report.branch} • {report.group}
                        </span>
                        <span style={{ color: '#6c757d', fontSize: '12px' }}>{report.date}</span>
                      </div>
                      <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>{report.description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                      <span style={{
                        background: '#ffc107',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button 
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => handleReject(report.id)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                    <button 
                      style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => handleApprove(report.id)}
                    >
                      <i className="bi bi-check"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer" style={{ 
          padding: '20px', 
          borderTop: '1px solid #e9ecef', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button 
            className="btn btn-outline-secondary"
            style={{ border: '1px solid #6c757d', color: '#6c757d' }}
            onClick={onClose}
          >
            Close
          </button>
          <button className="btn btn-primary">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
}
