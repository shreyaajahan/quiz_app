import { useState } from "react";

function Quiz() {
  const questions = [
    {
      question: "What is React?",
      options: ["Database", "JavaScript Library", "Operating System", "API"],
    },
    {
      question: "Which hook is used for state in React?",
      options: ["useState", "useFetch", "useNode", "useAPI"],
    },
    {
      question: "What does JSX stand for?",
      options: [
        "Java Syntax XML",
        "JavaScript XML",
        "JSON XML",
        "Java Extend",
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption("");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="timer">Time Left: 10:00</h2>

        <h3>
          Question {currentQuestion + 1} / {questions.length}
        </h3>

        <p className="question-text">
          {questions[currentQuestion].question}
        </p>

        <div className="options">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              className={`option-btn ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="link-text">Selected: {selectedOption}</p>

        <div className="quiz-nav">
          <button className="btn" onClick={handlePrevious}>
            Previous
          </button>

          <button className="btn" onClick={handleNext}>
            Next
          </button>

          <button className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;