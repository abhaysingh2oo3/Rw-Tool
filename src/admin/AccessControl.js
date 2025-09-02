// Import React, useState, useEffect hook
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreateFolderModal } from "./Modals";
import "./admin.css";

// ================= Access Control Component =================
export default function AccessControl() {
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for modals
  const [showMainFolderModal, setShowMainFolderModal] = useState(false);
  const [showSubFolderModal, setShowSubFolderModal] = useState(false);

  // State for groups fetched from API
  const [groups, setGroups] = useState([]);

  // ================= API Calls =================
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/api/groups"); 
      // response.data should be an array of groups in format:
      // { id, name, branch, icon, iconClass, dataBranches, assignedUsers }
      setGroups(response.data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleSaveMainFolder = async (name) => {
    try {
      const response = await axios.post("/api/groups", { name });
      setGroups((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating main group:", error);
    }
  };

  const handleSaveSubFolder = async ({ main, sub }) => {
    try {
      const response = await axios.post(`/api/groups/${main}/subgroups`, { name: sub });
      // update UI (append sub to the right main group)
      setGroups((prev) =>
        prev.map((group) =>
          group.name === main
            ? { ...group, dataBranches: [...group.dataBranches, response.data.name] }
            : group
        )
      );
    } catch (error) {
      console.error("Error creating sub group:", error);
    }
  };

  const handleEditGroup = async (groupId, updates) => {
    try {
      const response = await axios.put(`/api/groups/${groupId}`, updates);
      setGroups((prev) =>
        prev.map((group) => (group.id === groupId ? response.data : group))
      );
    } catch (error) {
      console.error("Error editing group:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      await axios.delete(`/api/groups/${groupId}`);
      setGroups((prev) => prev.filter((group) => group.id !== groupId));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // ================= Filtered Groups =================
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.branch?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= Render =================
  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 style={{ color: "#212529", fontWeight: "600", margin: 0 }}>
          Access Control Management
        </h4>

        <div className="d-flex gap-2">
          <button className="create-group-btn" onClick={() => setShowMainFolderModal(true)}>
            <i className="bi bi-folder-plus"></i> Create Main Folder
          </button>
          <button className="create-group-btn" onClick={() => setShowSubFolderModal(true)}>
            <i className="bi bi-folder2-open"></i> Create Sub Folder
          </button>
        </div>
      </div>

      <p className="access-control-subtitle">
        Configure access permissions for groups
      </p>

      {/* Filters */}
      <div className="access-control-filters mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Groups Count */}
      <div className="mb-4">
        <p className="mb-0" style={{ color: "#6c757d", fontSize: "14px" }}>
          Showing {filteredGroups.length} of {groups.length} Groups
        </p>
      </div>

      {/* Groups Grid */}
      <div className="groups-grid">
        {filteredGroups.map((group) => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <div className={`group-icon ${group.iconClass}`}>
                <i className={`bi bi-${group.icon}`}></i>
              </div>
              <div className="group-info">
                <h5>{group.name}</h5>
                <small>{group.branch}</small>
              </div>
            </div>

            <div className="group-section">
              <h6>Data/Branches:</h6>
              <div className="tag-list">
                {group.dataBranches.map((branch, index) => (
                  <span key={index} className="tag">
                    {branch}
                  </span>
                ))}
              </div>
            </div>

            <div className="group-section">
              <h6>Assigned Users:</h6>
              <div className="tag-list">
                {group.assignedUsers.map((user, index) => (
                  <span key={index} className="tag user-tag">
                    {user}
                  </span>
                ))}
              </div>
            </div>

            <div className="group-actions">
              <button
                className="action-btn edit"
                onClick={() => handleEditGroup(group.id)}
                title="Edit Group"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="action-btn delete"
                onClick={() => handleDeleteGroup(group.id)}
                title="Delete Group"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateFolderModal
        isOpen={showMainFolderModal}
        onClose={() => setShowMainFolderModal(false)}
        onSave={handleSaveMainFolder}
        title="Create Main Folder"
      />

      <CreateFolderModal
        isOpen={showSubFolderModal}
        onClose={() => setShowSubFolderModal(false)}
        onSave={handleSaveSubFolder}
        title="Create Sub Folder"
        mainFolders={groups.map((g) => g.name)}
      />
    </div>
  );
}
