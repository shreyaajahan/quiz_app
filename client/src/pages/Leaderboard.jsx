import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/results/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data.results);
      console.log(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="leaderboard-state">Loading Leaderboard...</h2>;
  }

  if (results.length === 0) {
    return <h2 className="leaderboard-state">No Results Found</h2>;
  }

  return (
    <div className="container leaderboard-container">
      <div className="card leaderboard-card">
        <div className="leaderboard-topbar">
          <button
            className="leaderboard-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div className="leaderboard-heading">
          <p className="leaderboard-kicker">Top performers</p>
          <h1>🏆 Leaderboard</h1>
          <p className="leaderboard-subtitle">
            See who is leading the quiz challenge right now.
          </p>
        </div>

        <div className="leaderboard-list">
          {results.map((result, index) => (
            <div key={result._id} className="leaderboard-item">
              <div className="leaderboard-rank">
                <span className="leaderboard-rank-label">Rank</span>
                <h3>#{index + 1}</h3>
              </div>

              <div className="leaderboard-meta">
                <p>
                  <strong>Name:</strong> {result.user?.name}
                </p>

                <p>
                  <strong>Score:</strong> {result.highestScore}/
                  {result.totalQuestions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;