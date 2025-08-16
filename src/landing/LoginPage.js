import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./llcustom.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Navigate based on role selection
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "ops") {
      navigate("/ops");
    } else {
      navigate("/user");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0072CE, #00A87E)"
      }}
    >
      <div className="card shadow" style={{ width: "350px", borderRadius: "12px" , backgroundColor: "#ffffff" }}>
        <div className="card-body text-center">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Standard Chartered Logo"
            style={{ width: "120px", marginBottom: "15px" }}
          />
          <h3 className="mb-4 sc-primary-text">RW Tool Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label className="form-label sc-dark-text">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label sc-dark-text">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {/* Login As Dropdown */}
            <div className="mb-3 text-start">
              <label className="form-label sc-dark-text">Login As</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="ops">Ops</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="btn sc-btn-primary w-100">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
