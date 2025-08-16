import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [reports, setReports] = useState([
    { name: "My Account Statement", date: "2023-08-01", type: "PDF", folder: "Personal Documents", status: "Available", isFavorite: true },
    { name: "Loan Summary Report", date: "2023-07-25", type: "Excel", folder: "Banking", status: "Available", isFavorite: false },
    { name: "Credit Card Transactions", date: "2023-07-20", type: "CSV", folder: "Finance", status: "Processing", isFavorite: false },
    { name: "KYC Submission Receipt", date: "2023-07-15", type: "PDF", folder: "Compliance", status: "Available", isFavorite: true },
    { name: "Investment Portfolio", date: "2023-07-10", type: "PDF", folder: "Investments", status: "Archived", isFavorite: false }
  ]);

  const [recentReports, setRecentReports] = useState(["Loan Summary Report", "KYC Submission Receipt"]);

  // Toggle favorites dynamically
  const toggleFavorite = (reportName) => {
    setReports((prev) =>
      prev.map((r) =>
        r.name === reportName ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  // Mark viewed report dynamically
  const markAsViewed = (reportName) => {
    setRecentReports((prev) => {
      const updated = [reportName, ...prev.filter((r) => r !== reportName)];
      return updated.slice(0, 5);
    });
  };

  // Filtering logic
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      r.status === statusFilter ||
      (statusFilter === "Favorites" && r.isFavorite);
    return matchesSearch && matchesStatus;
  });

  // Favorites list
  const favoriteReports = reports.filter((r) => r.isFavorite).map((r) => r.name);

  // Unique folders
  const folderList = [...new Set(reports.map(r => r.folder))];

  return (
    <div className="d-flex flex-column vh-100">
      <Header 
        username="User" 
        lastLogin={new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        notifications={[1]} 
      />

      <div className="d-flex flex-grow-1">
        <Sidebar 
          favorites={favoriteReports} 
          lastViewed={recentReports} 
          folders={folderList}
          selectedFilter={statusFilter}
          onOpenReport={markAsViewed}
          onFilterChange={(filter) => setStatusFilter(filter === "All Time" ? "All" : filter)}
        />

        <div className="flex-grow-1 p-4 sc-bg-light">
          {/* Search + Filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <select
                className="form-select ms-2"
                style={{ maxWidth: "200px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Reports</option>
                {[...new Set(reports.map(r => r.status))].map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="sc-card-gradient sc-available">
                <div className="stat-num">{reports.length}</div>
                <div className="stat-label">Total Reports</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sc-card-gradient sc-favorites">
                <div className="stat-num">{favoriteReports.length}</div>
                <div className="stat-label">Favorites</div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Report Name</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Folder</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, idx) => (
                  <tr key={idx}>
                    <td>{report.name}</td>
                    <td>{report.date}</td>
                    <td><span className="badge bg-secondary">{report.type}</span></td>
                    <td>{report.folder}</td>
                    <td>
                      <span
                        className={`badge ${
                          report.status === "Available"
                            ? "bg-success"
                            : report.status === "Processing"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        title="Download Report"
                      >
                        <i className="bi bi-download"></i>
                      </button>
                      <button
                        className={`btn btn-sm me-1 ${report.isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        title={report.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        onClick={() => toggleFavorite(report.name)}
                      >
                        <i className="bi bi-star-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-info"
                        title="View Details"
                        onClick={() => markAsViewed(report.name)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
