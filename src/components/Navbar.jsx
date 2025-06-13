import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Button from "./Button";
import appleLogo from "../assets/logos/applelogo.svg";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <img src={appleLogo} alt="Logo" className="logo-img" />
        </a>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
