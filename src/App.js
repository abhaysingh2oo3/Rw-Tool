// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import OpsDashboard from "./OpsDashboard";
import UserDashboard from "./user/UserDashboard";
import AdminLayout from "./admin/AdminLayout";
import LandingPage from "./landing/LandingPage";
import LoginPage from "./landing/LoginPage";



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
      <Route path="/admin/*" element={<AdminLayout />} />

    
    </Routes>
  );
}
