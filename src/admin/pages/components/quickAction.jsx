import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For page navigation
import AddUserModal from './AddUserModal';
import RecentReportsModal from './RecentReportsModal';
import "./quickAction.css";

/**
 * Reusable Action Button component
 * @param {string} icon - Emoji or icon to display
 * @param {string} label - Button text
 * @param {function} onClick - Click handler
 */
const ActionBtn = ({ icon, label, onClick }) => (
  <button type="button" className="qa-btn" onClick={onClick}>
    <span className="qa-icon">{icon}</span>
    {label}
  </button>
);

export default function QuickActions() {
  const navigate = useNavigate(); // Used for navigation between pages
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);

  const handleAddUser = (userData) => {
    // Handle user creation logic here
    console.log('New user created:', userData);
    // You can add API call here to create user
  };

  return (
    <>
      <div className="qa-row">
        {/* Add User now opens modal */}
        <ActionBtn
          icon="➕"
          label="Add New User"
          onClick={() => setShowAddUserModal(true)}
        />
        <ActionBtn
          icon="🧩"
          label="Create Module"
          onClick={() => navigate("/access-control")}
        />
        <ActionBtn
          icon="🏢"
          label="Manage Users"
          onClick={() => navigate("/users")}
        />
        <ActionBtn
          icon="📊"
          label="Recent Reports"
          onClick={() => setShowReportsModal(true)}
        />

      </div>

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSubmit={handleAddUser}
      />
      
      <RecentReportsModal
        isOpen={showReportsModal}
        onClose={() => setShowReportsModal(false)}
      />
    </>
  );
}
