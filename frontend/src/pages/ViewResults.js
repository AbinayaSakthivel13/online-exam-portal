import React from "react";

const ViewResults = ({ state }) => {
  return (
    <div>
      <h2>All Results</h2>
      <div className="grid">
        {state.results.length === 0 && <div className="card">No results yet</div>}
        {state.results.map(r => (
          <div key={r.id} className="card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:800}}>Student: {r.studentId}</div>
                <div className="small-muted">Exam: {r.examId}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800}}>{r.score}</div>
                <div className="small-muted">{new Date(r.date).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewResults;
