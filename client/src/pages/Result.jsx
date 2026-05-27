import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();

  const { score, total } = location.state;

  const percentage = ((score / total) * 100).toFixed(0);

  return (
    <div className="container">
      <div className="card">
        <h1>Quiz Result</h1>

        <h2>
          Your Score: {score} / {total}
        </h2>

        <h3>Percentage: {percentage}%</h3>

        <Link to="/dashboard">
          <button className="btn">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;