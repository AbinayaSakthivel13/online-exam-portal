import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentDashboard = ({ user }) => {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/exams", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setExams(res.data);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      }
    };

    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/results", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const studentResults = res.data.filter(r => r.student_id === user.id);
        setResults(studentResults);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    };

    fetchExams();
    fetchResults();
  }, [user]);

  return (
    <div>
      <div className="hero">
        <div className="hero-left">
          <h2>Welcome back, {user.name}</h2>
          <p className="small-muted">
            Choose an exam and start — your progress and results will be recorded.
          </p>
        </div>
        <div className="hero-right">
          <img src="/assets/hero-exam.jpg" alt="hero" />
        </div>
      </div>

      <h3 style={{ marginTop: 12 }}>Available Exams</h3>
      <div className="grid">
        {exams.map(ex => {
          const pastResult = results
            .filter(r => r.exam_id === ex.exam_id && r.student_id === user.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

          return (
            <Card key={ex.exam_id}>
              <img src={ex.thumbnail || "/assets/exam-default.png"} alt={ex.exam_name} />
              <div className="meta">
                <div>
                  <div style={{ fontWeight: 700 }}>{ex.exam_name}</div>
                  <div className="small-muted">{ex.description || "No description"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="badge">{ex.totalMarks} pts</div>
                  <div className="small-muted" style={{ fontSize: 12, marginTop: 6 }}>
                    {ex.duration} min
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Link
                  to={`/student/exam/${ex.exam_id}`}
                  className="btn"
                  style={{ textDecoration: "none" }}
                >
                  Start Exam
                </Link>
                {pastResult ? (
                  <Link
                    to={`/student/result/${pastResult.result_id}`}
                    className="btn"
                    style={{ background: "linear-gradient(90deg,#1f2937,#3b82f6)", textDecoration: "none" }}
                  >
                    View Past
                  </Link>
                ) : (
                  <div
                    className="btn"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "var(--muted)",
                      cursor: "not-allowed",
                      textAlign: "center",
                      flex: 1
                    }}
                  >
                    No Past Result
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;
