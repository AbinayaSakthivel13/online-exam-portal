import React, { useEffect, useState } from "react";

const Timer = ({ minutes, onExpire, ticking = true }) => {
  const [secs, setSecs] = useState(minutes * 60);

  // Reset timer if minutes prop changes
  useEffect(() => {
    setSecs(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (!ticking) return;

    const id = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          clearInterval(id);
          if (onExpire) onExpire();
          return 0; // ✅ Prevent negative countdown
        }
        return Math.max(s - 1, 0); // ✅ Ensures value never drops below 0
      });
    }, 1000);

    return () => clearInterval(id);
  }, [ticking, onExpire]);

  const mm = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");

  return (
    <div className="timer" style={{ fontWeight: 600, fontSize: "1.2rem" }}>
      {mm}:{ss}
    </div>
  );
};

export default Timer;
