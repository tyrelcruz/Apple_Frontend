import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AppleLogo from "../assets/logos/applelogo.svg";
import "../styles/DashLayout.css";

const getPageTitle = (pathname) => {
  if (pathname === "/dashboard" || pathname === "/dashboard/")
    return "Dashboard";
  if (pathname.startsWith("/dashboard/users")) return "Users";
  if (pathname.startsWith("/dashboard/articles")) return "Articles";
  if (pathname.startsWith("/dashboard/reports")) return "Reports";
  return "Dashboard";
};

const DashLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`dash-layout ${sidebarVisible ? "sidebar-visible" : ""}`}>
      <div className="app-bar" style={{ position: "relative" }}>
        <div
          className="app-bar-left"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button onClick={toggleSidebar} className="menu-button">
            <span className="menu-icon">&#9776;</span>
          </button>
          <h1
            className="app-title"
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: "#222",
              letterSpacing: 1,
              marginLeft: 16,
            }}
          >
            {pageTitle}
          </h1>
        </div>
        <div
          className="app-bar-center"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img
            src={AppleLogo}
            alt="Apple Logo"
            style={{ width: 36, height: 36, display: "block" }}
          />
        </div>
        <div className="app-bar-right">
          <div className="profile-icon">👤</div>
        </div>
      </div>

      {/* Sidebar (Drawer) */}
      <div
        className={`sidebar ${sidebarVisible ? "sidebar-show" : "sidebar-hide"}`}
      >
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active-link" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active-link" : ""}`
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/articles"
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active-link" : ""}`
              }
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active-link" : ""}`
              }
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ paddingTop: 72 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;
