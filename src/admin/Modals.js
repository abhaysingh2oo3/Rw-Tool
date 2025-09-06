import React, { useState, useEffect } from "react";
import "./admin.css";

export function AddUserModal({ isOpen, onClose, onSave, defaultData, groups = [] }) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    role: "user",
    branchAccess: []
  });

  useEffect(() => {
    if (defaultData) {
      setFormData({
        fullName: defaultData.name || "",
        emailAddress: defaultData.email || "",
        role: defaultData.role || "user",
        branchAccess: defaultData.branch
          ? defaultData.branch.split(",").map((b) => b.trim())
          : []
      });
    }
  }, [defaultData]);

  const handleBranchChange = (branch, isChecked) => {
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        branchAccess: [...prev.branchAccess, branch]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        branchAccess: prev.branchAccess.filter((b) => b !== branch)
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({
      fullName: "",
      emailAddress: "",
      role: "user",
      branchAccess: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-content" style={{ ...contentStyle, width: "600px" }}>
        <div className="modal-header" style={headerStyle}>
          <h5 style={{ margin: 0, fontWeight: "600" }}>
            {defaultData ? "Edit User" : "Add New User"}
          </h5>
          <button className="btn-close" onClick={onClose} style={closeBtnStyle}>
            
          </button>
        </div>

        <div className="modal-body" style={{ padding: "20px" }}>
          <div className="row">
            {/* Left side form fields */}
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.emailAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emailAddress: e.target.value
                    }))
                  }
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                  }
                >
                  <option value="user">User</option>
                  <option value="ops">Ops</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Right side: Folder access */}
            <div className="col-md-6">
              <label className="form-label">Folder Access</label>
              <div style={branchBoxStyle}>
                {groups.map((group) => (
                  <div key={group.id} className="mb-2">
                    {/* Main Folder */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`main-${group.id}`}
                        checked={formData.branchAccess.includes(group.name)}
                        onChange={(e) =>
                          handleBranchChange(group.name, e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor={`main-${group.id}`}
                      >
                        {group.name}
                      </label>
                    </div>

                    {/* Sub Folders */}
                    {group.subFolders &&
                      group.subFolders.map((sub) => (
                        <div key={sub.id} className="form-check ms-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`sub-${sub.id}`}
                            checked={formData.branchAccess.includes(sub.name)}
                            onChange={(e) =>
                              handleBranchChange(sub.name, e.target.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`sub-${sub.id}`}
                          >
                            {sub.name}
                          </label>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={footerStyle}>
          <button className="btn btn-secondary me-2" onClick={onClose}>
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