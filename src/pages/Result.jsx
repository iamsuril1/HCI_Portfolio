import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "../styles/Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [mode, setMode] = useState("");
  const [topic, setTopic] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicParam = location.pathname.split("/")[2] || "general";
    const modeParam = location.pathname.split("/")[3] || "single";
    const finalScore = parseInt(queryParams.get("score") || "0", 10);

    setScore(finalScore);
    setTopic(topicParam);
    setMode(modeParam);

    const topicQuestions = {
      science: 3,
      history: 3,
      math: 3,
      literature: 3,
      geography: 3,
      sports: 3,
      technology: 3,
      art: 3,
    };

    const topicKey = topicParam.toLowerCase();
    const total = topicQuestions[topicKey];

    if (total === undefined) {
      setTotalQuestions(3);
    } else {
      setTotalQuestions(total);
    }

    if (modeParam === "multi") {
      const player1 = parseInt(queryParams.get("player1Score") || "0", 10);
      const player2 = parseInt(queryParams.get("player2Score") || "0", 10);
      setPlayer1Score(player1);
      setPlayer2Score(player2);
      setIsMultiplayer(true);
    }
  }, [location]);

  // Speech Accessibility
  const handleSpeech = () => {
    const speechText = isMultiplayer
      ? `Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}. Player 1 scored ${player1Score} out of ${totalQuestions}. Player 2 scored ${player2Score} out of ${totalQuestions}. ${player1Score > player2Score ? "Player 1 wins!" : player2Score > player1Score ? "Player 2 wins!" : "It's a tie!"}`
      : `Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}. You scored ${score} out of ${totalQuestions}.`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    speechSynthesis.speak(utterance);
  };

  const handlePlayAgain = () => {
    navigate(`/quiz/${topic}/${mode}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="result-container">
      <h2 className="result-title">Quiz Completed</h2>
      <div className="result-box">
        <h3 className="result-subtitle">
          Topic: {topic.charAt(0).toUpperCase() + topic.slice(1)}
        </h3>
        <p className="result-score">Total Questions: {totalQuestions}</p>

        {isMultiplayer ? (
          <div className="result-player-scores">
            <p className="result-player-score">
              Player 1 Score: {player1Score} / {totalQuestions}
            </p>
            <p className="result-player-score">
              Player 2 Score: {player2Score} / {totalQuestions}
            </p>
            <p className={`result-winner ${player1Score === player2Score ? "tie" : ""}`}>
              {player1Score > player2Score
                ? "Player 1 Wins!"
                : player2Score > player1Score
                ? "Player 2 Wins!"
                : "It's a Tie!"}
            </p>
          </div>
        ) : (
          <p className="result-player-score">
            Your Score: {score} / {totalQuestions}
          </p>
        )}

        <p className="result-mode">
          Mode: {mode === "single" ? "Single Player" : "Multiplayer"}
        </p>

        <div className="result-actions">
          <button className="play-again" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="home" onClick={handleGoHome}>
            Go Home
          </button>
          <button className="leaderboard" onClick={handleViewLeaderboard}>
            Leaderboard
          </button>
        </div>

        <div className="speech-button-floating">
          <button
            className="speech-button"
            onClick={handleSpeech}
            aria-label="Read result aloud"
            tabIndex="0"
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
