// Import React library for component creation
import React from "react";
// Import NavLink from React Router for navigation with active states
import { NavLink } from "react-router-dom";
// Import admin-specific CSS styles
import "./admin.css";

// AdminSidebar component - provides navigation menu for admin sections
export default function AdminSidebar() {
  // Navigation items configuration - defines all admin menu options
  const navItems = [
    {
      path: "/admin/dashboard", // URL path for the dashboard
      icon: "bi-house-door-fill", // Bootstrap icon class for home/dashboard
      label: "Dashboard" // Display text for navigation item
    },
    {
      path: "/admin/user-management", // URL path for user management
      icon: "bi-people-fill", // Bootstrap icon class for users/people
      label: "User Management" // Display text for navigation item
    },
    {
      path: "/admin/access-control", // URL path for access control
      icon: "bi-shield-check", // Bootstrap icon class for security/shield
      label: "Access Control" // Display text for navigation item
    },
  ];

  // Component render method - returns the sidebar JSX structure
  return (
    <aside className="admin-sidebar"> {/* Main sidebar container */}
      {/* Company Logo and Branding Section */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
        {/* Flexbox container for logo and company name */}
        <div className="d-flex align-items-center gap-2">
          {/* Company logo - circular badge with SC initials */}
          <div style={{
            width: '32px', // Logo size
            height: '32px',
            background: 'linear-gradient(135deg, #0072CE, #00A87E)', // Standard Chartered brand colors
            borderRadius: '6px', // Rounded corners
            display: 'flex', // Center the initials
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white', // White text
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            SC {/* Standard Chartered initials */}
          </div>
          {/* Company name container */}
          <div>
            {/* Company name with bold styling */}
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#212529' }}>
              Standard Chartered
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-column nav"> {/* Vertical navigation container */}
        {/* Map through navigation items to create links */}
        {navItems.map((item, index) => (
          <NavLink
            key={index} /* Unique key for React list rendering */
            to={item.path} /* Navigation destination URL */
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}` /* Dynamic CSS class based on active state */
            }
          >
            {/* Navigation item icon */}
            <i className={`bi ${item.icon}`}></i>
            {/* Navigation item label text */}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom User Information Section */}
      <div style={{
        position: 'absolute', // Position at bottom of sidebar
        bottom: '20px',
        left: '20px',
        right: '20px',
        padding: '12px',
        background: '#f8f9fa', // Light gray background
        borderRadius: '8px', // Rounded corners
        fontSize: '11px', // Small text size
        color: '#6c757d' // Muted text color
      }}>
        {/* User info container with flexbox layout */}
        <div className="d-flex align-items-center gap-2">
          {/* User avatar - circular with initial */}
          <div style={{
            width: '24px', // Avatar size
            height: '24px',
            background: '#4285f4', // Blue background
            borderRadius: '50%', // Perfect circle
            display: 'flex', // Center the initial
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white', // White text
            fontWeight: 'bold',
            fontSize: '10px'
          }}>
            A {/* User initial */}
          </div>
          {/* User details container */}
          <div>
            {/* User name with bold styling */}
            <div style={{ fontWeight: '600', color: '#212529' }}>Abc</div>
            {/* User email address */}
            <div>abc@sc.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
