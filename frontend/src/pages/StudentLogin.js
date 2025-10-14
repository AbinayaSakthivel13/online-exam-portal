import React, { useState } from "react";
import { login, registerUser } from "../services/api"; // make sure api.js has these functions
import { useNavigate } from "react-router-dom";

function StudentLogin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      const res = await login("student", { username, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser && setUser(res.user);
        alert("Login successful!");
        navigate("/student/dashboard"); // redirect after login
      } else {
        alert(res.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again.");
    }
  };

  const handleRegister = async () => {
    if (!username || !password) return alert("Enter username and password");

    try {
      const res = await registerUser(username, password);
      if (res.user) {
        alert("Registration successful! Please login now.");
        setIsRegister(false);
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isRegister ? "Student Registration" : "Student Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>
      {!isRegister ? (
        <>
          <button className="btn" onClick={handleLogin}>Login</button><br/><br/>
          <span
            onClick={() => setIsRegister(true)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            New user? Register here
          </span>
        </>
      ) : (
        <>
          <button className="btn" onClick={handleRegister}>Register</button><br/><br/>
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
