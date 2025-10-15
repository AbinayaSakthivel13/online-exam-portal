import React from "react";
import { useParams, Link } from "react-router-dom";

const ResultPage = ({ state }) => {
  const { resultId } = useParams();
  const result = state.results.find(r => r.id === resultId);

  if (!result) {
    return (
      <div className="card">
        Result not found. <Link to="/student/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  const total = result.score || result.marks_obtained;// use score directly
  const max = result.details.reduce((sum, d) => sum + d.marks, 0);
  const percent = Math.round((total / max) * 100);

  return (
    <div>
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Exam Result</div>
          <div className="small-muted">Date: {new Date(result.date).toLocaleString()}</div>
        </div>
        <div className="score">
          <div className="big">{total}/{max}</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>{percent}%</div>
            <div className="small-muted">Performance</div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <h3 style={{ marginTop: 0 }}>Detailed Answers</h3>
          {(result.details || []).map((d, i) => (
            <div
              key={d.qId}
              style={{
                padding: 12,
                borderRadius: 8,
                background: "rgba(255,255,255,0.02)",
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>Q{i + 1}</div>
                <div className="small-muted">
                  Your answer: {d.selected || "No Answer"} • Correct: {d.correct}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{ fontWeight: 800, color: d.correctBool ? "var(--success)" : "var(--danger)" }}
                >
                  {d.correctBool ? `+${d.marks}` : `0`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
