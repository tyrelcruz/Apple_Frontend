import React from "react";
import { Link, useLocation } from "react-router-dom";
import appleVideo from "../assets/videos/macVID.mp4";
import "../styles/HomePage.css";
import Footer from "../components/Footer";

const HomePage = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest";

  return (
    <main className="welcome-main">
      <video autoPlay loop muted className="background-video">
        <source src={appleVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Apple, {username}</h1>
        <p className="welcome-subtitle">
          Your Apple ID is the key to everything Apple.
        </p>
        <Link to="/dashboard" className="get-started-button">
          Get Started
        </Link>
      </div>

      <Footer />
    </main>
  );
};

export default HomePage;
