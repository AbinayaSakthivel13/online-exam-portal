import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
  const location = useLocation();

  if (!user) return null; // hide sidebar if not logged in

  const studentLinks = [
    { name: "Dashboard", path: "/student/dashboard" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Question Bank", path: "/admin/questions" },
    { name: "Create Exam", path: "/admin/create-exam" },
    { name: "View Results", path: "/admin/results" },
  ];

  const links = user.role === "student" ? studentLinks : adminLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{fontWeight:700, marginBottom:8}}>Hello, {user.name}</div>
        <div className="small-muted">@{user.username}</div>
      </div>

      <nav className="sidebar-nav">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
