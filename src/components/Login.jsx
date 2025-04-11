import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🔸 Basic frontend validation
    if (!email || !password) {
      setError("Email and password cannot be empty.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
  
    console.log("Sending login request with:", { email, password });
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend response:", errorText);
        throw new Error("Login failed");
      }
  
      const data = await response.json(); // e.g., { token: "...", role: "user" }
      console.log("Login successful:", data);
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
  
      switch (data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
        default:
          navigate("/user");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">RailWave</div>
        <div className="navbar-links">
          <Link to="/register">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </nav>

      <div className="login-wrapper">
        <div className="login-container">
          <h2>Train System</h2>
          <p>Please log in to continue</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>

          <div className="login-links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <p style={{ marginTop: "15px" }}>
            Don't have an account?
            <Link to="/register" style={{ marginLeft: "5px", color: "#2193b0" }}>
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
