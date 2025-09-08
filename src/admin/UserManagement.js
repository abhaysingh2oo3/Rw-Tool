// src/admin/UserManagement.js
import React, { useState } from "react";
import axios from "axios";
import "./admin.css";

export default function UserManagement({ groups = [] }) {
  // form fields
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [branchAccess, setBranchAccess] = useState([]);

  // feedback states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle checkbox changes for branch/folder access
  const handleBranchChange = (branch, checked) => {
    if (checked) {
      setBranchAccess([...branchAccess, branch]);
    } else {
      setBranchAccess(branchAccess.filter((b) => b !== branch));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: fullName,
        email: emailAddress,
        password: password,
        role: role,
        branchAccess: branchAccess,
      };

      await axios.post("/api/users", payload);

      setMessage("✅ User created successfully!");
      // reset form
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setRole("user");
      setBranchAccess([]);
    } catch (err) {
      console.error("Create failed", err);
      setMessage("❌ Failed to create user. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New User</h3>

      {message && <div style={{ marginBottom: "10px" }}>{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="form-label">Role</label>
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

        {/* Branch Access */}
        <div className="mb-3">
          <label className="form-label">Branch / Folder Access</label>
          <div className="p-2 border rounded">
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
                  <label
                    className="form-check-label fw-bold"
                    htmlFor={`main-${group.id}`}
                  >
                    {group.name}
                  </label>
                </div>

                {group.subFolders?.map((sub) => (
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
