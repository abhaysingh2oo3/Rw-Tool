import React from "react";
import { NavLink } from "react-router-dom";
import "./admin.css";

export default function AdminSidebar() {
  const navItems = [
    {
      path: "/admin/dashboard",
      icon: "bi-house-door-fill",
      label: "Dashboard"
    },
    {
      path: "/admin/user-management",
      icon: "bi-people-fill",
      label: "User Management"
    },
    {
      path: "/admin/access-control",
      icon: "bi-shield-check",
      label: "Access Control"
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div style={{ padding: '20px', borderBottom: '1px solid #e9ecef' }}>
        <div className="d-flex align-items-center gap-2">
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #0072CE, #00A87E)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            SC
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: '#212529' }}>
              Standard Chartered
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-column nav">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}
