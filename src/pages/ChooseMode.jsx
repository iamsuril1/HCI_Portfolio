import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importing images
import singlePlayerImg from "../assets/singleplayer.png";
import multiPlayerImg from "../assets/multiplayer.png";
import "../styles/ChooseMode.css"; // Assuming your CSS is here

const ChooseMode = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the localStorage for the user's theme preference
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark-mode", newMode);
  };

  const handleModeClick = (mode) => {
    navigate(`/quiz/${topic}/${mode}`);
  };

  // Speech function for accessibility
  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      `Choose a mode to play ${topic}. Select either Single Player or Multiplayer.`
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="choose-mode-page">
      <button 
        className="dark-mode-toggle" 
        onClick={toggleDarkMode} 
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <div className="mode-container">
        <div className="mode-box">
          <h2 className="mode-title">Choose a Mode</h2>
          <p className="mode-subtitle">How do you want to play {topic}?</p>
          <div className="mode-split">
            <div className="mode-half">
              <img src={singlePlayerImg} alt="Single Player" className="mode-image" />
              <button onClick={() => handleModeClick("single")} aria-label="Single Player Mode">
                Single Player
              </button>
            </div>

            <div className="mode-divider" />

            <div className="mode-half">
              <img src={multiPlayerImg} alt="Multiplayer" className="mode-image" />
              <button onClick={() => handleModeClick("multi")} aria-label="Multiplayer Mode">
                Multiplayer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Speech Button */}
      <div className="speech-button-floating">
        <button 
          className="speech-button" 
          onClick={handleSpeech} 
          aria-label="Read mode selection instructions aloud" 
          tabIndex="0"
        >
          🎤
        </button>
      </div>
    </main>
  );
};

export default ChooseMode;
