// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Quiz Nexus Logo" className="logo-img" />
        </Link>
      </div>

      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>

      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <ul>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout} className="logout-btn">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
