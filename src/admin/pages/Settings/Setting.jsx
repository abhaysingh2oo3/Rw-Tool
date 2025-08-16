import React, { useState } from "react";
import { User, Bell, Settings as SettingsIcon, BarChart, FileDown } from "lucide-react";
import { useAdmin } from '../../context/AdminContext';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { adminProfile, updateAdminProfile } = useAdmin();
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dataExportNotifications: true,
    systemUpdates: true,
    securityAlerts: true
  });
  
  const [systemSettings, setSystemSettings] = useState({
    defaultAccess: 'Administrator',
    timezone: 'UTC (GMT+00)',
    language: 'English',
    backupFrequency: 'Daily'
  });
  
  const [loginHistory] = useState([
    {
      id: 1,
      date: '2024-01-01 06:30',
      timezone: 'GMT',
      access: 'Granted system settings',
      status: 'success'
    },
    {
      id: 2,
      date: '2024-01-01 06:30',
      timezone: 'GMT',
      access: 'Modified user permissions',
      status: 'success'
    },
    {
      id: 3,
      date: '2021-01-01 06:30',
      timezone: 'GMT',
      access: 'Failed login attempt',
      status: 'failed'
    }
  ]);
  
  const handleProfileChange = (field, value) => {
    updateAdminProfile({ [field]: value });
  };
  
  const handleNotificationChange = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSaveChanges = (section) => {
    // Handle save logic here
    console.log(`Saving ${section} changes`);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
    // You can add API calls here
  };

  const renderProfileSettings = () => (
    <div className="settings-card">
      <div className="settings-header">
        <div className="profile-section">
          <div className="profile-avatar"><User size={24} /></div>
          <div className="profile-info">
            <h3>Admin Profile</h3>
            <p>Manage your account settings</p>
          </div>
        </div>
      </div>
      
      <div className="settings-content">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={adminProfile.name}
            onChange={(e) => handleProfileChange('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={adminProfile.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            placeholder="john.doe@company.com"
          />
        </div>
        
        <div className="form-group toggle-group">
          <div className="toggle-info">
            <label>Two Factor Authentication</label>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={adminProfile.twoFactorAuth}
              onChange={(e) => handleProfileChange('twoFactorAuth', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <button 
          className="btn-primary"
          onClick={() => handleSaveChanges('profile')}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
  
  const renderNotificationSettings = () => (
    <div className="settings-card">
      <div className="settings-header">
        <div className="notification-section">
          <div className="notification-icon"><Bell size={24} /></div>
          <div className="notification-info">
            <h3>Notification Settings</h3>
            <p>Configure how you want to be notified</p>
          </div>
        </div>
      </div>
      
      <div className="settings-content">
        <div className="notification-item">
          <div className="notification-details">
            <h4>Email Alerts</h4>
            <p>Receive email notifications for important events</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={() => handleNotificationChange('emailAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="notification-item">
          <div className="notification-details">
            <h4>Data Export Notifications</h4>
            <p>Get notified when data exports are complete</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.dataExportNotifications}
              onChange={() => handleNotificationChange('dataExportNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="notification-item">
          <div className="notification-details">
            <h4>System Updates</h4>
            <p>Receive notifications about system maintenance and updates</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.systemUpdates}
              onChange={() => handleNotificationChange('systemUpdates')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="notification-item">
          <div className="notification-details">
            <h4>Security Alerts</h4>
            <p>Important security notifications and warnings</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.securityAlerts}
              onChange={() => handleNotificationChange('securityAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
  
  const renderSystemSettings = () => (
    <div className="settings-card">
      <div className="settings-header">
        <div className="system-section">
          <div className="system-icon"><SettingsIcon size={24} /></div>
          <div className="system-info">
            <h3>System Settings</h3>
            <p>Configure system preferences</p>
          </div>
        </div>
      </div>
      
      <div className="settings-content">
        <div className="form-group">
          <label>Default Access Level</label>
          <select
            value={systemSettings.defaultAccess}
            onChange={(e) => handleSystemChange('defaultAccess', e.target.value)}
          >
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>UTC Timezone</label>
          <select
            value={systemSettings.timezone}
            onChange={(e) => handleSystemChange('timezone', e.target.value)}
          >
            <option value="UTC (GMT+00)">UTC (GMT+00)</option>
            <option value="EST (GMT-05)">EST (GMT-05)</option>
            <option value="PST (GMT-08)">PST (GMT-08)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>System Language</label>
          <select
            value={systemSettings.language}
            onChange={(e) => handleSystemChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Backup Frequency</label>
          <select
            value={systemSettings.backupFrequency}
            onChange={(e) => handleSystemChange('backupFrequency', e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        
        <button 
          className="btn-primary"
          onClick={() => handleSaveChanges('system')}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
  
  const renderLoginHistory = () => (
    <div className="settings-card">
      <div className="settings-header">
        <div className="history-section">
          <div className="history-icon"><BarChart size={24} /></div>
          <div className="history-info">
            <h3>Login & History</h3>
            <p>View system access logs</p>
          </div>
        </div>
      </div>
      
      <div className="settings-content">
        <div className="date-filters">
          <div className="date-input">
            <label>Start Date</label>
            <input type="date" defaultValue="2024-01-01" />
          </div>
          <div className="date-input">
            <label>End Date</label>
            <input type="date" defaultValue="2024-12-31" />
          </div>
        </div>
        
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Timezone</th>
                <th>Access</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.timezone}</td>
                  <td>{entry.access}</td>
                  <td>
                    <span className={`status-badge ${entry.status}`}>
                      {entry.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="export-section">
          <button className="btn-secondary">
            <FileDown size={16} style={{ marginRight: '8px' }} /> Export Logs
          </button>
        </div>
      </div>
    </div>
  );
  
  const sections = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System Settings', icon: SettingsIcon },
    { id: 'history', label: 'Login & History', icon: BarChart }
  ];
  
  const renderCurrentSection = () => {
    switch(activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      case 'history':
        return renderLoginHistory();
      default:
        return renderProfileSettings();
    }
  };
  
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>

      </div>
      
      <div className="settings-layout">
        <div className="settings-sidebar">
          {sections.map(section => (
            <button
              key={section.id}
              className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon"><section.icon size={18} /></span>
              {section.label}
            </button>
          ))}
        </div>
        
        <div className="settings-content">
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
