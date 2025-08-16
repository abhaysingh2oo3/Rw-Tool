import React from "react";

export default function Sidebar({
  folders = [],
  favorites = [],
  lastViewed = [],
  onOpenReport = () => {},
  onFilterChange = () => {},
  selectedFilter = "All Time"
}) {
  const quickFilters = ["All Time", "Last 7 days", "Last 30 days", "Custom Range"];

  return (
    <aside className="bg-white border-end p-3 sc-sidebar">
      {/* Favorites */}
      <h6 className="fw-bold"><i className="bi bi-star-fill text-warning me-2"></i>Favorites</h6>
      <ul className="list-unstyled mb-3">
        {favorites.length ? (
          favorites.map((f, i) => (
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

      {/* Recently Viewed */}
      <h6 className="fw-bold"><i className="bi bi-clock-history text-primary me-2"></i>Recent Reports</h6>
      <ul className="list-unstyled mb-3">
        {lastViewed.length ? (
          lastViewed.map((r, idx) => (
            <li key={idx}>
              <button className="btn btn-link p-0 text-primary" onClick={() => onOpenReport(r)}>
                {r}
              </button>
            </li>
          ))
        ) : (
          <li className="text-muted small">No recent reports</li>
        )}
      </ul>

      <hr />

      {/* Quick Filters */}
      <h6 className="fw-bold"><i className="bi bi-funnel text-success me-2"></i>Quick Filters</h6>
      <select
        className="form-select"
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {quickFilters.map((filter, idx) => (
          <option key={idx} value={filter}>{filter}</option>
        ))}
      </select>

      <hr />

      {/* Folders */}
      <h6 className="fw-bold"><i className="bi bi-folder2-open text-info me-2"></i>Folders</h6>
      <ul className="list-unstyled small">
        {folders.length ? (
          folders.map((f, i) => (
            <li key={i}>📁 {f}</li>
          ))
        ) : (
          <li className="text-muted">No folders</li>
        )}
      </ul>
    </aside>
  );
}
