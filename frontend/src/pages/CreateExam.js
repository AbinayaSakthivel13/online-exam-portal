import React, { useState } from "react";

const CreateExam = ({ state, setState }) => {
  const [name,setName]=useState("");
  const [duration,setDuration]=useState(10);
  const [selected,setSelected]=useState([]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);
  };

  const create = () => {
    if (!name || selected.length===0) { alert("Provide name & select questions"); return; }
    const total = selected.reduce((s,id)=> s + (state.questions.find(q=>q.id===id)?.marks || 0), 0);
    const exam = { id:`e_${Date.now()}`, name, date:new Date().toISOString(), durationMin:+duration, totalMarks:total, questionIds:selected, thumbnail: "/assets/exam-default.png", description: "Custom exam" };
    const ns = { ...state, exams: [...state.exams, exam] };
    setState(ns);
    alert("Exam created");
  };
  const ns = JSON.parse(JSON.stringify(state));
ns.exams.push(exam);
setState(ns);

  return (
    <div>
      <h2>Create Exam</h2>
      <div className="card" style={{maxWidth:720}}>
        <div className="form-row">
          <input className="input" placeholder="Exam name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Duration (min)" type="number" value={duration} onChange={e=>setDuration(e.target.value)} />
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:700}}>Select Questions</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginTop:8}}>
            {state.questions.map(q => (
              <div key={q.id} onClick={()=>toggle(q.id)} style={{padding:12,borderRadius:8,background: selected.includes(q.id) ? "linear-gradient(90deg,var(--accent1),var(--accent2))" : "rgba(255,255,255,0.02)", cursor:"pointer"}}>
                <div style={{fontWeight:700}}>{q.subject}</div>
                <div className="small-muted">{q.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}>
          <button className="btn" onClick={create}>Create Exam</button>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
