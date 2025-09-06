import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreateFolderModal } from "./Modals";
import "./admin.css";

export default function AccessControl() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMainFolderModal, setShowMainFolderModal] = useState(false);
  const [showSubFolderModal, setShowSubFolderModal] = useState(false);

  // fetch groups on load
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("/api/groups");
      setGroups(res.data || []);
    } catch (err) {
      console.error("Error fetching groups", err);
      alert("Failed to load groups. Please try again.");
    }
  };

  const handleSaveMainFolder = async (name) => {
    try {
      const res = await axios.post("/api/groups", { name });
      setGroups((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating main group", err);
      alert("Failed to create group. Please try again.");
    }
  };

  const handleSaveSubFolder = async ({ main, sub }) => {
    try {
      const res = await axios.post(`/api/groups/${main}/subgroups`, { name: sub });
      setGroups((prev) =>
        prev.map((g) =>
          g.name === main
            ? { ...g, subFolders: [...(g.subFolders || []), res.data] }
            : g
        )
      );
    } catch (err) {
      console.error("Error creating sub group", err);
      alert("Failed to create sub group. Please try again.");
    }
  };

  const handleDeleteGroup = async (groupId, isSub = false, parentId = null) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      if (isSub) {
        await axios.delete(`/api/groups/${parentId}/subgroups/${groupId}`);
        setGroups((prev) =>
          prev.map((g) =>
            g.id === parentId
              ? { ...g, subFolders: g.subFolders.filter((s) => s.id !== groupId) }
              : g
          )
        );
      } else {
        await axios.delete(`/api/groups/${groupId}`);
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
      }
    } catch (err) {
      console.error("Error deleting group", err);
      alert("Failed to delete group. Please try again.");
    }
  };

  // filter groups based on search
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search */}
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

      <div className="mb-4">
        <p className="mb-0" style={{ color: "#6c757d", fontSize: "14px" }}>
          Showing {filteredGroups.length} of {groups.length} Groups
        </p>
      </div>

      {/* Stats Cards */}
      <div className="groups-grid">
        {filteredGroups.length === 0 ? (
          <p style={{ color: "#6c757d" }}>No groups found</p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.id} className="stats-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 style={{ margin: 0 }}>{group.name}</h5>
                <div>
                  <button
                    className="action-btn edit"
                    title="Edit"
                    onClick={() => console.log("edit main folder", group.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="action-btn delete"
                    title="Delete"
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              {/* Subfolders */}
              <div className="group-section">
                <h6>Sub Folders</h6>
                {group.subFolders && group.subFolders.length > 0 ? (
                  <div className="tag-list">
                    {group.subFolders.map((sub) => (
                      <span key={sub.id} className="tag">
                        {sub.name}
                        <button
                          className="mini-btn"
                          title="Edit Sub"
                          onClick={() => console.log("edit sub", sub.id)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="mini-btn"
                          title="Delete Sub"
                          onClick={() => handleDeleteGroup(sub.id, true, group.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#6c757d", fontSize: "14px" }}>No sub folders</p>
                )}
              </div>

              {/* Assigned Users */}
              <div className="group-section">
                <h6>Assigned Users</h6>
                {group.assignedUsers && group.assignedUsers.length > 0 ? (
                  <div className="tag-list">
                    {group.assignedUsers.map((user, i) => (
                      <span key={i} className="tag user-tag">
                        {user}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#6c757d", fontSize: "14px" }}>No users assigned</p>
                )}
              </div>
            </div>
          ))
        )}
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
