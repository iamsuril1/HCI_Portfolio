import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChooseTopic.css";

const topics = [
  "Science",
  "History",
  "Math",
  "Literature",
  "Geography",
  "Sports",
  "Technology",
  "Art",
];

const ChooseTopic = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark-mode", newMode);
  };

  const handleTopicClick = (topic) => {
    navigate(`/mode/${topic.toLowerCase()}`);
  };

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Pick a topic and challenge yourself in a category you love! You can choose from topics such as Science, History, Math, and more."
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <main className="topic-page">
      <div className="topic-container">
        <h1 className="topic-title">Pick a Topic</h1>
        <p className="topic-subtitle">Challenge yourself in a category you love!</p>

        <div className="topic-grid">
          {topics.map((topic) => (
            <button
              key={topic}
              className="topic-card"
              onClick={() => handleTopicClick(topic)}
              aria-label={`Choose the ${topic} topic`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {/* Speech Accessibility Button */}
      <div className="speech-button-floating">
        <button
          className="speech-button"
          onClick={handleSpeech}
          aria-label="Read page content aloud"
          tabIndex="0"
        >
          🎤
        </button>
      </div>
    </main>
  );
};

export default ChooseTopic;
