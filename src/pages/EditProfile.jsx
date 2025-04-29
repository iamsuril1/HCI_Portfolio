import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.name || !userDetails.email) {
      setError("Both fields are required.");
      return;
    }
    navigate("/profile");
  };

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Edit your profile details. Enter your name and email address and click Save Changes."
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`edit-profile-container ${isDarkMode ? "dark" : "light"}`}>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {/* Dark Mode Toggle Button with Sun/Moon */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="dark-mode-toggle"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>

        {/* Speech Button */}
        <div className="speech-button-floating">
          <button
            className="speech-button"
            onClick={handleSpeech}
            aria-label="Read instructions aloud"
            tabIndex="0"
          >
            🎤
          </button>
        </div>

        <h2>Edit Profile</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="floating-input">
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="name">Full Name</label>
        </div>

        <div className="floating-input">
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email Address</label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
