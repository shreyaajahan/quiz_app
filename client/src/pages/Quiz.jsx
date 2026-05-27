import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
  fetchQuestions();
}, []);

const fetchQuestions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setQuestions(response.data.questions);

    console.log(response.data.questions);
  } catch (error) {
    console.log(error);
  }
};

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
  navigate("/result", {
  state: {
    score: finalScore,
    total: questions.length,
  },
});
};
if (questions.length === 0) {
  return <h2>Loading...</h2>;
}

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