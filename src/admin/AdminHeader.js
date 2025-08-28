import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminHeader({
  username = "John Doe",
  lastLogin = "Sunday, August 17, 2025",
  notifications = 3,
  onOpenNotifications = () => {}
}) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    navigate("/"); // back to landing page
  };

  // Sample notifications data
  const notificationsList = [
    { id: 1, title: "New user registered", time: "2 minutes ago", type: "info" },
    { id: 2, title: "Report approved", time: "1 hour ago", type: "success" },
    { id: 3, title: "System maintenance scheduled", time: "3 hours ago", type: "warning" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="admin-header">
      {/* Logo + Title */}
      <div className="logo-section">
        <img
          src="/logo.png"
          alt="Standard Chartered"
          style={{ height: 36 }}
        />
        <h5>RW Tool <span style={{ fontWeight: 400, fontSize: '14px' }}>aXess ACADEMY</span></h5>
      </div>

      {/* User + Notifications */}
      <div className="user-section">
        {/* User Info */}
        <div className="user-info">
          <div className="user-name">Hi, {username}!</div>
          <div className="last-login">john.doe@company.com | Last logged on: {lastLogin}</div>
        </div>

        {/* Search Icon */}
        <button
          className="notification-btn"
          style={{ background: 'transparent' }}
          title="Search"
        >
          <i className="bi bi-search"></i>
        </button>

        {/* Notifications */}
        <div className="position-relative" ref={notifRef}>
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <i className="bi bi-bell-fill"></i>
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="dropdown-menu dropdown-menu-end show" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
              <div className="p-3 border-bottom">
                <h6 className="mb-0" style={{ color: '#212529' }}>Notifications</h6>
              </div>
              {notificationsList.map((notif) => (
                <div key={notif.id} className="p-3 border-bottom">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#212529' }}>
                        {notif.title}
                      </div>
                      <small className="text-muted">{notif.time}</small>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-2 text-center">
                <button className="btn btn-link btn-sm text-primary">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="position-relative" ref={profileRef}>
          <button
            className="notification-btn"
            onClick={() => setShowProfile(!showProfile)}
            title="Profile"
          >
            <i className="bi bi-person-fill"></i>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="dropdown-menu dropdown-menu-end show" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              width: '200px',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
              <div className="p-3 border-bottom text-center">
                <div className="mb-2">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#4285f4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    margin: '0 auto'
                  }}>
                    JD
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{username}</div>
                <small className="text-muted">Administrator</small>
              </div>
              <div className="py-1">
                <button className="dropdown-item" style={{ fontSize: '14px' }}>
                  <i className="bi bi-person me-2"></i>My Profile
                </button>
                <button className="dropdown-item" style={{ fontSize: '14px' }}>
                  <i className="bi bi-gear me-2"></i>Settings
                </button>
                <button className="dropdown-item" style={{ fontSize: '14px' }}>
                  <i className="bi bi-question-circle me-2"></i>Help
                </button>
                <hr className="dropdown-divider" />
                <button className="dropdown-item text-danger" style={{ fontSize: '14px' }} onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          className="notification-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}
