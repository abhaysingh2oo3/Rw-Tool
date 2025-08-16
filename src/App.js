// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import OpsDashboard from "./OpsDashboard";
import UserDashboard from "./user/UserDashboard";
import LandingPage from "./landing/LandingPage";
import LoginPage from "./landing/LoginPage";
import Dashboard from "./admin/pages/dashboard"; 
import { AdminProvider } from "./admin/context/AdminContext";
import { ReportsProvider } from "./admin/context/ReportsContext";
import UserManagement from "./admin/pages/UserManagement/UserManagement";
import AccessControl from "./admin/pages/AccessControl/AccessControl";
import ReportsManagement from "./admin/pages/ReportsManagement/ReportsManagement";

export default function App() {
  return (
    
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboards */}
        <Route path="/ops" element={<OpsDashboard />} />
        <Route path="/user" element={<UserDashboard />} />

        {/* Admin Dashboard with providers */}
        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <ReportsProvider>
                <Dashboard />
                 
              </ReportsProvider>
            </AdminProvider>
          }
        />
      </Routes>
    
  );
}
