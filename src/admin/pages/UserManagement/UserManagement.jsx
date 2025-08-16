import React, { useState, useMemo } from "react";
import { Search, Plus, FileText, Grid, Edit, Trash2, User } from "lucide-react";
import AddUserModal from '../components/AddUserModal';
import './UserManagement.css';

const UserManagement = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastActive');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);

  // Sample user data - replace with your actual data source
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Admin',
      assignedBranch: 'A, 02',
      status: 'active',
      lastActive: '2 hours ago',
      avatar: User
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Manager',
      assignedBranch: 'B',
      status: 'active',
      lastActive: '1 day ago',
      avatar: User
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'Analyst',
      assignedBranch: 'C, 01',
      status: 'inactive',
      lastActive: '5 days ago',
      avatar: User
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Manager',
      assignedBranch: 'B',
      status: 'active',
      lastActive: '3 hours ago',
      avatar: User
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@company.com',
      role: 'Analyst',
      assignedBranch: 'D',
      status: 'active',
      lastActive: '1 week ago',
      avatar: User
    }
  ]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role.toLowerCase() === roleFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'lastActive') {
        // Simple sorting for demo - in real app, convert to actual dates
        const timeValues = {
          '2 hours ago': 2,
          '3 hours ago': 3,
          '1 day ago': 24,
          '5 days ago': 120,
          '1 week ago': 168
        };
        aValue = timeValues[a.lastActive] || 0;
        bValue = timeValues[b.lastActive] || 0;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [users, searchTerm, statusFilter, roleFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / showEntries);
  const startIndex = (currentPage - 1) * showEntries;
  const endIndex = startIndex + showEntries;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      name: userData.fullName,
      email: userData.email,
      role: userData.role.charAt(0).toUpperCase() + userData.role.slice(1),
      assignedBranch: userData.assignedBranch,
      status: 'active',
      lastActive: 'Just now',
      avatar: User
    };
    setUsers([...users, newUser]);
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = (userData) => {
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? {
            ...user,
            name: userData.fullName,
            email: userData.email,
            role: userData.role.charAt(0).toUpperCase() + userData.role.slice(1),
            assignedBranch: userData.assignedBranch,
            lastActive: 'Just now'
          }
        : user
    ));
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="page-title-section">
          <h1>User Management</h1>
        </div>
        <button 
          className="btn-primary add-user-btn"
          onClick={() => setShowAddUserModal(true)}
        >
          <Plus size={16} style={{ marginRight: '8px' }} /> Add New User
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon"><Search size={16} /></span>
        </div>
        
        <div className="filters">
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
          </select>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="sort-section">
          <span>Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="lastActive">Last Active</option>
            <option value="name">Name</option>
            <option value="role">Role</option>
            <option value="status">Status</option>
          </select>
        </div>
        
        <div className="view-toggle">
          <button className="view-btn active" title="List View">
            <FileText size={16} />
          </button>
          <button className="view-btn" title="Grid View">
            <Grid size={16} />
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-controls">
          <div className="show-entries">
            Show 
            <select 
              value={showEntries} 
              onChange={(e) => setShowEntries(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="sortable">
                User {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('role')} className="sortable">
                Role {sortBy === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Assigned Branch</th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('lastActive')} className="sortable">
                Last Active {sortBy === 'lastActive' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.assignedBranch}</td>
                <td>
                  <button 
                    className={`status-toggle ${user.status}`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    ● {user.status}
                  </button>
                </td>
                <td>{user.lastActive}</td>
                <td>
                  <div className="actions">
                    <button 
                      className="action-btn edit" 
                      title="Edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="showing-entries">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} entries
          </div>
          
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={currentPage === pageNum ? 'active' : ''}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSubmit={handleAddUser}
      />
      
      <AddUserModal
        isOpen={showEditUserModal}
        onClose={() => {
          setShowEditUserModal(false);
          setEditingUser(null);
        }}
        onSubmit={handleUpdateUser}
        initialData={editingUser ? {
          fullName: editingUser.name,
          email: editingUser.email,
          role: editingUser.role.toLowerCase(),
          assignedBranch: editingUser.assignedBranch
        } : null}
        title={editingUser ? "Edit User" : "Add New User"}
      />
    </div>
  );
};

export default UserManagement;
