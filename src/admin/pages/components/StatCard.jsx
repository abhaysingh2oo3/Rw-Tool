import React from "react";
import "./StatCard.css";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {typeof Icon === 'function' ? <Icon size={24} /> : Icon}
      </div>
      <div className="stat-meta">
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}
