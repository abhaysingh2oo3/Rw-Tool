// Import React library for component creation
import React from "react";
// Import React Router components for client-side routing
import { Routes, Route } from "react-router-dom";
// Import admin-specific components
import AdminHeader from "./AdminHeader"; // Top navigation and user info
import AdminSidebar from "./AdminSidebar"; // Left navigation menu
import AdminDashboard from "./AdminDashboard"; // Main dashboard with overview
import UserManagement from "./UserManagement"; // User CRUD operations
import AccessControl from "./AccessControl"; // Module access permissions
// Import shared footer component from user section
import Footer from "../user/Footer";
// Import admin-specific CSS styles
import "./admin.css";

// Main AdminLayout component - defines the overall structure for admin pages
// This component acts as a shell that wraps all admin functionality
export default function AdminLayout() {
  return (
    <div className="admin-layout"> {/* Main container with admin-specific styling */}
      {/* Header Section - contains logo, user info, notifications */}
      <AdminHeader />
      
      {/* Main Content Area - contains sidebar and page content */}
      <div className="admin-main">
        {/* Left Sidebar - navigation menu for admin sections */}
        <AdminSidebar />
        
        {/* Content Area - where different admin pages are rendered */}
        <div className="admin-content">
          {/* React Router Routes - defines which component renders for each URL */}
          <Routes>
            {/* Default route - shows dashboard */}
            <Route path="/" element={<AdminDashboard />} />
            {/* Explicit dashboard route */}
            <Route path="/dashboard" element={<AdminDashboard />} />
            {/* User management page - add, edit, delete users */}
            <Route path="/user-management" element={<UserManagement />} />
            {/* Access control page - manage module permissions */}
            <Route path="/access-control" element={<AccessControl />} />
          </Routes>
        </div>
      </div>

      {/* Footer Section - shared footer component */}
      <Footer />
    </div>
  );
}
