import React, { useState } from "react";
import "./Login.css"; // Login.css ile aynı tasarımı alır
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🔸 Frontend validation
    const { firstName, lastName, email, password } = formData;
  
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
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
  
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error("Registration failed");
  
      const message = await response.text();
      console.log("Registration successful:", message);
      alert("Registration successful! You can now log in.");
      navigate("/signin");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration.");
    }
  };
  

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">RailWave</div>
        <div className="navbar-links">
          <Link to="/signin">Sign In</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </nav>

      {/* Form Container */}
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Sign Up</h2>
          <p>Create your account below</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          <p style={{ marginTop: "15px" }}>
            Already have an account?
            <Link to="/signin" style={{ marginLeft: "5px", color: "#2193b0" }}>
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
