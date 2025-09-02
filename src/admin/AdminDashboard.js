// Import React and useState hook for state management
import React, { useState } from "react";
// Import useNavigate hook for programmatic navigation between routes
import { useNavigate } from "react-router-dom";
// Import modal components for different dashboard actions
import { AddUserModal, CreateFolderModal } from "./Modals";
// Import admin-specific CSS styles
import "./admin.css";

// Main AdminDashboard component - provides overview and quick actions for administrators
export default function AdminDashboard() {
  // Hook for programmatic navigation to different routes
  const navigate = useNavigate();
  // State to control visibility of Add User modal
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  // State to control visibility of Create Group modal
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  
  // Event Handlers for Quick Actions - functions that respond to user interactions
  
  // Handler to open the Add User modal
  const handleAddNewUser = () => {
    setShowAddUserModal(true); // Set modal visibility state to true
  };

  // Handler to open the Create Group modal
  const handleCreateGroup = () => {
    setShowCreateGroupModal(true); // Set modal visibility state to true
  };

  // Handler to navigate to User Management page
  const handleManageUsers = () => {
    navigate('/admin/user-management'); // Use React Router navigation
  };


  // Handler for saving new user data from Add User modal
  const handleSaveUser = (userData) => {
    console.log('New user created:', userData); // Log user data for debugging
    // TODO: In a real application, this would make an API call to save user to backend
  };

  // Handler for saving new group data from Create Group modal
  const handleSaveGroup = (groupData) => {
    console.log('New group created:', groupData); // Log group data for debugging
    // TODO: In a real application, this would make an API call to save group to backend
  };


  return (
    <div>
      {/* Page Title */}
      <div className="mb-4">
        <h4 className="mb-1" style={{ color: '#212529', fontWeight: '600' }}>Admin Dashboard</h4>
        <p className="mb-0" style={{ color: '#6c757d' }}>Welcome back, Mr. Abc</p>
      </div>

      {/* Statistics Cards Row */}
<div className="row mb-4">
  {/* Total Groups */}
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="dashboard-card card">
      <div className="card-body">
        <div className="card-icon users">
          <i className="bi bi-people-fill"></i>
        </div>
        <h3 className="card-number">12</h3>
        <p className="card-title">Total Groups</p>
      </div>
    </div>
  </div>

  {/* File Downloaded */}
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="dashboard-card card">
      <div className="card-body">
        <div className="card-icon reports">
          <i className="bi bi-download"></i>
        </div>
        <h3 className="card-number">45</h3>
        <p className="card-title">File Downloaded</p>
      </div>
    </div>
  </div>

  {/* File Viewed */}
  <div className="col-xl-4 col-md-6 mb-3">
    <div className="dashboard-card card">
      <div className="card-body">
        <div className="card-icon views">
          <i className="bi bi-eye-fill"></i>
        </div>
        <h3 className="card-number">78</h3>
        <p className="card-title">File Viewed</p>
      </div>
    </div>
  </div>
</div>


      {/* Quick Actions Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="mb-3">
            <h6 style={{ color: '#212529', fontWeight: '600', margin: 0 }}>Quick Actions</h6>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleAddNewUser}>
                <div className="quick-action-icon users">
                  <i className="bi bi-plus-circle"></i>
                </div>
                <h6 className="quick-action-title">Add New User</h6>
                <p className="quick-action-subtitle">Create new user accounts and assign permissions</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleCreateGroup}>
                <div className="quick-action-icon groups">
                  <i className="bi bi-gear"></i>
                </div>
                <h6 className="quick-action-title">Create Group</h6>
                <p className="quick-action-subtitle">Set up new access control groups</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleManageUsers}>
                <div className="quick-action-icon manage">
                  <i className="bi bi-people"></i>
                </div>
                <h6 className="quick-action-title">Manage Users</h6>
                <p className="quick-action-subtitle">View and modify existing user accounts</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>


      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={handleSaveUser}
      />
      <CreateFolderModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onSave={handleSaveGroup}
        title="Create New Folder"
      />

    </div>

  );
}
