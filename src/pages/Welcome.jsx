import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import welcomeImage from "../assets/quiz-hero.png"; 
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleRef = useRef(null);
  const speechRef = useRef(null);

  const [togglePos, setTogglePos] = useState({ top: window.innerHeight / 2, left: window.innerWidth - 80 });
  const [speechPos, setSpeechPos] = useState({ top: window.innerHeight / 2, left: 20 });

  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, type) => {
    setDragging(type);
    const rect = (type === "toggle" ? toggleRef : speechRef).current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newPosition = {
        top: e.clientY - offset.y,
        left: e.clientX - offset.x,
      };
      dragging === "toggle" ? setTogglePos(newPosition) : setSpeechPos(newPosition);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
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
  }, [dragging]);

  const handlePlayNow = () => {
    navigate(isLoggedIn ? "/choose-topic" : "/login");
    speakText("Starting the quiz.");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    speakText(isDarkMode ? "Light mode activated" : "Dark mode activated");
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const readTextAloud = () => {
    const text = `Welcome to Quiz Nexus! Ready to test your knowledge and have some fun? Choose a mode and let's begin!`;
    speakText(text);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const userName = "";

  return (
    <main className="welcome-wrapper" role="main" aria-labelledby="welcome-heading">

      {/* Theme Toggle on Right */}
      <div
        ref={toggleRef}
        className="theme-toggle-floating"
        onMouseDown={(e) => handleMouseDown(e, "toggle")}
        style={{ top: `${togglePos.top}px`, left: `${togglePos.left}px`, position: 'fixed', cursor: 'grab' }}
        tabIndex="0"
      >
        <button className="toggle-theme-button" onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Speech Button on Left */}
      <div
        ref={speechRef}
        className="speech-button-floating"
        onMouseDown={(e) => handleMouseDown(e, "speech")}
        style={{ top: `${speechPos.top}px`, left: `${speechPos.left}px`, position: 'fixed', cursor: 'grab' }}
        tabIndex="0"
      >
        <button className="read-aloud-button" onClick={readTextAloud} aria-label="Read Welcome Text Aloud">
          🎤
        </button>
      </div>

      <div className="welcome-container">
        <img src={welcomeImage} alt="Quiz Hero" className="welcome-img" />
        <h1 id="welcome-heading" className="welcome-title">
          {userName ? `Welcome back, ${userName}!` : "Welcome to Quiz Nexus!"}
        </h1>
        <p className="welcome-text">
          Ready to test your knowledge and have some fun? Choose a mode and let's begin!
        </p>
        <button className="play-button" onClick={handlePlayNow}>
          Play Now
        </button>
      </div>
    </main>
  );
};

export default Welcome;
