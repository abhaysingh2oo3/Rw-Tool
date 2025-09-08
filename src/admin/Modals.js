import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";

export function AddUserModal({ isOpen, onClose, defaultData, groups = [] }) {
  // form state
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [branchAccess, setBranchAccess] = useState([]);

  // if editing → prefill data
  useEffect(() => {
    if (defaultData) {
      setFullName(defaultData.name || "");
      setEmailAddress(defaultData.email || "");
      setPassword(""); // password stays empty for security
      setRole(defaultData.role || "user");
      setBranchAccess(
        defaultData.branch
          ? defaultData.branch.split(",").map((b) => b.trim())
          : []
      );
    }
  }, [defaultData]);

  // handle checkbox clicks
  const handleBranchChange = (branch, checked) => {
    if (checked) {
      setBranchAccess([...branchAccess, branch]);
    } else {
      setBranchAccess(branchAccess.filter((b) => b !== branch));
    }
  };

  // handle save button
  const handleSave = async () => {
    try {
      const payload = {
        name: fullName,
        email: emailAddress,
        password: password,
        role: role,
        branchAccess: branchAccess
      };

      // call backend
      await axios.post("/api/users", payload);

      alert("✅ User created successfully!");

      // reset form
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setRole("user");
      setBranchAccess([]);

      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create user. Check backend.");
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ background: "#00000099", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div style={{ background: "#fff", margin: "50px auto", padding: "20px", width: "600px", borderRadius: "6px" }}>
        <h4>{defaultData ? "Edit User" : "Add New User"}</h4>

        {/* Full Name */}
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="ops">Ops</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Folder Access */}
        <div className="mb-3">
          <label>Folder Access</label>
          <div style={{ border: "1px solid #ccc", padding: "10px" }}>
            {groups.map((group) => (
              <div key={group.id} className="mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`main-${group.id}`}
                    checked={branchAccess.includes(group.name)}
                    onChange={(e) => handleBranchChange(group.name, e.target.checked)}
                  />
                  <label className="form-check-label fw-bold" htmlFor={`main-${group.id}`}>
                    {group.name}
                  </label>
                </div>

                {/* Sub Folders */}
                {group.subFolders &&
                  group.subFolders.map((sub) => (
                    <div key={sub.id} className="form-check ms-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`sub-${sub.id}`}
                        checked={branchAccess.includes(sub.name)}
                        onChange={(e) => handleBranchChange(sub.name, e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={`sub-${sub.id}`}>
                        {sub.name}
                      </label>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {defaultData ? "Update User" : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}



// ================= Create Folder Modal =================
export function CreateFolderModal({ isOpen, onClose, onSave, title, mainFolders = [] }) {
  const [folderName, setFolderName] = useState("");
  const [selectedMain, setSelectedMain] = useState(mainFolders[0] || "");

  const fallbackMain = ["HR Management", "Finance Portal", "Inventory System"];
  const available = mainFolders.length > 0 ? mainFolders : fallbackMain;

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!folderName.trim()) return;

    if (title.toLowerCase().includes("sub")) {
      onSave({ main: selectedMain, sub: folderName });
    } else {
      onSave(folderName);
    }

    setFolderName("");
    setSelectedMain(available[0] || "");
    onClose();
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
     <div className="modal-content" role="dialog" aria-modal="true">

        <div className="modal-header" style={headerStyle}>
          <h5>{title}</h5>
          <button className="btn-close" onClick={onClose} style={closeBtnStyle}>
            ×
          </button>
        </div>

        <div className="modal-body" style={{ padding: "20px" }}>
          {title.toLowerCase().includes("sub") && (
            <div className="form-group mb-3">
              <label>Select Main Group</label>
              <select
                className="form-select"
                value={selectedMain}
                onChange={(e) => setSelectedMain(e.target.value)}
              >
                {available.map((folder) => (
                  <option key={folder} value={folder}>
                    {folder}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>
              {title.toLowerCase().includes("sub")
                ? "Enter Sub Group Name"
                : "Enter Main Group Name"}
            </label>
            <input
              type="text"
              className="form-control"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer" style={footerStyle}>
          <button className="btn btn-secondary me-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= Basic Styles =============
// Shared styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1050,
};

const contentStyle = { background: "white", borderRadius: "12px" };
const headerStyle = { padding: "20px", borderBottom: "1px solid #e9ecef", position: "relative" };
const footerStyle = { padding: "20px", borderTop: "1px solid #e9ecef", textAlign: "right" };
const closeBtnStyle = { background: "none", border: "none", fontSize: "20px", cursor: "pointer" };
const branchBoxStyle = { maxHeight: "300px", overflowY: "auto", border: "1px solid #e9ecef", borderRadius: "8px", padding: "10px" };
