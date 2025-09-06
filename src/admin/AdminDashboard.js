// src/admin/AdminDashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddUserModal, CreateFolderModal } from "./Modals";
import "./admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // === Quick action handlers ===
  const handleAddNewUser = () => {
    setShowAddUserModal(true);
  };

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleManageUsers = () => {
    navigate("/admin/user-management");
  };

  const handleSaveUser = (userData) => {
    console.log("New user created:", userData);
    // TODO: Replace console.log with axios.post("/api/users", userData)
  };

  const handleSaveGroup = (groupData) => {
    console.log("New group created:", groupData);
    // TODO: Replace console.log with axios.post("/api/groups", groupData)
  };

  return (
    <div>
      {/* Page Title */}
      <div className="mb-4">
        <h4 className="mb-1" style={{ color: "#212529", fontWeight: "600" }}>
          Admin Dashboard
        </h4>
        <p className="mb-0" style={{ color: "#6c757d" }}>
          Welcome back, Mr. Abc
        </p>
      </div>

      {/* Stats Cards (kept constant for now) */}
      <div className="row mb-4">
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

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <h6
            style={{ color: "#212529", fontWeight: "600", marginBottom: "20px" }}
          >
            Quick Actions
          </h6>
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleAddNewUser}>
                <div className="quick-action-icon users">
                  <i className="bi bi-plus-circle"></i>
                </div>
                <h6 className="quick-action-title">Add New User</h6>
                <p className="quick-action-subtitle">
                  Create new user accounts and assign permissions
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleCreateGroup}>
                <div className="quick-action-icon groups">
                  <i className="bi bi-gear"></i>
                </div>
                <h6 className="quick-action-title">Create Group</h6>
                <p className="quick-action-subtitle">
                  Set up new access control groups
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 mb-3">
              <div className="quick-action-card" onClick={handleManageUsers}>
                <div className="quick-action-icon manage">
                  <i className="bi bi-people"></i>
                </div>
                <h6 className="quick-action-title">Manage Users</h6>
                <p className="quick-action-subtitle">
                  View and modify existing user accounts
                </p>
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
        title="Create New Group"
      />
    </div>
  );
}
