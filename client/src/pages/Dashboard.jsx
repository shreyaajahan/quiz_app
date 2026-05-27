import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  alert("Logout successful");

  navigate("/login");
};
  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Quiz App</h1>
        <p className="link-text">Choose a Quiz Category</p>

        <div className="category-grid">
          <Link to="/quiz"><button className="btn">JavaScript</button></Link>
          <Link to="/quiz"><button className="btn">DBMS</button></Link>
          <Link to="/quiz"><button className="btn">OS</button></Link>
          <Link to="/quiz"><button className="btn">Aptitude</button></Link>
        </div>

        <div className="nav-buttons">
          <Link to="/history"><button className="btn">History</button></Link>
          <Link to="/leaderboard"><button className="btn">Leaderboard</button></Link>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;