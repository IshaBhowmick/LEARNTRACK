let studentForm = document.getElementById("studentForm"),
  adminForm = document.getElementById("adminForm"),
  registerForm = document.getElementById("registerForm");
function showForm(type) {
  studentForm.classList.toggle("hidden", type !== "student");
  adminForm.classList.toggle("hidden", type !== "admin");
  registerForm.classList.add("hidden");
  document
    .getElementById("studentTab")
    .classList.toggle("active", type === "student");
  document
    .getElementById("adminTab")
    .classList.toggle("active", type === "admin");
}
function showRegister() {
  studentForm.classList.add("hidden");
  adminForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
}
function getStudents() {
  return JSON.parse(localStorage.getItem("lt_students") || "[]");
}
studentForm.onsubmit = function (e) {
  e.preventDefault();
  let user = document.getElementById("studentUser").value.trim().toLowerCase(),
    pass = document.getElementById("studentPass").value,
    students = getStudents(),
    student = students.find(
      (s) => s.email.toLowerCase() === user || s.name.toLowerCase() === user,
    );
  if (student && student.password === pass) {
    localStorage.setItem("lt_current", JSON.stringify(student));
    localStorage.setItem("lt_role", "student");
    if (document.getElementById("remember").checked)
      localStorage.setItem("lt_remember", user);
    location.href = "dashboard.html";
  } else
    document.getElementById("loginMessage").innerHTML =
      '<p class="notice danger">Account not found or password is incorrect. Please register first.</p>';
};
adminForm.onsubmit = function (e) {
  e.preventDefault();
  if (
    document.getElementById("adminUser").value === "admin" &&
    document.getElementById("adminPass").value === "learntrack123"
  ) {
    localStorage.setItem("lt_role", "admin");
    location.href = "admin.html";
  } else
    document.getElementById("loginMessage").innerHTML =
      '<p class="notice danger">Invalid admin credentials.</p>';
};
registerForm.onsubmit = function (e) {
  e.preventDefault();
  let students = getStudents(),
    name = document.getElementById("regName").value.trim(),
    email = document.getElementById("regEmail").value.trim().toLowerCase(),
    password = document.getElementById("regPass").value;
  if (students.some((s) => s.email === email)) {
    alert("This email is already registered.");
    return;
  }
  let student = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    joined: new Date().toLocaleDateString(),
  };
  students.push(student);
  localStorage.setItem("lt_students", JSON.stringify(students));
  localStorage.setItem("lt_current", JSON.stringify(student));
  localStorage.setItem("lt_role", "student");
  location.href = "dashboard.html";
};
