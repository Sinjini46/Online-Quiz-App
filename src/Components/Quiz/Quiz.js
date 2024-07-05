import React, { useState, useCallback } from "react";
import "./Quiz.css";
import { data as initialData } from "../../assets/data"; // Adjust path as per your project structure

const Quiz = () => {
  const [data, setData] = useState(initialData);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false); // State to track if an answer has been selected
  const [score, setScore] = useState(0); // State to track the score
  const [endQuiz, setEndQuiz] = useState(false); // State to track end of quiz
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
  const [correctOption, setCorrectOption] = useState(null); // State to track correct option
  const [quizStarted, setQuizStarted] = useState(false); // State to track if quiz has started

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to shuffle data and reset quiz state
  const shuffleData = useCallback(() => {
    const shuffledData = shuffleArray([...initialData]);
    setData(shuffledData);
  }, []);

  const currentQuestion = data[index]; // Current question object

  // Handle selection of an option
  const checkAns = (option) => {
    if (answered) return; // Exit if already answered

    setAnswered(true); // Mark question as answered
    setSelectedOption(option); // Set selected option
    setCorrectOption(currentQuestion.answer); // Set correct option

    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle moving to the next question
  const handleNext = () => {
    if (!answered) return; // Exit if answer not yet selected

    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setAnswered(false);
      setSelectedOption(null);
      setCorrectOption(null);
    } else {
      setEndQuiz(true);
    }
  };

  // Reset quiz and play again
  const playAgain = () => {
    shuffleData(); // Shuffle data for a new game
    setIndex(0);
    setAnswered(false);
    setScore(0);
    setEndQuiz(false);
    setSelectedOption(null);
    setCorrectOption(null);
  };

  // Start quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="container">
      {!quizStarted ? (
        <div className="start-screen">
          <h1>Quiz App</h1>
          <hr />
          <button onClick={startQuiz} id="start">Start Quiz</button>
        </div>
      ) : (
        <>
          {data.length > 0 && !endQuiz ? (
            <>
              <h1>Quiz App</h1>
              <hr />
              <h2>
                {index + 1}.{currentQuestion.question}
              </h2>
              <ul>
                {currentQuestion.options.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => checkAns(option)}
                    className={`${
                      answered
                        ? option === selectedOption
                          ? option === correctOption
                            ? "correct"
                            : "wrong"
                          : option === correctOption
                          ? "correct"
                          : ""
                        : ""
                    }`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <button onClick={handleNext} disabled={!answered}>
                Next
              </button>
              <div className="index">
                {index + 1} of {data.length} Questions
              </div>
            </>
          ) : (
            <div className="cont">
              <h1>Quiz App</h1>
              <hr />
              <h2 id="completed">Quiz Completed!</h2>
              <p>Your Score: {score} / {data.length}</p>
              <button onClick={playAgain} id="again">Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
