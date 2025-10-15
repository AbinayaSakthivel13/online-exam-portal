import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = () => {
    // ✅ Validate inputs before submitting
    if (!email.trim() || !password.trim()) {
      setErr("Please enter both email and password");
      return;
    }

    const ok = login("admin", { email, password });
    if (ok) {
      setErr("");
      nav("/admin/dashboard");
    } else {
      setErr("Invalid admin credentials");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "20px auto" }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Admin Login</h2>
        <p className="small-muted">
          Use <strong>admin@example.com / admin</strong> as demo.
        </p>

        <div className="form-row">
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {err && <div style={{ color: "var(--danger)", marginBottom: 10 }}>{err}</div>}

        <button
          className="btn"
          onClick={submit}
          style={{ cursor: "pointer", width: "100%" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
