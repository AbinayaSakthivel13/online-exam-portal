import React, { useState } from "react";
import { login, registerUser } from "../services/api"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

function StudentLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");

    try {
      const res = await login("student", { email, password });
      if (res.token && res.student) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.student));
        setUser && setUser(res.student);
        alert("Login successful!");
        navigate("/student/dashboard");
      } else {
        alert(res.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Try again.");
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !department) {
      return alert("Enter all required fields");
    }

    try {
      const res = await registerUser(name, email, password, department);
      if (res.token && res.student) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.student));
        setUser && setUser(res.student);
        alert("Registration successful!");
        navigate("/student/dashboard");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isRegister ? "Student Registration" : "Student Login"}</h2>

      {isRegister && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br /><br />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          /><br /><br />
        </>
      )}

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      {!isRegister ? (
        <>
          <button className="btn" onClick={handleLogin}>Login</button><br /><br />
          <span
            onClick={() => setIsRegister(true)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            New user? Register here
          </span>
        </>
      ) : (
        <>
          <button className="btn" onClick={handleRegister}>Register</button><br /><br />
          <span
            onClick={() => setIsRegister(false)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Already have an account? Login
          </span>
        </>
      )}
    </div>
  );
}

export default StudentLogin;
