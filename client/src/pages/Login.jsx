import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }
  console.log("Email:", email);
  console.log("Password:", password);
  alert("Login successful");
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