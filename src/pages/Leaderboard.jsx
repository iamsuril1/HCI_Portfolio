import React, { useEffect, useState } from "react";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate a data fetch for leaderboard (replace with API call in production)
    setTimeout(() => {
      setLeaderboard([
        { rank: 1, name: "John Doe", score: 120 },
        { rank: 2, name: "Jane Smith", score: 115 },
        { rank: 3, name: "Alice Johnson", score: 110 },
        { rank: 4, name: "Bob Brown", score: 105 },
        { rank: 5, name: "Charlie Davis", score: 100 },
      ]);
      setLoading(false);
    }, 1500); // Simulating a 1.5s data load
  }, []);

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

  return (
    <div className={`leaderboard-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h2 className="leaderboard-title">Leaderboard</h2>

      {loading ? (
        <p className="loading">Loading leaderboard...</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player) => (
              <tr
                key={player.rank}
                className={
                  player.rank === 1
                    ? "rank-1"
                    : player.rank === 2
                    ? "rank-2"
                    : player.rank === 3
                    ? "rank-3"
                    : ""
                }
              >
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default Leaderboard;
