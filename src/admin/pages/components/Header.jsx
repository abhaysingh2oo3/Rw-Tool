import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import Logo from '../img/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const { adminProfile } = useAdmin();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSearchModal, setShowSearchModal] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('adminProfile');
      navigate('/');
    }
  };

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleUserProfile = () => {
    setShowUserMenu(!showUserMenu);
  };

  const navigateToSettings = () => {
    navigate('/settings');
    setShowUserMenu(false);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#0072AA' }}>
      <div className="container-fluid">
        {/* Left side - Logo and branding */}
        <div className="d-flex align-items-center">
          <img src={Logo} alt="Standard Chartered Logo" style={{ height: '30px', marginRight: '10px' }} />
          <span className="navbar-brand mb-0 h1">RW Tool</span>
          <span className="text-white-50 ms-3" style={{ fontSize: '0.9rem' }}>aXess ACADEMY</span>
        </div>

        {/* Right side - User info and actions */}
        <div className="d-flex align-items-center">
          <div className="me-3 text-end">
            <div className="text-white" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
              Hi, {adminProfile.name}!
            </div>
            <div className="text-white-50" style={{ fontSize: '0.75rem' }}>
              {adminProfile.email} | Last logged on: {getCurrentDate()}
            </div>
          </div>
          
          <button className="btn btn-link text-white" type="button" onClick={handleSearch} title="Search">
            <Search size={18} />
          </button>
          
          <div className="position-relative">
            <button 
              className="btn btn-link text-white position-relative" 
              type="button" 
              onClick={handleNotifications}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">unread notifications</span>
              </span>
            </button>
            
            {showNotifications && (
              <div className="position-absolute top-100 end-0 bg-white rounded shadow-lg border" style={{ minWidth: '320px', zIndex: 1050, marginTop: '5px' }}>
                <div className="p-3 border-bottom">
                  <h6 className="mb-0 text-dark">Notifications</h6>
                </div>
                <div className="list-group list-group-flush">
                  <div className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="text-dark">
                        <strong>New user registered</strong>
                        <div className="small text-muted">Sarah Wilson joined the system</div>
                        <div className="small text-muted">2 hours ago</div>
                      </div>
                      <span className="badge bg-primary">New</span>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div className="text-dark">
                      <strong>System update completed</strong>
                      <div className="small text-muted">All modules updated successfully</div>
                      <div className="small text-muted">1 day ago</div>
                    </div>
                  </div>
                  <div className="list-group-item">
                    <div className="text-dark">
                      <strong>Backup completed</strong>
                      <div className="small text-muted">Daily backup completed successfully</div>
                      <div className="small text-muted">2 days ago</div>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-top text-center">
                  <button className="btn btn-sm btn-link text-primary">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          
          <div className="position-relative">
            <button 
              className="btn btn-link text-white" 
              type="button" 
              onClick={handleUserProfile}
              title="User Profile"
            >
              <User size={18} />
            </button>
            
            {showUserMenu && (
              <div className="position-absolute top-100 end-0 bg-white rounded shadow-lg border" style={{ minWidth: '200px', zIndex: 1050, marginTop: '5px' }}>
                <div className="p-3 border-bottom text-center">
                  <div className="text-dark font-weight-bold">{adminProfile.name}</div>
                  <div className="small text-muted">{adminProfile.email}</div>
                </div>
                <div className="list-group list-group-flush">
                  <button className="list-group-item list-group-item-action" onClick={navigateToSettings}>
                    <User size={16} className="me-2" />
                    Profile Settings
                  </button>
                  <button className="list-group-item list-group-item-action" onClick={handleLogout}>
                    <LogOut size={16} className="me-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className="btn btn-link text-white" type="button" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
      
      {/* Search Modal */}
      {showSearchModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Global Search</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowSearchModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Search users, settings, reports..."
                    autoFocus
                  />
                </div>
                <div className="text-muted">
                  <p>Quick search suggestions:</p>
                  <ul className="list-unstyled">
                    <li><button className="btn btn-link p-0 text-start">Search for users</button></li>
                    <li><button className="btn btn-link p-0 text-start">View recent reports</button></li>
                    <li><button className="btn btn-link p-0 text-start">Access control settings</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

