import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const response = await api.get("/api/results/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Unable to load history right now");
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading History...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (results.length === 0) {
    return <h2>No Quiz Attempts Yet</h2>;
  }

  return (
    <div className="container history-container">
      <div className="card history-card">
        <div className="history-topbar">
          <button
            className="history-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div className="history-heading">
          <p className="history-kicker">Your attempts</p>
          <h1>Quiz History</h1>
          <p className="history-subtitle">
            Review previous scores and track your progress over time.
          </p>
        </div>

        {results.map((result) => (
          <div
            key={result._id}
            className="history-item"
          >
            <div className="history-item-score">
              <span className="history-item-label">Score</span>
              <h3>
                {result.score}/{result.totalQuestions}
              </h3>
            </div>

            <p className="history-item-date">
              Date: {" "}
              {new Date(result.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;