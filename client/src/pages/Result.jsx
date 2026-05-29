import { useLocation, Link, Navigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  if (!location.state) {
  return <Navigate to="/dashboard" />;
}

  const { score, total } = location.state;

  const percentage = ((score / total) * 100).toFixed(0);

  return (
    <div className="container result-container">
      <div className="card result-card">
        <p className="result-badge">Assessment complete</p>
        <h1>Quiz Result</h1>
        <p className="result-subtitle">Your performance summary is ready.</p>

        <div className="result-score-box">
          <span className="result-score-label">Your Score</span>
          <h2>
            {score} / {total}
          </h2>
        </div>

        <div className="result-percentage">
          <span>Percentage</span>
          <strong>{percentage}%</strong>
        </div>

        <Link to="/dashboard" className="result-link">
          <button className="btn result-btn">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;