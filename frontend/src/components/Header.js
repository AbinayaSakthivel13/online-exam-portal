import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, logout }) => {
  return (
    <header className="header">
      <div className="brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="brand-logo">EX</div>
        <div>
          <h1 style={{ fontSize: 16, margin: 0 }}>ExamFlow UI</h1>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>
            Online Exam Management — Designer Demo
          </div>
        </div>
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>@{user.username}</div>
            </div>
            <button className="btn" onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/student/login"
              className="btn"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Student Login
            </Link>
            <Link
              to="/admin/login"
              className="btn"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Admin Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
