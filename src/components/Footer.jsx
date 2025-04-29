import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Quiz Nexus. All rights reserved.
    </footer>
  );
};

export default Footer;
