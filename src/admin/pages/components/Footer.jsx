import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, /*Database, Wifi, Shield*/ } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/':
        return 'Admin Dashboard';
      case '/users':
        return 'User Management';
      case '/access-control':
        return 'Access Control';
      case '/reports':
        return 'Reports';
      case '/settings':
        return 'Settings';
      default:
        return 'Wealth Core Dashboard';
    }
  };
  
  return (
    <footer className="bg-light border-top py-2 px-4 mt-auto">
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <div className="d-flex align-items-center">
          <span className="me-3">{getPageTitle()}</span>
          <div className="d-flex align-items-center me-3">
            <Clock size={14} className="me-1" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="d-flex align-items-center">
          {/* System Status Indicators 
          <div className="d-flex align-items-center me-3">
            <div className="d-flex align-items-center me-2" title="Database Status">
              <Database size={14} className="me-1 text-success" />
              <span className="text-success">DB</span>
            </div>
            <div className="d-flex align-items-center me-2" title="Network Status">
              <Wifi size={14} className="me-1 text-success" />
              <span className="text-success">NET</span>
            </div>
            <div className="d-flex align-items-center" title="Security Status">
              <Shield size={14} className="me-1 text-success" />
              <span className="text-success">SEC</span>
            </div>
          </div>*/}
          
          <div className="d-flex align-items-center">
            <span className="me-3">Version 2.1.0</span>
            <span>© {new Date().getFullYear()} Wealth Core Technologies. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

