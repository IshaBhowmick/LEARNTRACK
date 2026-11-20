if (localStorage.getItem("lt_role") !== "admin") {
  location.href = "index.html";
}
function logout() {
  localStorage.removeItem("lt_role");
  location.href = "index.html";
}
let students = JSON.parse(localStorage.getItem("lt_students") || "[]"),
  courses = JSON.parse(localStorage.getItem("lt_courses") || "null") || [
    {
      id: "html",
      title: "HTML Fundamentals",
      category: "Web Development",
      desc: "Learn the structure of web pages.",
      image: "🌐",
    },
    {
      id: "css",
      title: "CSS Web Designing",
      category: "Web Development",
      desc: "Style websites with CSS.",
      image: "🎨",
    },
    {
      id: "js",
      title: "JavaScript Programming",
      category: "Programming",
      desc: "Add interaction to websites.",
      image: "⚡",
    },
    {
      id: "python",
      title: "Python Programming",
      category: "Programming",
      desc: "Learn Python basics and logic.",
      image: "🐍",
    },
    {
      id: "java",
      title: "Java Programming",
      category: "Programming",
      desc: "Understand object-oriented Java.",
      image: "☕",
    },
    {
      id: "dbms",
      title: "Database Management System",
      category: "Database",
      desc: "Understand databases and SQL.",
      image: "🗄️",
    },
  ];
localStorage.setItem("lt_courses", JSON.stringify(courses));
function allQuizCount() {
  let n = 0;
  students.forEach(
    (s) =>
      (n += JSON.parse(
        localStorage.getItem("lt_quizzes_" + s.id) || "[]",
      ).length),
  );
  return n;
}
function drawAdmin() {
  document.getElementById("adminStudents").innerText = students.length;
  document.getElementById("adminCourses").innerText = courses.length;
  document.getElementById("adminQuizzes").innerText = allQuizCount();
  document.getElementById("studentTable").innerHTML = students.length
    ? "<table><tr><th>Name</th><th>Email</th><th>Quiz attempts</th><th>Course progress</th></tr>" +
      students
        .map((s) => {
          let h = JSON.parse(
              localStorage.getItem("lt_quizzes_" + s.id) || "[]",
            ),
            p = JSON.parse(localStorage.getItem("lt_progress_" + s.id) || "{}");
          return (
            "<tr><td>" +
            s.name +
            "</td><td>" +
            s.email +
            "</td><td>" +
            h.length +
            "</td><td>" +
            Object.values(p).filter((v) => v >= 100).length +
            " completed</td></tr>"
          );
        })
        .join("") +
      "</table>"
    : '<p class="muted">No students registered yet.</p>';
  document.getElementById("adminCourseList").innerHTML =
    "<table><tr><th>Course</th><th>Category</th><th>Action</th></tr>" +
    courses
      .map(
        (c) =>
          "<tr><td>" +
          c.title +
          "</td><td>" +
          c.category +
          '</td><td><button class="btn light small" onclick="editCourse(\'' +
          c.id +
          '\')">Edit</button> <button class="btn small" onclick="deleteCourse(\'' +
          c.id +
          "')\">Delete</button></td></tr>",
      )
      .join("") +
    "</table>";
  let msgs = JSON.parse(localStorage.getItem("lt_messages") || "[]");
  document.getElementById("messageList").innerHTML = msgs.length
    ? "<table><tr><th>Name</th><th>Email</th><th>Subject / Message</th><th>Date</th></tr>" +
      msgs
        .map(
          (m) =>
            "<tr><td>" +
            m.name +
            "</td><td>" +
            m.email +
            "</td><td><b>" +
            m.subject +
            "</b><br>" +
            m.message +
            "</td><td>" +
            m.date +
            "</td></tr>",
        )
        .join("") +
      "</table>"
    : '<p class="muted">No messages received.</p>';
}
document.getElementById("courseForm").onsubmit = function (e) {
  e.preventDefault();
  courses.push({
    id: "course" + Date.now(),
    title: document.getElementById("newTitle").value,
    category: document.getElementById("newCategory").value,
    desc: document.getElementById("newDesc").value,
    image: "📘",
  });
  saveCourses();
  this.reset();
  drawAdmin();
};
window.deleteCourse = function (id) {
  if (confirm("Delete this course?")) {
    courses = courses.filter((c) => c.id !== id);
    saveCourses();
    drawAdmin();
  }
};
window.editCourse = function (id) {
  let c = courses.find((x) => x.id === id),
    title = prompt("Update course title:", c.title);
  if (title) {
    c.title = title;
    let desc = prompt("Update course description:", c.desc);
    if (desc !== null) c.desc = desc;
    saveCourses();
    drawAdmin();
  }
};
function saveCourses() {
  localStorage.setItem("lt_courses", JSON.stringify(courses));
}
drawAdmin();
