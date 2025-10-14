const BASE_URL = "http://localhost:5000/api";

export async function login(role, credentials) {
  const endpoint = role === "admin" ? "auth/admin/login" : "auth/student/login";
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function registerUser(name, email, password, department="") {
  const res = await fetch(`${BASE_URL}/auth/student/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, department }),
  });
  return res.json();
}

export async function fetchExams() {
  const res = await fetch(`${BASE_URL}/exams`);
  return res.json();
}

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/questions`);
  return res.json();
}

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

export async function fetchResults(token) {
  const res = await fetch(`${BASE_URL}/results`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}
