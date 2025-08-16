import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./custom.css";

export default function OpsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reports, setReports] = useState([
    { name: "CIF US Indicia Report", date: "2023-06-24", type: "PDF", folder: "Hong Kong FIRMAML General", status: "Available", isFavorite: true },
    { name: "CIF Data Extract", date: "2023-06-23", type: "CSV", folder: "India FIRMAML Report", status: "Available", isFavorite: false },
    { name: "Monthly Periodic Review", date: "2023-06-22", type: "PDF", folder: "Hong Kong FIRMAML General", status: "Available", isFavorite: true },
    { name: "KYC Reports", date: "2023-06-21", type: "Excel", folder: "Compliance", status: "Available", isFavorite: false },
    { name: "AML Reports", date: "2023-06-20", type: "PDF", folder: "Compliance", status: "Available", isFavorite: false }
  ]);
  const [recentReports, setRecentReports] = useState(["CIF Data Extract", "Monthly Periodic Review"]);

  // Toggle favorites dynamically
  const toggleFavorite = (reportName) => {
    setReports((prev) =>
      prev.map((r) =>
        r.name === reportName ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
    toast.info(`Favorite status updated for: ${reportName}`);
  };

  // Mark viewed dynamically
  const markAsViewed = (reportName) => {
    setRecentReports((prev) => {
      const updated = [reportName, ...prev.filter((r) => r !== reportName)];
      return updated.slice(0, 5);
    });
    Swal.fire({
      title: "Report Viewed",
      text: `${reportName} marked as viewed.`,
      icon: "info",
      confirmButtonText: "OK"
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

  // Folders list
  const folderList = [...new Set(reports.map((r) => r.folder))];

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // back to login page
  };

  return (
    <div className="d-flex flex-column vh-100">

      
      {/* ===== HEADER ===== */}
      <header className="sc-header px-4 d-flex align-items-center justify-content-between shadow-sm">
        <div className="d-flex align-items-center">
          <img src="/logo.png" alt="Standard Chartered" className="me-3" style={{ height: 36 }} />
          <h5 className="mb-0 text-white fw-semibold">Standard Chartered-RW Tool <span className="fw-light"></span></h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-white small text-end d-none d-md-block">
            <div>Hello, <strong>Ops User</strong></div>
            <div className="opacity-75">Last Login: {new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div className="position-relative">
            <button className="btn btn-light btn-sm rounded-circle p-0 notif-btn" style={{ width: 34, height: 34 }} title="Notifications">
              <i className="bi bi-bell-fill" style={{ fontSize: "1.1rem" }}></i>
            </button>
            <span className="notif-badge">2</span>
          </div>
          <button
          className="btn btn-outline-light btn-sm fw-semibold px-3"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        
        {/* ===== SIDEBAR ===== */}
        <aside className="bg-white border-end p-3 sc-sidebar" style={{ width: "250px" }}>
          <h6 className="fw-bold"><i className="bi bi-calendar-range text-primary me-2"></i>Select Date Range</h6>
          <div className="mb-3">
            <label className="form-label">From:</label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">To:</label>
            <input type="date" className="form-control" />
          </div>
          <hr />
          <h6 className="fw-bold"><i className="bi bi-star-fill text-warning me-2"></i>Favorites</h6>
          <ul className="list-unstyled mb-3">
            {favoriteReports.length ? (
              favoriteReports.map((f, i) => (
                <li key={i} className="d-flex justify-content-between align-items-center py-1">
                  <span className="text-truncate" style={{ maxWidth: 160 }}>{f}</span>
                  <button className="btn btn-sm btn-link text-primary" title="Download">
                    <i className="bi bi-download"></i>
                  </button>
                </li>
              ))
            ) : (
              <li className="text-muted small">No favorites yet</li>
            )}
          </ul>
          <hr />
          <h6 className="fw-bold"><i className="bi bi-folder-fill text-warning me-2"></i>Folders</h6>
          <ul className="list-unstyled small">
            {folderList.length ? (
              folderList.map((f, i) => (
                <li key={i}><i className="bi bi-folder-fill text-warning me-2"></i>{f}</li>
              ))
            ) : (
              <li className="text-muted">No folders</li>
            )}
          </ul>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-grow-1 p-4 sc-bg-light">

          {/* Search + Filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex">
              {/* Inline SearchBar */}
              <input
                type="text"
                placeholder="Search reports..."
                className="form-control me-2"
                style={{ maxWidth: "300px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select ms-2"
                style={{ maxWidth: "200px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Reports</option>
                {[...new Set(reports.map((r) => r.status))].map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button className="btn sc-btn-primary" onClick={() => toast.success("Bulk download started!")}>
              Bulk Download
            </button>
          </div>

          {/* Stat Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="sc-card-gradient sc-available">
                <div className="stat-num">{reports.length}</div>
                <div className="stat-label">Latest Reports</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sc-card-gradient sc-favorites">
                <div className="stat-num">{favoriteReports.length}</div>
                <div className="stat-label">Reports in Date Range</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sc-card-gradient sc-available">
                <div className="stat-num">{reports.length}</div>
                <div className="stat-label">Pending Downloads</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sc-card-gradient sc-favorites">
                <div className="stat-num">{favoriteReports.length}</div>
                <div className="stat-label">Downloads</div>
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
                    <td><span className="badge bg-success">{report.status}</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        title="Download Report"
                        onClick={() => toast.success(`${report.name} downloaded successfully!`)}
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

      {/* ===== FOOTER ===== */}
      <footer className="sc-footer text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} Standard Chartered - RW Tool</small>
      </footer>

      <ToastContainer />
    </div>
  );
}
