import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const response = await api.get("/api/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response.data.questions);

      console.log(response.data.questions);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Unable to load questions right now");
    }
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast]);

  // Add / Update Question
  const handleAddQuestion = async () => {
    if (!question || !options || !correctAnswer) {
      setToast({ type: "error", message: "Please fill all fields" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let response;

      if (editingId) {
        // UPDATE QUESTION
        response = await api.put(
          `/api/questions/${editingId}`,
          {
            question,
            options: options.split(",").map((option) => option.trim()),
            correctAnswer: correctAnswer.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // ADD QUESTION
        response = await api.post(
          "/api/questions",
          {
            question,
            options: options.split(",").map((option) => option.trim()),
            correctAnswer: correctAnswer.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setToast({ type: "success", message: response.data.message });

      console.log(response.data);

      // Refresh Questions
      fetchQuestions();

      // Clear Form
      setQuestion("");
      setOptions("");
      setCorrectAnswer("");

      // Exit Edit Mode
      setEditingId(null);
    } catch (error) {
      setToast({ type: "error", message: error.response?.data?.message || error.message || "Something went wrong" });
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/api/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToast({ type: "success", message: response.data.message });

      // Refresh Questions
      fetchQuestions();
    } catch (error) {
      setToast({ type: "error", message: error.response?.data?.message || error.message || "Something went wrong" });
    }
  };

  // Edit Question
  const handleEditQuestion = (q) => {
    setQuestion(q.question);

    setOptions(q.options.join(","));

    setCorrectAnswer(q.correctAnswer);

    setEditingId(q._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToast({ type: "success", message: "Logout successful" });

    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div className="container admin-container">
      {toast ? (
        <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      ) : null}
      <div className="card admin-card">
        <div className="admin-topbar">
          <Link to="/dashboard" className="btn dashboard-secondary-btn">
            Dashboard
          </Link>
          <button className="btn dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p className="admin-badge">Admin</p>
        <h1 className="admin-title">Admin Panel</h1>

        <div className="admin-form">
          <div className="input-group">
            <label>Question</label>

            <input
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Options (comma separated)</label>

            <input
              type="text"
              placeholder="Option1, Option2, Option3"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Correct Answer</label>

            <input
              type="text"
              placeholder="Enter correct answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>

          <div className="admin-actions">
            <button className="btn dashboard-primary-btn" onClick={handleAddQuestion}>
              {editingId ? "Update Question" : "Add Question"}
            </button>
          </div>
        </div>

        <h2 className="admin-section-title">All Questions</h2>

        {error ? <h3 className="admin-error">{error}</h3> : null}

        <div className="admin-list">
          {questions.map((q) => (
            <div key={q._id} className="admin-question-card">
              <h3 className="admin-question-text">{q.question}</h3>

              <ul className="admin-options">
                {q.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>

              <p className="admin-correct">
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>

              <div className="admin-row">
                <button
                  className="btn admin-btn admin-delete"
                  onClick={() => handleDeleteQuestion(q._id)}
                >
                  Delete
                </button>

                <button
                  className="btn admin-btn admin-edit"
                  onClick={() => handleEditQuestion(q)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;