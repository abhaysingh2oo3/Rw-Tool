import React from "react";
import { useNavigate } from "react-router-dom";
import "../custom.css";

export default function Header({
  username = "User",
  lastLogin = "12-Aug-2025 09:45",
  notifications = [],
  onOpenNotifications = () => {}
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // back to login page
  };

  return (
    <header className="sc-header px-4 d-flex align-items-center justify-content-between shadow-sm">
      {/* Logo + Title */}
      <div className="d-flex align-items-center">
        <img
          src="/logo.png"
          alt="Standard Chartered"
          className="me-3"
          style={{ height: 36 }}
        />
        <h5 className="mb-0 text-white fw-semibold">
          Standard Chartered-RW Tool <span className="fw-light"></span>
        </h5>
      </div>

      {/* User + Notifications */}
      <div className="d-flex align-items-center gap-3">
        {/* Last login */}
        <div className="text-white small text-end d-none d-md-block">
          <div>
            Hello, <strong>{username}</strong>
          </div>
          <div className="opacity-75">Last Login: {lastLogin}</div>
        </div>

        {/* Notifications */}
        <div className="position-relative">
          <button
            className="btn btn-light btn-sm rounded-circle p-0 notif-btn"
            style={{ width: 34, height: 34 }}
            onClick={onOpenNotifications}
            title="Notifications"
          >
            <i className="bi bi-bell-fill" style={{ fontSize: "1.1rem" }}></i>
          </button>
          {notifications.length > 0 && (
            <span className="notif-badge">{notifications.length}</span>
          )}
        </div>

        {/* Logout */}
        <button
          className="btn btn-outline-light btn-sm fw-semibold px-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
