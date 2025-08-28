// Import React and useState hook for state management
import React, { useState } from "react";
// Import useNavigate hook for programmatic navigation between routes
import { useNavigate } from "react-router-dom";
// Import modal components for different dashboard actions
import { AddUserModal, CreateGroupModal } from "./Modals";
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

  // Sample data for recent user activities - shows what users have been doing recently
  const recentActivities = [
    {
      user: { name: "John Smith", initials: "JS" }, // User info with display name and avatar initials
      action: "Accessed", // What action was performed
      group: "Branch A → A1", // Which group was affected
      time: "2 hours ago", // When the action occurred
      status: "completed" // Current status of the action
    },
    {
      user: { name: "Sarah Johnson", initials: "SJ" },
      action: "Modified Access",
      group: "Branch B",
      time: "3 hours ago",
      status: "completed"
    },
    {
      user: { name: "Mike Wilson", initials: "MW" },
      action: "Created Group",
      group: "Branch C → C2",
      time: "5 hours ago",
      status: "completed"
    },
    {
      user: { name: "Emily Brown", initials: "EB" },
      action: "Updated Profile",
      group: "User Settings",
      time: "6 hours ago",
      status: "completed"
    },
    {
      user: { name: "David Lee", initials: "DL" },
      action: "Requested Access",
      group: "Branch A → A2",
      time: "8 hours ago",
      status: "pending" // This action is still waiting for approval
    }
  ];


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

      {/* Content Row */}
      <div className="row">
        {/* Recent Activities */}
        <div className="col-12 mb-4">
          <div className="recent-activities">
            <div style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
              <h6 style={{ margin: 0, fontWeight: '600', color: '#212529' }}>Recent Activities</h6>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Group/Branch</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="user-avatar">{activity.user.initials}</div>
                          <span>{activity.user.name}</span>
                        </div>
                      </td>
                      <td>{activity.action}</td>
                      <td>{activity.group}</td>
                      <td>{activity.time}</td>
                      <td>
                        <span className={`status-badge ${activity.status}`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onSave={handleSaveGroup}
      />

    </div>
  );
}
