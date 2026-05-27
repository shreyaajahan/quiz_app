import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!email || !password) {
  alert("Please fill all fields");
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

  alert(response.data.message);

  console.log(response.data);

  navigate("/dashboard");
} catch (error) {
  alert(error.response.data.message);
}
};

  return (
    <div className="container">
      <div className="card">
        <h1>Quiz App Login</h1>

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

        <button className="btn" onClick={handleLogin}>Login</button>
  

        <p className="link-text">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;