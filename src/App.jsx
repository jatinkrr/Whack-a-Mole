import React, { useState, useEffect } from "react";
import "./App.css"; // Inline CSS is imported here

const NUM_HOLES = 6;
const MOLE_APPEAR_TIME = 1000;

export default function App() {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    let moleTimer;
    if (gameRunning) {
      moleTimer = setInterval(() => {
        setMoleIndex(Math.floor(Math.random() * NUM_HOLES));
      }, MOLE_APPEAR_TIME);
    } else {
      clearInterval(moleTimer);
      setMoleIndex(null);
    }
    return () => clearInterval(moleTimer);
  }, [gameRunning]);

  const hitMole = (index) => {
    if (index === moleIndex) {
      setScore(score + 1);
      setMoleIndex(null);
    }
  };

  const startGame = () => {
    setScore(0);
    setGameRunning(true);
  };

  const stopGame = () => {
    setGameRunning(false);
  };

  return (
    <div className="whack-a-mole-container">
      <h1 className="title">🐹 Whack-a-Mole</h1>
      <div className="holes-container">
        {Array.from({ length: NUM_HOLES }).map((_, index) => (
          <div
            key={index}
            onClick={() => hitMole(index)}
            className={`hole ${moleIndex === index ? "active" : ""}`}
          >
            {moleIndex === index ? "🐹" : ""}
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
      {!gameRunning ? (
        <button className="button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <button className="button destructive" onClick={stopGame}>
          Stop Game
        </button>
      )}
    </div>
  );
}

/* Base styles */
