import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/QuizPlay.css";

const questionsData = [
  // Add your questions (same as you provided earlier)
  { topic: "science", question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], correctAnswer: "H2O" },
  { topic: "science", question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
  { topic: "science", question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], correctAnswer: "Mitochondria" },
  { topic: "history", question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correctAnswer: "George Washington" },
  // ... include all other questions as needed
];

const QuizPlay = () => {
  const { topic, mode } = useParams();
  const navigate = useNavigate();
  const INITIAL_TIMER = 15;
  const LIFELINE_BONUS = 5;

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedPhoneAFriend, setUsedPhoneAFriend] = useState(false);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [highlightCorrect, setHighlightCorrect] = useState(false);

  const correctSound = useMemo(() => new Audio("/sounds/correct.mp3"), []);
  const wrongSound = useMemo(() => new Audio("/sounds/wrong.mp3"), []);
  const timeoutSound = useMemo(() => new Audio("/sounds/timeout.mp3"), []);

  useEffect(() => {
    const filtered = questionsData.filter(q => q.topic.toLowerCase() === topic?.toLowerCase());
    setQuestions(filtered);
  }, [topic]);

  useEffect(() => {
    setTimer(INITIAL_TIMER);
    setAnswered(false);
    setFeedback(null);
    setRemovedOptions([]);
    setHighlightCorrect(false);
  }, [currentIndex, currentPlayer]);

  useEffect(() => {
    if (answered || !questions.length) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleAnswer(null);
          return INITIAL_TIMER;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [answered, currentIndex, currentPlayer, questions]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleAnswer = (answer) => {
    if (answered || !questions[currentIndex]) return;
    setAnswered(true);

    const correct = questions[currentIndex].correctAnswer;
    const isCorrect = answer === correct;

    if (answer === null) timeoutSound.play();
    else if (isCorrect) correctSound.play();
    else wrongSound.play();

    setFeedback(answer === null ? "Time's up!" : isCorrect ? "Correct!" : "Wrong!");

    if (isCorrect) {
      if (mode === "single") {
        setScore(prev => prev + 1);
      } else {
        currentPlayer === 1
          ? setPlayer1Score(prev => prev + 1)
          : setPlayer2Score(prev => prev + 1);
      }
    }

    setTimeout(() => {
      if (mode === "single") {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          navigate(`/result/${topic}/${mode}?score=${score + (isCorrect ? 1 : 0)}`);
        }
      } else {
        if (currentPlayer === 1) {
          setCurrentPlayer(2);
        } else {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setCurrentPlayer(1);
          } else {
            navigate(`/result/${topic}/${mode}?player1Score=${player1Score}&player2Score=${player2Score}`);
          }
        }
      }
    }, 1000);
  };

  const handleFiftyFifty = () => {
    if (usedFiftyFifty || !questions.length) return;
    const options = questions[currentIndex].options;
    const correct = questions[currentIndex].correctAnswer;
    const incorrect = options.filter(opt => opt !== correct);
    setRemovedOptions(incorrect.sort(() => 0.5 - Math.random()).slice(0, 2));
    setUsedFiftyFifty(true);
    setTimer(prev => prev + LIFELINE_BONUS);
  };

  const handlePhoneAFriend = () => {
    if (usedPhoneAFriend || !questions.length) return;
    alert("Your friend suggests: " + questions[currentIndex].correctAnswer);
    setHighlightCorrect(true);
    setUsedPhoneAFriend(true);
    setTimer(prev => prev + LIFELINE_BONUS);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`quiz-container ${isDarkMode ? "dark" : ""}`}>
      <button className="toggle-dark-mode" onClick={toggleTheme}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <h2 className="quiz-title">Quiz on {topic?.charAt(0).toUpperCase() + topic?.slice(1)}</h2>
      <p className="quiz-subtitle">
        {mode === "single" ? "Single Player Mode" : `Multiplayer Mode (Player ${currentPlayer})`}
      </p>

      {questions.length > 0 ? (
        <div className="question-box">
          <p className="timer">Time Left: {timer}s</p>
          <h3 className="question-text">{questions[currentIndex].question}</h3>

          <div className="options">
            {questions[currentIndex].options.map((opt, i) =>
              !removedOptions.includes(opt) && (
                <button
                  key={i}
                  className="answer-button"
                  style={highlightCorrect && opt === questions[currentIndex].correctAnswer
                    ? { backgroundColor: "green" }
                    : {}}
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              )
            )}
          </div>

          {feedback && <p className="feedback">{feedback}</p>}

          <div className="lifelines">
            <button onClick={handleFiftyFifty} disabled={usedFiftyFifty}>50:50</button>
            <button onClick={handlePhoneAFriend} disabled={usedPhoneAFriend}>📞</button>
          </div>
        </div>
      ) : (
        <p>No questions available for topic: <strong>{topic}</strong></p>
      )}
    </div>
  );
};

export default QuizPlay;
