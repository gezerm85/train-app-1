import React from "react";
import "./ForgotPassword.css"; 
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">RailWave</div>
        <div className="navbar-links">
          {/* Sadece "Sign In" linki */}
          <Link to="/">Sign In</Link>
        </div>
      </nav>

      {/* Forgot Password Container */}
      <div className="forgot-container">
        <div className="forgot-box">
          <h2>Forgot Password</h2>
          <p>Please enter your registered email address</p>
          <form>
            <input type="email" placeholder="Email" required />
            <button type="submit">Reset Password</button>
          </form>
          <Link to="/">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
