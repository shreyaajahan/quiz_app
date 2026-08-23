import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSignup = async () => {
  if (!name || !email || !password || !confirmPassword) {
    setToast({ type: "error", message: "Please fill all fields" });
    return;
  }

  if (password !== confirmPassword) {
    setToast({ type: "error", message: "Passwords do not match" });
    return;
  }

  try {
  const response = await api.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  setToast({ type: "success", message: response.data.message });

  console.log(response.data);
} catch (error) {
  setToast({
    type: "error",
    message: error.response?.data?.message || "Unable to sign up right now",
  });
}
};

  return (
    <div className="container signup-container">
      {toast ? (
        <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      ) : null}
      <div className="card signup-card">
        <p className="signup-badge">Quiz App</p>
        <h1>Create Account</h1>
        <p className="signup-subtitle">Join the quiz app and start tracking your progress.</p>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn signup-btn" onClick={handleSignup}>
          Signup
        </button>


        <p className="link-text signup-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;