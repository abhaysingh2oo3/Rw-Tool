// src/admin/UserManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddUserModal } from "./Modals";
import "./admin.css";

/*
  Simple / human-style User Management page
  - Fetches users from backend
  - Create / Update / Delete via axios
  - Keeps UI minimal (search, role filter, show entries, add button)
*/

export default function UserManagement() {
  const [users, setUsers] = useState([]); // from server
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // === fetch users on mount ===
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/users");
      // expect res.data = [{ id, name, email, role, branch, ... }, ...]
      // adapt mapping if your backend uses different field names
      setUsers(
        (res.data || []).map((u) => ({
          id: u.id,
          name: u.name || u.fullName || "",
          email: u.email || u.emailAddress || "",
          role: (u.role || "user").toLowerCase(),
          branch: u.branch || (u.branchAccess ? u.branchAccess.join(", ") : ""),
          avatar:
            (u.name || u.fullName || "U")
              .split(" ")
              .map((n) => (n ? n[0] : ""))
              .join("")
              .toUpperCase() || "U",
        }))
      );
    } catch (err) {
      console.error("Failed to load users", err);
      setError("Failed to load users. Check backend or network.");
    } finally {
      setLoading(false);
    }
  }

  // === create user (POST) ===
  async function createUser(data) {
    // data: { fullName, emailAddress, role, branchAccess }
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: data.fullName,
        email: data.emailAddress,
        role: data.role,
        branchAccess: data.branchAccess || [],
      };
      const res = await axios.post("/api/users", payload);
      const u = res.data;
      // append to list (map backend fields)
      setUsers((prev) => [
        ...prev,
        {
          id: u.id,
          name: u.name || u.fullName,
          email: u.email || u.emailAddress,
          role: (u.role || "user").toLowerCase(),
          branch: u.branch || (u.branchAccess ? u.branchAccess.join(", ") : ""),
          avatar:
            (u.name || u.fullName || "U")
              .split(" ")
              .map((n) => (n ? n[0] : ""))
              .join("")
              .toUpperCase() || "U",
        },
      ]);
    } catch (err) {
      console.error("Create failed", err);
      setError("Create failed. See console or check backend.");
    } finally {
      setLoading(false);
    }
  }

  // === update user (PUT) ===
  async function updateUser(id, data) {
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: data.fullName,
        email: data.emailAddress,
        role: data.role,
        branchAccess: data.branchAccess || [],
      };
      const res = await axios.put(`/api/users/${id}`, payload);
      const u = res.data;
      setUsers((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
              id: u.id,
              name: u.name || payload.name,
              email: u.email || payload.email,
              role: (u.role || payload.role).toLowerCase(),
              branch: u.branch || (u.branchAccess ? u.branchAccess.join(", ") : payload.branchAccess.join(", ")),
              avatar:
                (u.name || payload.name || "U")
                  .split(" ")
                  .map((n) => (n ? n[0] : ""))
                  .join("")
                  .toUpperCase() || "U",
            }
            : p
        )
      );
    } catch (err) {
      console.error("Update failed", err);
      setError("Update failed. See console or check backend.");
    } finally {
      setLoading(false);
    }
  }

  // === delete user (DELETE) ===
  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;
    setLoading(true);
    setError("");
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      setError("Delete failed. See console or check backend.");
    } finally {
      setLoading(false);
    }
  }

  // handler wired to modal onSave
  function handleSaveFromModal(formData) {
    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      createUser(formData);
    }
    setEditingUser(null);
  }

  // filter + search
  const filtered = users.filter((u) => {
    const s = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !s ||
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      (u.branch || "").toLowerCase().includes(s);
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ margin: 0 }}>User Management</h4>
        <button
          className="add-user-btn"
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus"></i> Add New User
        </button>
      </div>

      <div className="user-filters mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Role</option>
              <option value="user">User</option>
              <option value="ops">Ops</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <small className="text-muted">
              Show{" "}
              <select className="form-select form-select-sm d-inline-block" style={{ width: "80px" }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>{" "}
              entries
            </small>
          </div>
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      {loading && <div style={{ color: "#666", marginBottom: 10 }}>Working...</div>}

      <div className="users-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>USER</th>
                <th>ROLE</th>
                <th>ASSIGNED BRANCH</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar-large">{u.avatar}</div>
                      <div className="user-details">
                        <h6 style={{ margin: 0 }}>{u.name}</h6>
                        <small>{u.email}</small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`role-badge ${u.role}`}>{u.role.toUpperCase()}</span>
                  </td>

                  <td>{u.branch}</td>

                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="action-btn edit"
                        title="Edit"
                        onClick={() => {
                          setEditingUser({
                            id: u.id,
                            fullName: u.name,                // match AddUserModal expected prop
                            emailAddress: u.email,           // match AddUserModal expected prop
                            role: u.role,
                            branchAccess: u.branch
                              ? u.branch.split(",").map(b => b.trim())
                              : [],                          // convert string to array for modal
                          });
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button className="action-btn delete" title="Delete" onClick={() => deleteUser(u.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#666" }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <small className="text-muted">Showing {filtered.length} of {users.length} entries</small>
        </div>
      </div>

      <AddUserModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUser(null);
        }}
        onSave={handleSaveFromModal}
        defaultData={editingUser}
      />
    </div>
  );
}
