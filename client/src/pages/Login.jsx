import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

 const handleLogin = async () => {
  if (!email || !password) {
  setToast({ type: "error", message: "Please fill all fields" });
  return;
}

try {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      email,
      password,
    }
  );

  // Store token
  localStorage.setItem("token", response.data.token);

  // Store user
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  setToast({ type: "success", message: response.data.message });

  console.log(response.data);

  setTimeout(() => navigate("/dashboard"), 900);
} catch (error) {
  setToast({ type: "error", message: error.response.data.message });
}
};

  return (
    <div className="container login-container">
      {toast ? (
        <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      ) : null}
      <div className="card login-card">
        <p className="login-badge">Quiz App</p>
        <h1>Login</h1>
        <p className="login-subtitle">Enter your details to continue to your dashboard.</p>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn login-btn" onClick={handleLogin}>Login</button>
  

        <p className="link-text login-link-text">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;