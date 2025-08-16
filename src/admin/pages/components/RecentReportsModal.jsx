import React from 'react';
import { useReports } from '../../context/ReportsContext';
import './RecentReportsModal.css';

// Professional SVG Icons
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RecentReportsModal = ({ isOpen, onClose }) => {
  const { 
    getRecentReports, 
    getPendingApprovals, 
    approveReport, 
    rejectReport 
  } = useReports();

  const recentReports = getRecentReports();
  const pendingApprovals = getPendingApprovals();

  const handleAction = (action, reportId) => {
    switch(action) {
      case 'approve':
        approveReport(reportId);
        break;
      case 'reject':
        rejectReport(reportId);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="recent-reports-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <h2>Recent Report Requests</h2>
            <p className="modal-description">Latest report requests and pending approvals</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="modal-content">
          {/* Pending Approvals Section */}
          {pendingApprovals.length > 0 && (
            <div className="section">
              <div className="section-header">
                <div className="section-title">
                  <ClockIcon />
                  <span>Pending Approvals ({pendingApprovals.length})</span>
                </div>
              </div>
              
              <div className="reports-list">
                {pendingApprovals.slice(0, 3).map((report) => (
                  <div key={report.id} className="report-item urgent">
                    <div className="report-info">
                      <div className="report-header">
                        <h4 className="report-name">{report.name}</h4>
                        <span className={`status-badge ${getStatusBadgeClass(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      
                      <div className="report-meta">
                        <div className="requester">
                          <div className="user-avatar">{report.avatar}</div>
                          <span>{report.requestedBy}</span>
                        </div>
                        <span className="branch-info">{report.branch} • {report.module}</span>
                        <span className="time-ago">{getTimeAgo(report.requestDate)}</span>
                      </div>
                      
                      {report.description && (
                        <p className="report-description">{report.description}</p>
                      )}
                    </div>
                    
                    <div className="action-buttons">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reports Section */}
          <div className="section">
            <div className="section-header">
              <div className="section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Recent Reports ({recentReports.length})</span>
              </div>
            </div>
            
            <div className="reports-list">
              {recentReports.map((report) => (
                <div key={report.id} className="report-item">
                  <div className="report-info">
                    <div className="report-header">
                      <h4 className="report-name">{report.name}</h4>
                      <span className={`status-badge ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <div className="report-meta">
                      <div className="requester">
                        <div className="user-avatar">{report.avatar}</div>
                        <span>{report.requestedBy}</span>
                      </div>
                      <span className="branch-info">{report.branch} • {report.module}</span>
                      <span className="time-ago">{getTimeAgo(report.requestDate)}</span>
                    </div>
                    
                    {report.description && (
                      <p className="report-description">{report.description}</p>
                    )}
                  </div>
                  
                  {report.priority && (
                    <div className={`priority-indicator priority-${report.priority.toLowerCase()}`}>
                      {report.priority}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              onClose();
              // Navigate to reports page - you can implement this navigation
              window.location.href = '/reports';
            }}
          >
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentReportsModal;
