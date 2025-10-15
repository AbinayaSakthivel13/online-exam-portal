import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInterface from "./pages/ExamInterface";
import ResultPage from "./pages/ResultPage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import QuestionBank from "./pages/QuestionBank";
import CreateExam from "./pages/CreateExam";
import ViewResults from "./pages/ViewResults";

import { fetchExams, fetchQuestions, fetchResults } from "./services/api";

const App = () => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const [state, setState] = useState({
    exams: [],
    questions: [],
    results: [],
  });

  // Fetch backend data on login
  useEffect(() => {
    const loadData = async () => {
      try {
        const [exams, questions] = await Promise.all([fetchExams(), fetchQuestions()]);
        setState(prev => ({ ...prev, exams, questions }));

        if (user?.role === "admin") {
          const results = await fetchResults(localStorage.getItem("token"));
          setState(prev => ({ ...prev, results }));
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    if (user) loadData();
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div className="app">
      <Header user={user} logout={logout} />
      <div className="container">
        <Sidebar user={user} />
        <main className="main-panel">
          <Routes>
            <Route path="/" element={<Navigate to="/student/login" replace />} />

            {/* Student Routes */}
            <Route
              path="/student/login"
              element={<StudentLogin setUser={setUser} />}
            />
            <Route
              path="/student/dashboard"
              element={
                <Protected user={user} role="student">
                  <StudentDashboard state={state} user={user} />
                </Protected>
              }
            />
            <Route
              path="/student/exam/:examId"
              element={
                <Protected user={user} role="student">
                  <ExamInterface state={state} setState={setState} user={user} />
                </Protected>
              }
            />
            <Route
              path="/student/result/:resultId"
              element={
                <Protected user={user} role="student">
                  <ResultPage state={state} />
                </Protected>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" 
              element={<AdminLogin login={(role, creds) => login(role, creds)} />} />
            <Route
              path="/admin/dashboard"
              element={
                <Protected user={user} role="admin">
                  <AdminDashboard state={state} setState={setState} />
                </Protected>
              }
            />
            <Route
              path="/admin/questions"
              element={
                <Protected user={user} role="admin">
                  <QuestionBank state={state} setState={setState} />
                </Protected>
              }
            />
            <Route
              path="/admin/create-exam"
              element={
                <Protected user={user} role="admin">
                  <CreateExam state={state} setState={setState} />
                </Protected>
              }
            />
            <Route
              path="/admin/results"
              element={
                <Protected user={user} role="admin">
                  <ViewResults state={state} />
                </Protected>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<div className="card">404 — page not found</div>}
            />
          </Routes>
        </main>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} ExamFlow • UI demo
      </footer>
    </div>
  );
};

// Protected route wrapper
const Protected = ({ user, role, children }) => {
  if (!user) return <Navigate to={`/${role}/login`} replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
};

export default App;
