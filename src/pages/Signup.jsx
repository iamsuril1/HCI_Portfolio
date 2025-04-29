import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [themeMessage, setThemeMessage] = useState("");
  const toggleRef = useRef(null);
  const [position, setPosition] = useState({ top: window.innerHeight / 2, left: window.innerWidth - 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    validatePassword(e.target.name, e.target.value);
    validateEmail(e.target.name, e.target.value);
  };

  const validatePassword = (name, value) => {
    if (name === "password" || name === "confirmPassword") {
      let errors = {};
      if (value.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
      }
      if (!/[A-Z]/.test(value)) {
        errors.password = "Password must contain at least one uppercase letter.";
      }
      if (!/\d/.test(value)) {
        errors.password = "Password must contain at least one number.";
      }
      if (!/@/.test(value)) {
        errors.password = "Password must contain at least one special character (@).";
      }
      setPasswordErrors(errors);
    }
  };

  const validateEmail = (name, value) => {
    if (name === "email") {
      let error = "";
      if (!value.includes("@")) {
        error = "Please enter a valid email with @.";
      }
      setEmailError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (name === "") {
      setError("Name is required.");
    } else if (email === "") {
      setError("Email is required.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (Object.keys(passwordErrors).length > 0) {
      setError("Please fix the password errors before submitting.");
    } else if (emailError) {
      setError(emailError);
    } else {
      // Proceed with signup
      signup(name, email, password);
      navigate("/login"); // Navigate to the login page
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);

    setThemeMessage(newMode ? "🌙 Dark Mode Activated" : "🌞 Light Mode Activated");
    setTimeout(() => {
      setThemeMessage("");
    }, 3000);
  };

  // Dragging logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = toggleRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        top: e.clientY - offset.y,
        left: e.clientX - offset.x,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Create your account to begin your quiz journey!"
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="signup-page" role="main">
      {/* Floating Dark Mode Toggle */}
      <div
        ref={toggleRef}
        className="theme-toggle-floating"
        onMouseDown={handleMouseDown}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          position: 'fixed',
          cursor: 'grab',
          pointerEvents: 'none', // 🔥 Added here
        }}
      >
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          tabIndex="0"
          style={{ pointerEvents: 'auto' }} // 🔥 Added here
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Floating Speech Button */}
      <div className="speech-button-floating">
        <button
          className="speech-button"
          onClick={handleSpeech}
          aria-label="Read welcome message aloud"
          tabIndex="0"
        >
          🎤
        </button>
      </div>

      {/* Theme Message */}
      {themeMessage && (
        <div className="theme-message">
          {themeMessage}
        </div>
      )}

      {/* Signup Form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Sign up to start your quiz journey!</p>

          {/* Name Input */}
          <div className="floating-input">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
              aria-label="Name"
              tabIndex="0"
            />
            <label>Name</label>
            {error && error === "Name is required." && (
              <div className="error-message">{error}</div>
            )}
          </div>

          {/* Email Input */}
          <div className="floating-input">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              aria-label="Email"
              tabIndex="0"
            />
            <label>Email</label>
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          {/* Password Input */}
          <div className="floating-input">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
              aria-label="Password"
              tabIndex="0"
            />
            <label>Password</label>
            {passwordErrors.password && <div className="error-message">{passwordErrors.password}</div>}
          </div>

          {/* Confirm Password Input */}
          <div className="floating-input">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              required
              aria-label="Confirm Password"
              tabIndex="0"
            />
            <label>Confirm Password</label>
            {error && <div className="error-message">{error}</div>}
          </div>

          {error && !passwordErrors.password && !emailError && <div className="error-message">{error}</div>}

          <button type="submit" tabIndex="0" disabled={Object.keys(passwordErrors).length > 0 || formData.name === "" || emailError}>
            Sign Up
          </button>

          <div className="signup-link">
            Already Have an account{" "}
            <span onClick={() => navigate("/login")} tabIndex="0" role="button">Login</span>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
