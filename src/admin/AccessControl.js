// Import React and useState hook for component state management
import React, { useState } from "react";
// Import the CreateGroupModal component for creating new access groups
import { CreateGroupModal } from "./Modals";
// Import the admin-specific CSS styles
import "./admin.css";

// Main AccessControl component - manages access control groups and permissions
export default function AccessControl() {
  // State for storing the search term used to filter groups
  const [searchTerm, setSearchTerm] = useState("");
  // State to control the visibility of the create group modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State to store all access control groups with their details
  const [groups, setGroups] = useState([
    {
      id: 1, // Unique identifier for the group
      name: "HR Management System", // Display name of the group
      branch: "Branch A", // Main branch this group belongs to
      icon: "people", // Bootstrap icon name for display
      iconClass: "hr", // CSS class for icon styling
      dataBranches: ["HR-01", "HR-02"], // Sub-branches/data sources this group accesses
      assignedUsers: ["John Smith", "Sarah Johnson"], // Users who have access to this group
      lastModified: "3 weeks ago" // When the group was last updated
    },
    {
      id: 2,
      name: "Finance Portal",
      branch: "Branch B",
      icon: "currency-dollar",
      iconClass: "finance",
      dataBranches: ["FN-01", "FN-02"],
      assignedUsers: ["Mike Wilson"],
      lastModified: "2 days ago"
    },
    {
      id: 3,
      name: "Inventory System",
      branch: "Branch C",
      icon: "boxes",
      iconClass: "inventory",
      dataBranches: ["INV-01"],
      assignedUsers: ["Lisa Anderson", "Tom Brown"],
      lastModified: "1 week ago"
    }
  ]);

  // Handler to open the create group modal
  const handleCreateGroup = () => {
    setShowCreateModal(true); // Set modal visibility to true
  };

  // Handler to save a new group from modal form data
  const handleSaveGroup = (groupData) => {
    // Create new group object with form data and default values
    const newGroup = {
      id: groups.length + 1, // Generate new ID based on array length
      name: groupData.groupName, // Get group name from form
      branch: groupData.mainBranch, // Get main branch from form
      icon: "gear", // Default icon for new groups
      iconClass: "hr", // Default icon class
      dataBranches: groupData.dataBranches, // Array of selected data branches
      assignedUsers: groupData.assignedUsers, // Array of assigned users
      lastModified: "Just created" // Set creation timestamp
    };
    // Add new group to existing groups array using spread operator
    setGroups([...groups, newGroup]);
  };

  // Handler for editing an existing group (currently logs to console)
  const handleEditGroup = (groupId) => {
    console.log("Edit group:", groupId); // TODO: Implement edit functionality
  };

  // Handler for deleting a group with confirmation
  const handleDeleteGroup = (groupId) => {
    // Show confirmation dialog before deletion
    if (window.confirm("Are you sure you want to delete this group?")) {
      // Filter out the group with matching ID from groups array
      setGroups(groups.filter(group => group.id !== groupId));
    }
  };

  // Filter groups based on search term - searches both name and branch
  const filteredGroups = groups.filter(group =>
    // Check if group name contains search term (case insensitive)
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // OR if group branch contains search term (case insensitive)
    group.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Component render method - returns JSX structure
  return (
    <div> {/* Main container for the Access Control page */}
      {/* Page Header Section - contains title and create button */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        {/* Left side - Page title */}
        <div>
          {/* Main page heading with custom styling */}
          <h4 style={{ color: '#212529', fontWeight: '600', margin: 0 }}>Access Control Management</h4>
        </div>
        {/* Right side - Create group button */}
        <button className="create-group-btn" onClick={handleCreateGroup}>
          <i className="bi bi-plus"></i> {/* Plus icon for create action */}
          Create Access Group
        </button>
      </div>

      {/* Page subtitle/description */}
      <p className="access-control-subtitle">Configure access permissions for groups</p>

      {/* Filters Section - search and action buttons */}
      <div className="access-control-filters mb-4">
        <div className="row"> {/* Bootstrap grid row */}
          {/* Search input column - takes half width on medium screens */}
          <div className="col-md-6">
            {/* Input group for search with icon */}
            <div className="input-group">
              {/* Search icon prefix */}
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              {/* Search input field - controlled by searchTerm state */}
              <input
                type="text"
                className="form-control border-start-0" /* Remove left border to connect with icon */
                placeholder="Search groups..." /* Placeholder text for user guidance */
                value={searchTerm} /* Controlled input - bound to state */
                onChange={(e) => setSearchTerm(e.target.value)} /* Update state on input change */
              />
            </div>
          </div>
        </div>
      </div>

      {/* Groups Count Display - shows filtered vs total count */}
      <div className="mb-4">
        {/* Counter text showing how many groups are displayed after filtering */}
        <p className="mb-0" style={{ color: '#6c757d', fontSize: '14px' }}>
          Showing {filteredGroups.length} of {groups.length} Groups
        </p>
      </div>

      {/* Groups Grid - displays all filtered groups in card layout */}
      <div className="groups-grid">
        {/* Map through filtered groups to create individual group cards */}
        {filteredGroups.map((group) => (
          <div key={group.id} className="group-card"> {/* Individual group card container */}
            {/* Group Header Section - contains icon and basic info */}
            <div className="group-header">
              {/* Group icon with dynamic styling based on group type */}
              <div className={`group-icon ${group.iconClass}`}>
                <i className={`bi bi-${group.icon}`}></i> {/* Bootstrap icon */}
              </div>
              {/* Group basic information */}
              <div className="group-info">
                <h5>{group.name}</h5> {/* Group name as heading */}
                <small>{group.branch}</small> {/* Branch information as subtitle */}
              </div>
            </div>

            {/* Data/Branches Section - shows sub-branches this group accesses */}
            <div className="group-section">
              <h6>Data/Branches:</h6> {/* Section label */}
              <div className="tag-list"> {/* Container for branch tags */}
                {/* Map through data branches to create individual tags */}
                {group.dataBranches.map((branch, index) => (
                  <span key={index} className="tag">{branch}</span>
                ))}
              </div>
            </div>

            {/* Assigned Users Section - shows users with access to this group */}
            <div className="group-section">
              <h6>Assigned Users:</h6> {/* Section label */}
              <div className="tag-list"> {/* Container for user tags */}
                {/* Map through assigned users to create individual user tags */}
                {group.assignedUsers.map((user, index) => (
                  <span key={index} className="tag user-tag">{user}</span>
                ))}
              </div>
            </div>

            {/* Last Modified Section - shows when group was last updated */}
            <div className="group-section">
              <h6>Last Modified:</h6> {/* Section label */}
              {/* Display last modified timestamp with muted styling */}
              <p className="mb-0" style={{ fontSize: '14px', color: '#6c757d' }}>
                {group.lastModified}
              </p>
            </div>

            {/* Group Actions Section - edit and delete buttons */}
            <div className="group-actions">
              {/* Edit button - triggers edit handler with group ID */}
              <button
                className="action-btn edit"
                onClick={() => handleEditGroup(group.id)} /* Pass group ID to edit handler */
                title="Edit Group" /* Tooltip text */
              >
                <i className="bi bi-pencil"></i> {/* Edit/pencil icon */}
              </button>
              {/* Delete button - triggers delete handler with confirmation */}
              <button
                className="action-btn delete"
                onClick={() => handleDeleteGroup(group.id)} /* Pass group ID to delete handler */
                title="Delete Group" /* Tooltip text */
              >
                <i className="bi bi-trash"></i> {/* Trash/delete icon */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal - handles new group creation */}
      <CreateGroupModal
        isOpen={showCreateModal} /* Show/hide modal based on state */
        onClose={() => setShowCreateModal(false)} /* Close modal handler */
        onSave={handleSaveGroup} /* Save new group handler */
      />
    </div>
  );
}
