import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import AccessControl from "./AccessControl";
import Footer from "./Footer";
import "./admin.css";

export default function AdminLayout() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get("/api/groups");
      setGroups(res.data || []);
    } catch (err) {
      console.error("Error fetching groups", err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />

      <div className="admin-main">
        <AdminSidebar />

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<AdminDashboard groups={groups} />} />
            <Route path="/dashboard" element={<AdminDashboard groups={groups} />} />
            <Route path="/user-management" element={<UserManagement groups={groups} />} />
            <Route path="/access-control" element={<AccessControl groups={groups} />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}
