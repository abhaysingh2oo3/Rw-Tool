import React, { useState, useEffect } from 'react';
import { useReports } from '../../context/ReportsContext';
import NewReportModal from '../components/NewReportModal';
import './ReportsManagement.css';

// Professional SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
    <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
    <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Tab Icons
const TabIcon = ({ type }) => {
  switch(type) {
    case 'all':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 3V7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'pending':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'approved':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4872 2.02168 11.3363C2.16356 9.18536 2.99721 7.13316 4.39828 5.49978C5.79935 3.86641 7.69279 2.73795 9.79619 2.28143C11.8996 1.82491 14.1003 2.06928 16.07 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const ReportsManagement = () => {
  const {
    reports,
    approveReport,
    rejectReport,
    deleteReport,
    getPendingApprovals,
    getApprovedReports
  } = useReports();
  
  const [activeTab, setActiveTab] = useState('all');
  const [filteredReports, setFilteredReports] = useState(reports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  // Get current reports based on active tab
  const getCurrentReports = () => {
    switch(activeTab) {
      case 'pending':
        return getPendingApprovals();
      case 'approved':
        return getApprovedReports();
      default:
        return reports;
    }
  };

  const currentReports = getCurrentReports();
  
  // Get unique values for filters
  const uniqueStatuses = ['All', ...new Set(currentReports.map(report => report.status))];
  const uniqueBranches = ['All', ...new Set(currentReports.map(report => report.branch))];
  const uniqueModules = ['All', ...new Set(currentReports.map(report => report.module))];

  // Filter reports based on search and filters
  useEffect(() => {
    let filtered = currentReports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
      const matchesBranch = selectedBranch === 'All' || report.branch === selectedBranch;
      const matchesModule = selectedModule === 'All' || report.module === selectedModule;
      
      return matchesSearch && matchesStatus && matchesBranch && matchesModule;
    });
    
    setFilteredReports(filtered);
  }, [currentReports, searchTerm, selectedStatus, selectedBranch, selectedModule, activeTab]);

  const handleAction = (action, reportId) => {
    console.log(`${action} action for report ${reportId}`);
    
    switch(action) {
      case 'approve':
        approveReport(reportId);
        break;
      case 'reject':
        rejectReport(reportId);
        break;
      case 'download':
        // TODO: Implement download functionality with backend
        alert(`Downloading report ${reportId}`);
        break;
      case 'edit':
        // TODO: Implement edit functionality
        alert(`Editing report ${reportId}`);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this report?')) {
          deleteReport(reportId);
        }
        break;
      default:
        break;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'requested': return 'status-requested';
      case 'accessible': return 'status-accessible';
      case 'downloadable': return 'status-downloadable';
      case 'rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedBranch('All');
    setSelectedModule('All');
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case 'pending':
        return 'Pending Approvals';
      case 'approved':
        return 'Approved Reports';
      default:
        return 'All Reports';
    }
  };

  const getTabDescription = () => {
    switch(activeTab) {
      case 'pending':
        return 'Review and approve pending report requests';
      case 'approved':
        return 'View and manage approved reports';
      default:
        return 'Manage and track all report requests and approvals';
    }
  };

  return (
    <div className="reports-management">
      <div className="page-header">
        <div className="header-content">
          <h1>{getTabTitle()}</h1>
          <p className="page-description">{getTabDescription()}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon />
            Filters
          </button>
          <button className="btn btn-primary" onClick={() => setShowNewReportModal(true)}>
            <PlusIcon />
            New Report
          </button>
        </div>
      </div>

      <div className="reports-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <TabIcon type="all" />
            All Reports
            <span className="tab-count">{reports.length}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            <TabIcon type="pending" />
            Pending Approvals
            <span className="tab-count">{getPendingApprovals().length}</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            <TabIcon type="approved" />
            Approved Reports
            <span className="tab-count">{getApprovedReports().length}</span>
          </button>
        </div>
      </div>

      <div className="reports-controls">
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Status</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Branch</label>
              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                {uniqueBranches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Module</label>
              <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
                {uniqueModules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>

            <div className="filter-actions">
              <button className="btn btn-outline" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="reports-table-container">
        <div className="table-header">
          <div className="results-info">
            Showing {filteredReports.length} of {currentReports.length} reports
          </div>
          <div className="table-actions">
            <button className="btn btn-outline btn-sm">
              <DownloadIcon />
              Export
            </button>
          </div>
        </div>

        <div className="reports-table">
          <table>
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Branch</th>
                <th>Module</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Request Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="report-name">
                      <span className="name">{report.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="branch-badge">{report.branch}</span>
                  </td>
                  <td>
                    <span className="module-text">{report.module}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{report.avatar}</div>
                      <span className="user-name">{report.requestedBy}</span>
                    </div>
                  </td>
                  <td>
                    <span className="date">{report.requestDate}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {report.status === 'Requested' && (
                        <>
                          <button 
                            className="btn btn-icon btn-success"
                            onClick={() => handleAction('approve', report.id)}
                            title="Approve"
                          >
                            <CheckIcon />
                          </button>
                          <button 
                            className="btn btn-icon btn-danger"
                            onClick={() => handleAction('reject', report.id)}
                            title="Reject"
                          >
                            <XIcon />
                          </button>
                        </>
                      )}
                      
                      {(report.status === 'Accessible' || report.status === 'Downloadable') && (
                        <button 
                          className="btn btn-icon btn-primary"
                          onClick={() => handleAction('download', report.id)}
                          title="Download"
                        >
                          <DownloadIcon />
                        </button>
                      )}
                      
                      <button 
                        className="btn btn-icon btn-outline"
                        onClick={() => handleAction('edit', report.id)}
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      
                      <button 
                        className="btn btn-icon btn-danger-outline"
                        onClick={() => handleAction('delete', report.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                      
                      <div className="dropdown">
                        <button className="btn btn-icon btn-outline dropdown-toggle">
                          <MoreIcon />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">📄</div>
            <h3>No reports found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
      
      <NewReportModal
        isOpen={showNewReportModal}
        onClose={() => setShowNewReportModal(false)}
      />
    </div>
  );
};

export default ReportsManagement;
