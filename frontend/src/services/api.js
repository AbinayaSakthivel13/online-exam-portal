const BASE_URL = "http://localhost:5000/api";

// Login for admin or student
export async function login(role, credentials) {
  const endpoint = role === "admin" ? "auth/admin/login" : "auth/student/login";
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

// Register student with only username and password
export async function registerUser(username, password) {
  const res = await fetch(`${BASE_URL}/auth/student/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

// Fetch exams
export async function fetchExams() {
  const res = await fetch(`${BASE_URL}/exams`);
  return res.json();
}

// Fetch questions
export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/questions`);
  return res.json();
}

// Submit exam answers
export async function submitExam(studentId, examId, answers, token) {
  const res = await fetch(`${BASE_URL}/responses`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ student_id: studentId, exam_id: examId, answers }),
  });
  return res.json();
}

// Fetch results
export async function fetchResults(token) {
  const res = await fetch(`${BASE_URL}/results`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}
