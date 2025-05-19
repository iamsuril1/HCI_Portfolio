import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Quiz Nexus. All rights reserved.
      <div>
        <Link to="/feedback">Feedback</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    </footer>
  );
};

export default Footer;
