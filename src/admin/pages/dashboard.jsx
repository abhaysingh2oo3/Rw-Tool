import React from "react";
import { Routes, Route } from "react-router-dom";
import "./dashboard.css";

// Components
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import RealTimeDashboardHome from "./components/RealTimeDashboardHome.jsx";

// Pages inside Dashboard
import UserManagement from "./UserManagement/UserManagement.jsx";
import AccessControl from "./AccessControl/AccessControl.jsx";
import ReportsManagement from "./ReportsManagement/ReportsManagement.jsx";
import Settings from "./Settings/Setting.jsx";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Full-width header */}
      <Header />

      {/* Sidebar + Content layout */}
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route index element={<RealTimeDashboardHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}
