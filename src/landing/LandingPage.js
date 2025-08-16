import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./llcustom.css"; // Standard Chartered theme colors

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* ===== Navbar ===== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand fw-bold text-primary" href="#hero">
            <img src="/logo.png" alt="RW Tool" height="30" className="me-2" />
            RW Tool
          </a>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fw-semibold">
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#our-tool">Our Tool</a>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section
  id="hero"
  className="text-white text-center d-flex align-items-center hero-section"
>
  <div className="overlay"></div>
  <div className="container position-relative z-2">
    <h1 className="display-4 fw-bold">Smart Reporting, Made Simple</h1>
    <p className="lead">
      RW Tool helps you manage reports efficiently with real-time tracking.
    </p>
    <button
      className="btn btn-primary btn-lg mt-3"
      onClick={() =>
        document.getElementById("our-tool").scrollIntoView({ behavior: "smooth" })
      }
    >
      Explore Tool <i className="bi bi-arrow-down ms-1"></i>
    </button>
  </div>
</section>


      {/* ===== About Us ===== */}
      <section id="about" className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">About Us</h2>
          <p className="lead">
            We are a passionate team dedicated to building tools that make work easier.
            The RW Tool was created to simplify reporting, streamline workflows,
            and improve efficiency across multiple teams.
          </p>
          <p className="text-muted">
            Our mission is to provide intuitive, reliable, and secure solutions for managing reports.
          </p>
        </div>
      </section>
{/* ===== Our Tool ===== */}
<section id="our-tool" className="py-5">
  <div className="container text-center">
    <h2 className="fw-bold mb-4">Our Tool</h2>
    <p className="lead mb-5">
      The RW Tool offers powerful features to help you get more done.
    </p>

    <div className="row g-4">

      <div className="col-md-4">
        <i className="bi bi-people-fill text-info display-4"></i>
        <h5 className="mt-3">Multi-role Login</h5>
        <p>User, Ops, and Admin roles for tailored access.</p>
      </div>

      <div className="col-md-4">
        <i className="bi bi-speedometer2 text-danger display-4"></i>
        <h5 className="mt-3">Fast Report Management</h5>
        <p>Upload, organize, and manage reports easily.</p>
      </div>

      <div className="col-md-4">
        <i className="bi bi-lock-fill text-success display-4"></i>
        <h5 className="mt-3">Secure Access</h5>
        <p>Industry-grade security to protect your data.</p>
      </div>
      <div className="col-md-4">
        <i className="bi bi-star-fill text-warning display-4"></i>
        <h5 className="mt-3">Favorites</h5>
        <p>Quickly access your most important reports.</p>
      </div>

      <div className="col-md-4">
        <i className="bi bi-funnel-fill text-success display-4"></i>
        <h5 className="mt-3">Dynamic Filtering</h5>
        <p>Filter and find reports in seconds.</p>
      </div>

      <div className="col-md-4">
        <i className="bi bi-shield-lock-fill text-primary display-4"></i>
        <h5 className="mt-3">Secure Data</h5>
        <p>We take your privacy and security seriously.</p>
      </div>

    </div>
  </div>
</section>

      {/* ===== Footer ===== */}
      <footer className="bg-dark text-white py-3 text-center">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} RW Tool. All rights reserved.
          </p>
          <small>
            <a href="#about" className="text-white me-3">About</a>
            <a href="#our-tool" className="text-white me-3">Our Tool</a>
            <a href="/login" className="text-white">Login</a>
          </small>
        </div>
      </footer>

    </div>
  );
}
