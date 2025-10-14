import React from "react";

const Card = ({ children, title }) => {
  return (
    <div className="card">
      {title && <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontWeight:700}}>{title}</div>
      </div>}
      {children}
    </div>
  );
};

export default Card;
