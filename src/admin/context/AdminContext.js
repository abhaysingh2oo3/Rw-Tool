import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : {
      name: 'John Doe',
      email: 'john.doe@company.com',
      twoFactorAuth: true
    };
  });

  // Save to localStorage whenever adminProfile changes
  useEffect(() => {
    localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  const updateAdminProfile = (updates) => {
    setAdminProfile(prev => ({ ...prev, ...updates }));
  };

  const value = {
    adminProfile,
    updateAdminProfile
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
