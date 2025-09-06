// src/components/Footer.js
import React from "react";
//import "./_custom.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer-container" style={{ background: "#002d72", color: "white", padding: "40px 0" }}>
      <Container>
        <Row>
          {/* Left Section: Logo + Links */}
          <Col md={8} className="footer-left">
            {/* Logo */}
            <div className="footer-logo mb-4 d-flex align-items-center gap-2">
              <img
                src="/scb_logo.png"
                alt="Standard Chartered"
                style={{ height: "32px" }}
              />
              <span style={{ fontWeight: "600", fontSize: "16px" }}>
                Standard Chartered
              </span>
            </div>

            {/* Links in 2 columns */}
            <Row>
              <Col sm={6}>
                <ul className="footer-links list-unstyled small">
                  <li>Accessibility</li>
                  <li>Cookie policy</li>
                  <li>Terms of use</li>
                  <li>Privacy policy</li>
                  <li>Modern slavery statement</li>
                  <li>Regulatory disclosures</li>
                  <li>Straight2Bank onboarding portal</li>
                  <li>Our Code of Conduct and Ethics</li>
                </ul>
              </Col>
              <Col sm={6}>
                <ul className="footer-links list-unstyled small">
                  <li>Online security</li>
                  <li>Fighting financial crime</li>
                  <li>Our suppliers</li>
                  <li>FAQs</li>
                  <li>Our locations</li>
                  <li>Contact us</li>
                  <li>Sitemap</li>
                  <li>Manage cookies</li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Right Section: Socials */}
          <Col md={4} className="footer-right text-center text-md-end">
            <div className="social-icons mb-3">
              <FaFacebook className="me-2" />
              <FaInstagram className="me-2" />
              <FaTwitter className="me-2" />
              <FaLinkedin className="me-2" />
              <FaYoutube />
            </div>
            <div className="copyright small">
              © Standard Chartered 2025. All Rights Reserved
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
