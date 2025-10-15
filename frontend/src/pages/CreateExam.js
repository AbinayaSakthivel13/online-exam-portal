import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateExam = ({ state, setState, user }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(30); // default 30 min
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();

  // Toggle question selection
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((qId) => qId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const create = async () => {
    if (!name.trim()) {
      alert("Please enter exam name");
      return;
    }
    if (selected.length === 0) {
      alert("Please select at least one question");
      return;
    }

    const totalMarks = selected.reduce((sum, qId) => {
      const question = state.questions.find((q) => q.id === qId || q.question_id === qId);
      return sum + (question?.marks || 0);
    }, 0);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exam_name: name.trim(),
          exam_date: new Date().toISOString().split("T")[0],
          duration: Number(duration),
          total_marks: totalMarks,
          created_by: user?.id,
        }),
      });

      const newExam = await res.json();

      // Add questionIds locally for frontend tracking
      newExam.questionIds = selected;
      newExam.thumbnail = "/assets/exam-default.png";
      newExam.description = "Custom exam created by admin";

      setState({ ...state, exams: [...state.exams, newExam] });
      alert("Exam created successfully!");

      // Reset form
      setName("");
      setDuration(30);
      setSelected([]);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to create exam:", err);
      alert("Error creating exam. Please try again.");
    }
  };

  return (
    <div className="create-exam">
      <h2>Create Exam</h2>
      <div>
        <label>Exam Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min={5}
        />
      </div>

      <div>
        <h3>Select Questions:</h3>
        <div className="grid">
          {state.questions.map((q) => (
            <div
              key={q.id || q.question_id}
              className={`card ${selected.includes(q.id || q.question_id) ? "selected" : ""}`}
              onClick={() => toggleSelect(q.id || q.question_id)}
            >
              <p>{q.text || q.question_text}</p>
              <small>Marks: {q.marks}</small>
            </div>
          ))}
        </div>
      </div>

      <button onClick={create}>Create Exam</button>

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; margin-top: 12px; }
        .card { padding: 12px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .card:hover { box-shadow: 0 0 6px rgba(0,0,0,0.2); }
        .card.selected { border-color: #007bff; background: #e6f0ff; }
        input { margin: 4px 0 12px 0; padding: 6px; width: 100%; max-width: 300px; }
        button { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
      `}</style>
    </div>
  );
};

export default CreateExam;
