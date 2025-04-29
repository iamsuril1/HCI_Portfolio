import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Speech Accessibility Function
  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome to your profile, John Doe! Explore your recent quiz scores and edit your profile.");
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌞" : "🌙"}
      </button>

      <h1 className="profile-title">My Profile</h1>

      <div className="profile-content">
        <div className="profile-info">
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-email">johndoe@example.com</p>
          <p className="profile-role">Role: Player</p>
          <p className="profile-joined">Joined: January 2024</p>
        </div>

        <div className="recent-quizzes">
          <h2 className="recent-title">Recent Quizzes</h2>
          <ul className="quiz-list">
            <li className="quiz-item">Science Quiz - Score: 8/10</li>
            <li className="quiz-item">Math Quiz - Score: 7/10</li>
            <li className="quiz-item">History Quiz - Score: 9/10</li>
          </ul>
        </div>
      </div>

      <div className="profile-actions">
        <Link to="/editprofile">
          <button className="edit-button">Edit Profile</button>
        </Link>
      </div>

      {/* Speech Button */}
      <div className="speech-button-floating">
        <button
          className="speech-button"
          onClick={handleSpeech}
          aria-label="Read profile info aloud"
          tabIndex="0"
        >
          🎤
        </button>
      </div>
    </div>
  );
};

export default Profile;
