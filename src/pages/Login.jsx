import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [themeMessage, setThemeMessage] = useState("");
  const toggleRef = useRef(null);
  const [position, setPosition] = useState({ top: window.innerHeight / 2, left: window.innerWidth - 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const { login } = useAuth();

  const validEmail = "test@example.com";
  const validPassword = "password123";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === validEmail && password === validPassword) {
      login();
      navigate("/");
    } else {
      setError("Invalid email or password.");
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
      "Welcome back! Please log in to continue your quiz journey."
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="login-page" role="main">
      {/* Floating Dark Mode Toggle */}
      <div
        ref={toggleRef}
        className="theme-toggle-floating"
        style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'fixed', pointerEvents: 'none' }}
      >
        <button
          className="dark-mode-toggle"
          onMouseDown={handleMouseDown}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          tabIndex="0"
          style={{ pointerEvents: 'auto' }}
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

      {/* Login Form */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Log in to continue your quiz journey!</p>

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
          </div>

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
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" tabIndex="0">Log In</button>

          <div className="signup-link">
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/signup")} tabIndex="0" role="button">Sign Up</span>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
