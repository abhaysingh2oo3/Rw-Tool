import React, { useState } from "react";
import "./admin.css";

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("admin-profile");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    twoFactorEnabled: true
  });

  const handleSaveChanges = () => {
    console.log("Save changes", profileData);
  };

  const handleToggleTwoFactor = () => {
    setProfileData(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
  };

  const settingsNavItems = [
    {
      id: "admin-profile",
      icon: "person-circle",
      label: "Admin Profile"
    },
    {
      id: "notifications",
      icon: "bell",
      label: "Notifications"
    },
    {
      id: "system-settings",
      icon: "gear",
      label: "System Settings"
    },
    {
      id: "login-history",
      icon: "clock-history",
      label: "Login & History"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "admin-profile":
        return (
          <div className="settings-panel">
            <h5>Admin Profile</h5>
            <p className="subtitle">Manage your account settings</p>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Two Factor Authentication</label>
              <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '12px' }}>
                Add an extra layer of security to your account
              </p>
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`toggle-switch ${profileData.twoFactorEnabled ? 'on' : 'off'}`}
                  onClick={handleToggleTwoFactor}
                ></div>
                <span style={{ fontSize: '14px', color: '#495057' }}>
                  {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        );

      case "notifications":
        return (
          <div className="settings-panel">
            <h5>Notification Settings</h5>
            <p className="subtitle">Configure your notification preferences</p>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <label>Email Notifications</label>
                  <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                    Receive email notifications for important updates
                  </p>
                </div>
                <div className="toggle-switch on"></div>
              </div>
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <label>System Alerts</label>
                  <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                    Get notified about system maintenance and updates
                  </p>
                </div>
                <div className="toggle-switch on"></div>
              </div>
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <label>User Activity</label>
                  <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                    Notifications about user registrations and activities
                  </p>
                </div>
                <div className="toggle-switch off"></div>
              </div>
            </div>

            <button className="save-btn">Save Changes</button>
          </div>
        );

      case "system-settings":
        return (
          <div className="settings-panel">
            <h5>System Settings</h5>
            <p className="subtitle">Configure system-wide settings</p>

            <div className="form-group">
              <label>System Language</label>
              <select className="form-control">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date Format</label>
              <select className="form-control">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time Zone</label>
              <select className="form-control">
                <option>UTC-8 (Pacific Standard Time)</option>
                <option>UTC-5 (Eastern Standard Time)</option>
                <option>UTC+0 (Greenwich Mean Time)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>

            <button className="save-btn">Save Changes</button>
          </div>
        );

      case "login-history":
        return (
          <div className="settings-panel">
            <h5>Login & History</h5>
            <p className="subtitle">View your recent login activity</p>

            <div style={{ marginBottom: '24px' }}>
              <h6 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Recent Sessions</h6>
              
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>IP Address</th>
                      <th>Device</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aug 17, 2025 12:22:57 AM</td>
                      <td>192.168.1.100</td>
                      <td>Chrome on Windows</td>
                      <td><span className="status-badge active">Active</span></td>
                    </tr>
                    <tr>
                      <td>Aug 16, 2025 09:15:23 PM</td>
                      <td>192.168.1.100</td>
                      <td>Chrome on Windows</td>
                      <td><span className="status-badge completed">Success</span></td>
                    </tr>
                    <tr>
                      <td>Aug 15, 2025 08:30:45 AM</td>
                      <td>10.0.0.25</td>
                      <td>Safari on iOS</td>
                      <td><span className="status-badge completed">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h6 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Security Actions</h6>
              <button className="btn btn-outline-danger me-3">Revoke All Sessions</button>
              <button className="btn btn-outline-secondary">Export Login History</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h4 style={{ color: '#212529', fontWeight: '600', margin: 0 }}>Settings</h4>
      </div>

      {/* Settings Layout */}
      <div className="settings-layout">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          <div className="settings-nav">
            {settingsNavItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <i className={`bi bi-${item.icon}`}></i>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {renderContent()}
        </div>
      </div>

    </div>
  );
}
