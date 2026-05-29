import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToast({ type: "success", message: "Logout successful" });

    setTimeout(() => navigate("/login"), 900);
  };
  return (
    <div className="container dashboard-container">
      {toast ? (
        <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      ) : null}

      <div className="card dashboard-card">
        <p className="dashboard-badge">Quiz Hub</p>
        <h1 className="dashboard-title">Welcome, {user?.name}</h1>
        <p className="dashboard-subtitle">
          Pick up where you left off and keep your streak going.
        </p>

        <div className="dashboard-role-card">
          <span className="dashboard-role-label">Current role</span>
          <span className="dashboard-role-value">{user?.role}</span>
        </div>

        <div className="dashboard-cta">
          <Link to="/quiz" className="btn dashboard-primary-btn">
            Take Quiz
          </Link>
        </div>

        <div className="nav-buttons dashboard-actions">
          <Link to="/history" className="btn dashboard-secondary-btn">
            History
          </Link>
          <Link to="/leaderboard" className="btn dashboard-secondary-btn">
            Leaderboard
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="btn dashboard-secondary-btn">
              ⚙️ Admin Panel
            </Link>
          )}
          <button className="btn dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;