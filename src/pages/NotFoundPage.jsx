import React from "react";
import { Link } from "react-router-dom";
import cautionIcon from "../assets/logos/caution.png"; // path is correct since NotFoundPage is still in pages/
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={cautionIcon} alt="Caution" className="not-found-image" />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          The page you're looking for can't be found. <br />
          The link may be broken or the page may have been removed.
        </p>
        <div className="button-container">
          <Link to="/" className="not-found-button">
            Return to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="not-found-button secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
