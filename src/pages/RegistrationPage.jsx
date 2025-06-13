import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/RegistrationPage.css";
import appleIdImage from "../assets/logos/appleID.png";
import { createUser } from "../services/UserService";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await createUser(userData);
      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <img src={appleIdImage} alt="Apple Logo" className="apple-logo" />
          <h2 className="login-title">Create Apple ID</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleRegister} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  className="input-field"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  className="input-field"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3 className="section-title">Account Details</h3>
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3 className="section-title">Additional Information</h3>
              <div className="form-row">
                <input
                  type="number"
                  name="age"
                  className="input-field"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <select
                  name="gender"
                  className="input-field"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <input
                type="tel"
                name="contactNumber"
                className="input-field"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                className="input-field"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="keep-signed-in">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="submit-button">
              Create Apple ID
            </button>
          </form>

          <div className="login-footer">
            <p>
              Already have an account?{" "}
              <a href="/login" className="login-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegistrationPage;
