import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import appleIdImage from "../assets/logos/appleID.png";
import "../styles/LoginPage.css";
import { loginUser } from "../services/UserService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      // Store token and user details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("type", res.data.type);
      localStorage.setItem("firstName", res.data.firstName);
      localStorage.setItem("userId", res.data.id);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <img src={appleIdImage} alt="Apple Logo" className="apple-logo" />
          <h2 className="login-title">Sign In</h2>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="keep-signed-in">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me signed in</label>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="login-link">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
