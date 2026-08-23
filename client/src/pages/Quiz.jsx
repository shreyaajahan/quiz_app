import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toast || toast.type === "confirm") {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
  fetchQuestions();
}, []);
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        executeSubmit();
        return 0;
      }

      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);
const fetchQuestions = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/api/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setQuestions(response.data.questions);
    setLoading(false);

    console.log(response.data.questions);
  } catch (error) {
    console.log(error);
    setLoading(false);
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
 

  const executeSubmit = async () => {
    console.log("Submit clicked");

  
    // if (submitted) return;

setSubmitted(true);
  let finalScore = 0;

  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      finalScore++;
    }
  });

  setScore(finalScore);
  try {
  const token = localStorage.getItem("token");

  await api.post(
    "/api/results",
    {
      score: finalScore,
      totalQuestions: questions.length,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
} catch (error) {
  console.log(error);
}
  navigate("/result", {
  state: {
    score: finalScore,
    total: questions.length,
  },
});
};

  const handleSubmit = () => {
    setToast({
      type: "confirm",
      message: "Are you sure you want to submit the quiz?",
    });
  };

  const handleConfirmSubmit = () => {
    setToast(null);
    executeSubmit();
  };

  const handleCancelSubmit = () => {
    setToast(null);
  };
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

if (loading) {
  return <h2 className="quiz-state">Loading Questions...</h2>;
}

if (questions.length === 0) {
  return <h2 className="quiz-state">No Questions Available</h2>;
}

  return (
    <div className="container quiz-container">
      {toast ? (
        <div className={`toast quiz-toast toast-${toast.type}`} role="status" aria-live="polite">
          <div className="quiz-toast-message">{toast.message}</div>
          {toast.type === "confirm" ? (
            <div className="quiz-toast-actions">
              <button className="quiz-toast-btn quiz-toast-btn-cancel" onClick={handleCancelSubmit}>
                No
              </button>
              <button className="quiz-toast-btn quiz-toast-btn-confirm" onClick={handleConfirmSubmit}>
                Yes
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="card quiz-card">
        <div className="quiz-topbar">
          <button className="quiz-dashboard-btn" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>

        <div className="quiz-header">
          <div>
            <p className="quiz-kicker">Live assessment</p>
            <h2 className="quiz-title">Answer carefully and keep moving</h2>
          </div>

          <div className="quiz-timer">
            <span className="quiz-timer-label">Time left</span>
            <span className="timer">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="quiz-progress-wrap">
          <div className="quiz-progress-text">
            <span>Question {currentQuestion + 1}</span>
            <span>{questions.length} total</span>
          </div>
          <div className="quiz-progress-bar" aria-hidden="true">
            <span
              className="quiz-progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <p className="question-text quiz-question-text">
          {questions[currentQuestion].question}
        </p>

        <div className="options quiz-options">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              className={`option-btn quiz-option-btn ${
                selectedAnswers[currentQuestion] === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

       

        <div className="quiz-nav">
          <button className="btn quiz-nav-btn quiz-secondary-btn" onClick={handlePrevious}>
            Previous
          </button>

          <button
            className="btn quiz-nav-btn quiz-primary-btn"
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
          >
            Next
          </button>

         <button className="btn quiz-nav-btn quiz-submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;