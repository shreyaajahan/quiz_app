import { useState } from "react";

function Quiz() {
  const questions = [
  {
    question: "What is React?",
    options: ["Database", "JavaScript Library", "Operating System", "API"],
    correctAnswer: "JavaScript Library",
  },
  {
    question: "Which hook is used for state in React?",
    options: ["useState", "useFetch", "useNode", "useAPI"],
    correctAnswer: "useState",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "Java Syntax XML",
      "JavaScript XML",
      "JSON XML",
      "Java Extend",
    ],
    correctAnswer: "JavaScript XML",
  },
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
  setSelectedAnswers({
    ...selectedAnswers,
    [currentQuestion]: option,
  });
};

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
  let finalScore = 0;

  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      finalScore++;
    }
  });

  setScore(finalScore);
  alert(`Your Final Score: ${finalScore} / ${questions.length}`);
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
                selectedAnswers[currentQuestion] === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

       

        <div className="quiz-nav">
          <button className="btn" onClick={handlePrevious}>
            Previous
          </button>

          <button className="btn" onClick={handleNext}>
            Next
          </button>

         <button className="btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;