import React from "react";
import Card from '../components/Card';
import { Link } from "react-router-dom";

const AdminDashboard = ({ state }) => {
  return (
    <div>
      <div className="hero">
        <div>
          <h2>Admin Console</h2>
          <p className="small-muted">Manage questions, create exams, and review student performance.</p>
        </div>
        <div>
          <Link to="/admin/create-exam" className="btn" style={{textDecoration:"none"}}>Create Exam</Link>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
        <Card title="Question Bank">
          <div className="small-muted">Total questions: {state.questions.length || 0}</div>
          <Link to="/admin/questions" className="btn" style={{marginTop:8,textDecoration:"none"}}>Open Question Bank</Link>
        </Card>
        <Card title="Exams">
          <div className="small-muted">Total exams: {state.exams.length}</div>
          <Link to="/admin/create-exam" className="btn" style={{marginTop:8,textDecoration:"none"}}>Create / Manage</Link>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
