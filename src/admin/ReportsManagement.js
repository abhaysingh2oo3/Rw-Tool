import React, { useState } from "react";
import "./admin.css";

export default function ReportsManagement() {
  const [activeTab, setActiveTab] = useState("all-reports");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample reports data
  const reports = [
    {
      id: 1,
      name: "Q4 Risk Assessment Report",
      branch: "North America",
      module: "Financial",
      status: "requested",
      requestedBy: {
        name: "Sarah Johnson",
        initials: "SJ"
      },
      requestDate: "2024-01-15",
      actions: ["approve", "reject", "view", "delete"]
    },
    {
      id: 2,
      name: "Annual Compliance Review",
      branch: "Europe",
      module: "Compliance",
      status: "accessible",
      requestedBy: {
        name: "Michael Chen",
        initials: "MC"
      },
      requestDate: "2024-01-14",
      actions: ["download", "view", "delete"]
    },
    {
      id: 3,
      name: "Operational Risk Analysis",
      branch: "Asia Pacific",
      module: "Operations",
      status: "downloadable",
      requestedBy: {
        name: "Emily Wong",
        initials: "EW"
      },
      requestDate: "2024-01-13",
      actions: ["download", "view", "delete"]
    },
    {
      id: 4,
      name: "Market Risk Assessment",
      branch: "EMEA",
      module: "Market Risk",
      status: "requested",
      requestedBy: {
        name: "David Smith",
        initials: "DS"
      },
      requestDate: "2024-01-12",
      actions: ["approve", "reject", "view", "delete"]
    },
    {
      id: 5,
      name: "Credit Risk Report",
      branch: "Americas",
      module: "Credit Risk",
      status: "accessible",
      requestedBy: {
        name: "Lisa Anderson",
        initials: "LA"
      },
      requestDate: "2024-01-11",
      actions: ["download", "view", "delete"]
    },
    {
      id: 6,
      name: "Regulatory Impact Study",
      branch: "North America",
      module: "Regulatory",
      status: "requested",
      requestedBy: {
        name: "James Wilson",
        initials: "JW"
      },
      requestDate: "2024-01-10",
      actions: ["approve", "reject", "view", "delete"]
    }
  ];

  const getFilteredReports = () => {
    let filtered = reports;
    
    if (activeTab === "pending-approvals") {
      filtered = reports.filter(report => report.status === "requested");
    } else if (activeTab === "approved-reports") {
      filtered = reports.filter(report => report.status === "accessible" || report.status === "downloadable");
    }
    
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.requestedBy.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTabCount = (tabType) => {
    if (tabType === "all") return reports.length;
    if (tabType === "pending") return reports.filter(r => r.status === "requested").length;
    if (tabType === "approved") return reports.filter(r => r.status === "accessible" || r.status === "downloadable").length;
    return 0;
  };

  const handleNewReport = () => {
    console.log("Create new report");
  };

  const handleAction = (reportId, action) => {
    console.log(`${action} report:`, reportId);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ color: '#212529', fontWeight: '600', margin: 0 }}>All Reports</h4>
          <p className="mb-0" style={{ color: '#6c757d', fontSize: '14px' }}>
            Manage and track all report requests and approvals
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-funnel me-2"></i>
            Filters
          </button>
          <button className="create-module-btn" onClick={handleNewReport}>
            <i className="bi bi-plus"></i>
            New Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'all-reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('all-reports')}
            >
              <i className="bi bi-file-earmark-bar-graph me-2"></i>
              All Reports
              <span className="badge bg-secondary ms-2">{getTabCount('all')}</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'pending-approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending-approvals')}
            >
              <i className="bi bi-hourglass-split me-2"></i>
              Pending Approvals
              <span className="badge bg-warning ms-2">{getTabCount('pending')}</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'approved-reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('approved-reports')}
            >
              <i className="bi bi-check-circle me-2"></i>
              Approved Reports
              <span className="badge bg-success ms-2">{getTabCount('approved')}</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Filters */}
      <div className="reports-filters mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-end">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-download me-2"></i>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Reports Count */}
      <div className="mb-4">
        <p className="mb-0" style={{ color: '#6c757d', fontSize: '14px' }}>
          Showing {getFilteredReports().length} of {getFilteredReports().length} reports
        </p>
      </div>

      {/* Reports Table */}
      <div className="reports-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>REPORT NAME</th>
                <th>BRANCH</th>
                <th>MODULE</th>
                <th>STATUS</th>
                <th>REQUESTED BY</th>
                <th>REQUEST DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredReports().map((report) => (
                <tr key={report.id}>
                  <td>{report.name}</td>
                  <td>
                    <span className="branch-tag">{report.branch}</span>
                  </td>
                  <td>{report.module}</td>
                  <td>
                    <span className={`status-badge ${report.status}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="user-avatar me-2">{report.requestedBy.initials}</div>
                      <span>{report.requestedBy.name}</span>
                    </div>
                  </td>
                  <td>{report.requestDate}</td>
                  <td>
                    <div className="report-actions">
                      {report.status === "requested" && (
                        <>
                          <button
                            className="action-btn"
                            onClick={() => handleAction(report.id, 'approve')}
                            title="Approve"
                            style={{ borderColor: '#4caf50', color: '#4caf50' }}
                          >
                            <i className="bi bi-check"></i>
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => handleAction(report.id, 'reject')}
                            title="Reject"
                            style={{ borderColor: '#f44336', color: '#f44336' }}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </>
                      )}
                      {(report.status === "accessible" || report.status === "downloadable") && (
                        <button
                          className="action-btn"
                          onClick={() => handleAction(report.id, 'download')}
                          title="Download"
                          style={{ borderColor: '#2196f3', color: '#2196f3' }}
                        >
                          <i className="bi bi-download"></i>
                        </button>
                      )}
                      <button
                        className="action-btn edit"
                        onClick={() => handleAction(report.id, 'view')}
                        title="View"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleAction(report.id, 'delete')}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleAction(report.id, 'more')}
                        title="More options"
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
