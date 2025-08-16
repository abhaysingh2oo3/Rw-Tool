import React, { useState } from "react";
import Modal from '../components/Modal';
import {Plus, Search, Edit3, Trash2, Shield, Users, Settings, Database, Filter, Download } from "lucide-react";
import './AccessControl.css';

const AccessControl = () => {
  const [showCreateModuleModal, setShowCreateModuleModal] = useState(false);
  const [showEditModuleModal, setShowEditModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'HR Management System',
      mainBranch: 'Branch A',
      dateBranches: ['HR-01', 'HR-02'],
      assignedUsers: ['John Smith', 'Sarah Johnson'],
      lastModified: '3 weeks ago',
      description: 'Complete HR management solution'
    },
    {
      id: 2,
      name: 'Finance Portal',
      mainBranch: 'Branch B',
      dateBranches: ['FIN-01', 'FIN-02'],
      assignedUsers: ['Mike Wilson'],
      lastModified: '2 days ago',
      description: 'Financial management and reporting'
    },
    {
      id: 3,
      name: 'Inventory System',
      mainBranch: 'Branch C',
      dateBranches: ['INV-01'],
      assignedUsers: ['Lisa Anderson', 'Tom Brown'],
      lastModified: '1 week ago',
      description: 'Inventory tracking and management'
    }
  ]);

  const [newModule, setNewModule] = useState({
    name: '',
    selectedBranches: {
      'Branch A': [],
      'Branch B': [],
      'Branch C': []
    },
    availableUsers: [],
    assignedUsers: []
  });

  const branchOptions = {
    'Branch A': ['HR-01', 'HR-02', 'HR-03'],
    'Branch B': ['FIN-01', 'FIN-02', 'FIN-03'],
    'Branch C': ['INV-01', 'INV-02', 'INV-03']
  };

  const availableUsers = [
    'John Smith', 'Sarah Johnson', 'Mike Wilson', 
    'Lisa Anderson', 'Tom Brown', 'Jane Davis',
    'Robert Lee', 'Maria Garcia'
  ];

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.mainBranch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBranchChange = (branch, subBranch, checked) => {
    setNewModule(prev => ({
      ...prev,
      selectedBranches: {
        ...prev.selectedBranches,
        [branch]: checked
          ? [...prev.selectedBranches[branch], subBranch]
          : prev.selectedBranches[branch].filter(sb => sb !== subBranch)
      }
    }));
  };

  const handleUserAssignment = (user, assigned) => {
    if (assigned) {
      setNewModule(prev => ({
        ...prev,
        assignedUsers: [...prev.assignedUsers, user],
        availableUsers: prev.availableUsers.filter(u => u !== user)
      }));
    } else {
      setNewModule(prev => ({
        ...prev,
        availableUsers: [...prev.availableUsers, user],
        assignedUsers: prev.assignedUsers.filter(u => u !== user)
      }));
    }
  };

  const handleCreateModule = () => {
    if (!newModule.name.trim()) return;
    
    const allSelectedBranches = Object.values(newModule.selectedBranches).flat();
    if (allSelectedBranches.length === 0) return;

    const createdModule = {
      id: modules.length + 1,
      name: newModule.name,
      mainBranch: Object.keys(newModule.selectedBranches).find(
        branch => newModule.selectedBranches[branch].length > 0
      ) || 'Branch A',
      dateBranches: allSelectedBranches,
      assignedUsers: newModule.assignedUsers,
      lastModified: 'Just now',
      description: `Access module for ${newModule.name}`
    };

    setModules([...modules, createdModule]);
    
    // Reset form
    setNewModule({
      name: '',
      selectedBranches: {
        'Branch A': [],
        'Branch B': [],
        'Branch C': []
      },
      availableUsers: [],
      assignedUsers: []
    });
    
    setShowCreateModuleModal(false);
  };

  const resetModal = () => {
    setNewModule({
      name: '',
      selectedBranches: {
        'Branch A': [],
        'Branch B': [],
        'Branch C': []
      },
      availableUsers: [...availableUsers],
      assignedUsers: []
    });
  };

  const openCreateModal = () => {
    resetModal();
    setShowCreateModuleModal(true);
  };

  // Edit Module Functions
  const handleEditModule = (module) => {
    setEditingModule({ ...module });
    setNewModule({
      name: module.name,
      selectedBranches: {
        'Branch A': module.dateBranches.filter(branch => branch.startsWith('HR')),
        'Branch B': module.dateBranches.filter(branch => branch.startsWith('FIN')),
        'Branch C': module.dateBranches.filter(branch => branch.startsWith('INV'))
      },
      availableUsers: availableUsers.filter(user => !module.assignedUsers.includes(user)),
      assignedUsers: [...module.assignedUsers]
    });
    setShowEditModuleModal(true);
  };

  const handleUpdateModule = () => {
    if (!newModule.name.trim()) return;
    
    const allSelectedBranches = Object.values(newModule.selectedBranches).flat();
    if (allSelectedBranches.length === 0) return;

    const updatedModule = {
      ...editingModule,
      name: newModule.name,
      mainBranch: Object.keys(newModule.selectedBranches).find(
        branch => newModule.selectedBranches[branch].length > 0
      ) || editingModule.mainBranch,
      dateBranches: allSelectedBranches,
      assignedUsers: newModule.assignedUsers,
      lastModified: 'Just updated',
      description: `Access module for ${newModule.name}`
    };

    setModules(modules.map(module => 
      module.id === editingModule.id ? updatedModule : module
    ));
    
    // Reset form and close modal
    resetModal();
    setEditingModule(null);
    setShowEditModuleModal(false);
  };

  // Delete Module Function
  const handleDeleteModule = (moduleId, moduleName) => {
    if (window.confirm(`Are you sure you want to delete "${moduleName}"? This action cannot be undone.`)) {
      setModules(modules.filter(module => module.id !== moduleId));
      // You could add a success toast notification here
      console.log(`Module "${moduleName}" has been deleted successfully.`);
    }
  };

  const closeEditModal = () => {
    setShowEditModuleModal(false);
    setEditingModule(null);
    resetModal();
  };

  return (
    <div className="access-control">
      <div className="page-header">
        <div className="page-title-section">
          <div className="title-with-icon">
            <Shield size={32} className="page-icon" />
            <div>
              <h1>Access Control Management</h1>
              <p className="subtitle">Configure access permissions for modules</p>
            </div>
          </div>
        </div>
        <button 
          className="btn-primary create-module-btn"
          onClick={openCreateModal}
        >
          <Plus size={16} style={{ marginRight: '8px' }} /> Create Access Module
        </button>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon"><Search /></span>
        </div>
        
        <div className="control-buttons">
          <button className="btn-filter">
            <Filter size={16} />
            Filters
          </button>
          <button className="btn-export">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="modules-section">
        <div className="showing-text">
          Showing {filteredModules.length} of {modules.length} Modules
        </div>
        
        <div className="modules-grid">
          {filteredModules.map(module => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <div className="module-info">
                  <div className="module-icon">
                    {module.name.includes('HR') ? <Users size={24} /> :
                     module.name.includes('Finance') ? <Database size={24} /> :
                     <Settings size={24} />}
                  </div>
                  <div>
                    <h3 className="module-name">{module.name}</h3>
                    <p className="module-branch">{module.mainBranch}</p>
                  </div>
                </div>
                <div className="module-actions">
                  <button 
                    className="action-btn edit" 
                    title="Edit Module"
                    onClick={() => handleEditModule(module)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-btn delete" 
                    title="Delete Module"
                    onClick={() => handleDeleteModule(module.id, module.name)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="module-content">
                <div className="data-branches">
                  <strong>Date/Branches:</strong>
                  <div className="branch-tags">
                    {module.dateBranches.map(branch => (
                      <span key={branch} className="branch-tag">{branch}</span>
                    ))}
                  </div>
                </div>
                
                <div className="assigned-users">
                  <strong>Assigned Users:</strong>
                  <div className="users-list">
                    {module.assignedUsers.slice(0, 2).map(user => (
                      <span key={user} className="user-tag">{user}</span>
                    ))}
                    {module.assignedUsers.length > 2 && (
                      <span className="user-count">+{module.assignedUsers.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                <div className="last-modified">
                  <strong>Last Modified:</strong> {module.lastModified}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showCreateModuleModal}
        onClose={() => setShowCreateModuleModal(false)}
        title="Create New Access Module"
        size="large"
      >
        <div className="create-module-form">
          <div className="form-section">
            <label htmlFor="moduleName">Module Name</label>
            <input
              type="text"
              id="moduleName"
              placeholder="Enter module name"
              value={newModule.name}
              onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
            />
          </div>

          <div className="form-section">
            <label>Select Main Branch</label>
            <div className="branches-selection">
              {Object.entries(branchOptions).map(([branch, subBranches]) => (
                <div key={branch} className="branch-group">
                  <h4>{branch}</h4>
                  <div className="sub-branches">
                    {subBranches.map(subBranch => (
                      <label key={subBranch} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newModule.selectedBranches[branch].includes(subBranch)}
                          onChange={(e) => handleBranchChange(branch, subBranch, e.target.checked)}
                        />
                        {subBranch}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="user-assignment">
              <div className="users-column">
                <h4>Available Users</h4>
                <div className="users-list-box">
                  {availableUsers.filter(user => 
                    !newModule.assignedUsers.includes(user)
                  ).map(user => (
                    <label key={user} className="user-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => handleUserAssignment(user, e.target.checked)}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="users-column">
                <h4>Assigned Users</h4>
                <div className="users-list-box">
                  {newModule.assignedUsers.map(user => (
                    <label key={user} className="user-checkbox">
                      <input
                        type="checkbox"
                        checked
                        onChange={(e) => handleUserAssignment(user, false)}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => setShowCreateModuleModal(false)} 
              className="btn-cancel"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleCreateModule} 
              className="btn-primary"
              disabled={!newModule.name.trim() || Object.values(newModule.selectedBranches).flat().length === 0}
            >
              Create Module
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Module Modal */}
      <Modal
        isOpen={showEditModuleModal}
        onClose={closeEditModal}
        title={`Edit Access Module: ${editingModule?.name || ''}`}
        size="large"
      >
        <div className="create-module-form">
          <div className="form-section">
            <label htmlFor="editModuleName">Module Name</label>
            <input
              type="text"
              id="editModuleName"
              placeholder="Enter module name"
              value={newModule.name}
              onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
            />
          </div>

          <div className="form-section">
            <label>Select Main Branch</label>
            <div className="branches-selection">
              {Object.entries(branchOptions).map(([branch, subBranches]) => (
                <div key={branch} className="branch-group">
                  <h4>{branch}</h4>
                  <div className="sub-branches">
                    {subBranches.map(subBranch => (
                      <label key={subBranch} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newModule.selectedBranches[branch].includes(subBranch)}
                          onChange={(e) => handleBranchChange(branch, subBranch, e.target.checked)}
                        />
                        {subBranch}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="user-assignment">
              <div className="users-column">
                <h4>Available Users</h4>
                <div className="users-list-box">
                  {availableUsers.filter(user => 
                    !newModule.assignedUsers.includes(user)
                  ).map(user => (
                    <label key={user} className="user-checkbox">
                      <input
                        type="checkbox"
                        onChange={(e) => handleUserAssignment(user, e.target.checked)}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="users-column">
                <h4>Assigned Users</h4>
                <div className="users-list-box">
                  {newModule.assignedUsers.map(user => (
                    <label key={user} className="user-checkbox">
                      <input
                        type="checkbox"
                        checked
                        onChange={(e) => handleUserAssignment(user, false)}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={closeEditModal} 
              className="btn-cancel"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleUpdateModule} 
              className="btn-primary"
              disabled={!newModule.name.trim() || Object.values(newModule.selectedBranches).flat().length === 0}
            >
              <Edit3 size={16} style={{ marginRight: '8px' }} />
              Update Module
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccessControl;
