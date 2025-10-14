import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import axios from "axios";

const ExamInterface = ({ user }) => {
  const { examId } = useParams();
  const nav = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const key = `exam_answers_${examId}_${user?.id}`;

  // Fetch exam & questions
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch exam details
        const examRes = await axios.get(`http://localhost:5000/api/exams/${examId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setExam(examRes.data);

        // Fetch all questions
        const qRes = await axios.get("http://localhost:5000/api/questions", {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        // Filter only exam questions and format options
        const examQuestions = qRes.data
          .filter(q => examRes.data.questionIds?.includes(q.question_id))
          .map(q => ({
            ...q,
            options: {
              A: q.option_a,
              B: q.option_b,
              C: q.option_c,
              D: q.option_d
            },
            answer: q.correct_answer
          }));

        setQuestions(examQuestions);
      } catch (err) {
        console.error("Failed to fetch exam/questions:", err);
      }
    };

    fetchExamData();
  }, [examId]);

  // Load answers from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setAnswers(JSON.parse(raw));
  }, [key]);

  // Save answers to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(answers));
  }, [answers, key]);

  if (!exam) return <div className="card">Loading exam...</div>;

  const selectOption = (qid, opt) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qid]: { selected: opt, time: new Date().toISOString() } }));
  };

  const submitExam = async () => {
    if (submitted) return;
    setSubmitted(true);

    try {
      const token = localStorage.getItem("token");
      const payload = Object.entries(answers).map(([qid, ans]) => ({
        question_id: qid,
        chosen_answer: ans.selected
      }));

      const res = await axios.post(
        "http://localhost:5000/api/responses",
        {
          student_id: user.id,
          exam_id: exam.exam_id,
          answers: payload
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.result) {
        nav(`/student/result/${res.data.result.result_id}`);
      } else {
        alert("Exam submitted successfully!");
        nav("/student/dashboard");
      }
    } catch (err) {
      console.error("Failed to submit exam:", err);
      alert("Submission failed. Please try again.");
      setSubmitted(false);
    }
  };

  const onExpire = () => {
    alert("Time is up — auto-submitting.");
    submitExam();
  };

  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="exam-wrapper">
      {/* Left Panel: Questions */}
      <div className="exam-left card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{exam.exam_name}</div>
            <div className="small-muted">{exam.description || "No description"}</div>
          </div>
          <div>
            <Timer minutes={exam.duration} onExpire={onExpire} ticking={!submitted} />
          </div>
        </div>

        {questions.map((q, idx) => (
          <div key={q.question_id} className="question">
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Q{idx + 1}. {q.question_text}
            </div>
            <div className="options">
              {Object.entries(q.options).map(([k, v]) => {
                const sel = answers[q.question_id]?.selected;
                return (
                  <div
                    key={k}
                    onClick={() => selectOption(q.question_id, k)}
                    className={`option ${sel === k ? "selected" : ""} ${submitted ? "disabled" : ""}`}
                    style={{ pointerEvents: submitted ? "none" : "auto" }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.02)",
                        fontWeight: 700
                      }}
                    >
                      {k}
                    </div>
                    <div>{v}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <button className="btn" onClick={() => { if (window.confirm("Submit exam now?")) submitExam(); }} disabled={submitted}>
            {submitted ? "Submitted" : "Submit Exam"}
          </button>
          <div className="small-muted">Answered: {totalAnswered} / {questions.length}</div>
        </div>
      </div>

      {/* Right Panel: Quick Jump */}
      <aside className="exam-right card">
        <div style={{ fontWeight: 600 }}>Quick Jump</div>
        <div className="quick-jump" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 8 }}>
          {questions.map((q, i) => (
            <div
              key={q.question_id}
              style={{
                padding: 8,
                borderRadius: 8,
                background: answers[q.question_id] ? "linear-gradient(90deg,var(--accent1),var(--accent2))" : "rgba(255,255,255,0.02)",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onClick={() => {
                const el = document.querySelectorAll(".question")[i];
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ExamInterface;
