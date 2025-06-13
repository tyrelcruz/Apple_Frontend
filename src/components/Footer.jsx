import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-shop">
          More ways to shop:{" "}
          <Link to="/retail-locations">Find an Apple Store</Link> or{" "}
          <Link to="/retailers">other retailer</Link> near you. Or call
          1-800-MY-APPLE.
        </div>

        <div className="footer-legal">
          <div className="footer-copyright">
            Copyright © {new Date().getFullYear()} Apple Inc. All rights
            reserved.
          </div>

          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms">Terms of Use</Link>
            <span> | </span>
            <Link to="/sales">Sales and Refunds</Link>
            <span> | </span>
            <Link to="/legal">Legal</Link>
            <span> | </span>
            <Link to="/sitemap">Site Map</Link>
          </div>

          <div className="footer-location">United States</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
