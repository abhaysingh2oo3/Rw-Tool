import React, { useState } from "react";
import { AddUserModal } from "./Modals";
import "./admin.css";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("Last Active");
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      role: "analyst",
      branch: "D",
      status: "active",
      lastActive: "1 week ago",
      avatar: "LT"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "analyst",
      branch: "C, 01",
      status: "inactive",
      lastActive: "5 days ago",
      avatar: "ER"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "manager",
      branch: "B",
      status: "active",
      lastActive: "1 day ago",
      avatar: "MC"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      role: "manager",
      branch: "B",
      status: "active",
      lastActive: "3 hours ago",
      avatar: "DK"
    },
    {
      id: 5,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      role: "admin",
      branch: "A, 02",
      status: "active",
      lastActive: "2 hours ago",
      avatar: "SW"
    }
  ]);

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleSaveUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      name: userData.fullName,
      email: userData.emailAddress,
      role: userData.role.toLowerCase(),
      branch: userData.branchAccess.join(", "),
      status: "active",
      lastActive: "Just now",
      avatar: userData.fullName.split(" ").map(n => n[0]).join("").toUpperCase()
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Filter and search functionality
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="user-management">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ color: '#212529', fontWeight: '600', margin: 0 }}>User Management</h4>
        </div>
        <button className="add-user-btn" onClick={handleAddUser}>
          <i className="bi bi-plus"></i>
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="user-filters mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
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
          <div className="col-md-2 mb-3">
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Last Active">Sort by: Last Active</option>
              <option value="Name">Sort by: Name</option>
              <option value="Role">Sort by: Role</option>
            </select>
          </div>
          <div className="col-md-2 mb-3">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary flex-fill" title="List View">
                <i className="bi bi-list"></i>
              </button>
              <button className="btn btn-outline-primary flex-fill" title="Grid View">
                <i className="bi bi-grid-3x3-gap"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <small className="text-muted">
              Show <select className="form-select form-select-sm d-inline-block" style={{width: 'auto'}}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select> entries
            </small>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>USER</th>
                <th>ROLE</th>
                <th>ASSIGNED BRANCH</th>
                <th>STATUS</th>
                <th>LAST ACTIVE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar-large">{user.avatar}</div>
                      <div className="user-details">
                        <h6>{user.name}</h6>
                        <small>{user.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{user.branch}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status === 'active' ? '● Active' : '● Inactive'}
                    </span>
                  </td>
                  <td>{user.lastActive}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditUser(user.id)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <small className="text-muted">Showing 1 to 5 of 5 entries</small>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item">
                <a href="/" onClick={(e) => e.preventDefault()} className="page-link">

                  <i className="bi bi-chevron-left"></i>
                </a>
              </li>
              <li className="page-item active">
                <a href="/" onClick={(e) => e.preventDefault()} className="page-link">1</a>

              </li>
              <li className="page-item">
                <a href="/" onClick={(e) => e.preventDefault()} className="page-link">

                  <i className="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveUser}
      />

    </div>
  );
}
