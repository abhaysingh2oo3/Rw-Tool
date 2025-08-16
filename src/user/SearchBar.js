import React from "react";
import "../custom.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search reports..."
      className="form-control me-2"
      style={{ maxWidth: "300px" }}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
