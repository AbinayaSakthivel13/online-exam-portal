import React from "react";
import Card from "../components/Card";

const QuestionBank = ({ state }) => {
  return (
    <div>
      <h2>Question Bank</h2>
      <div className="grid">
        {state.questions.map(q => (
          <Card key={q.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700}}>{q.subject}</div>
                <div className="small-muted">{q.text}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="badge">{q.marks} pts</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
