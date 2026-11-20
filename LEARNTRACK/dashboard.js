function requireStudent() {
  if (
    localStorage.getItem("lt_role") !== "student" ||
    !localStorage.getItem("lt_current")
  ) {
    location.href = "index.html";
    return null;
  }
  return JSON.parse(localStorage.getItem("lt_current"));
}
function logout() {
  localStorage.removeItem("lt_role");
  localStorage.removeItem("lt_current");
  location.href = "index.html";
}
let current = requireStudent();
if (current) {
  let progress = JSON.parse(
      localStorage.getItem("lt_progress_" + current.id) || "{}",
    ),
    history = JSON.parse(
      localStorage.getItem("lt_quizzes_" + current.id) || "[]",
    ),
    courses =
      JSON.parse(localStorage.getItem("lt_courses") || "null") ||
      defaultCourses();
  localStorage.setItem("lt_courses", JSON.stringify(courses));
  let completed = courses.filter((c) => (progress[c.id] || 0) >= 100).length;
  document.getElementById("welcome").innerText =
    "Welcome back, " + current.name + "!";
  document.getElementById("today").innerText = new Date().toDateString();
  document.getElementById("totalCourses").innerText = courses.length;
  document.getElementById("completedCourses").innerText = completed;
  document.getElementById("quizCount").innerText = history.length;
  document.getElementById("averageScore").innerText =
    (history.length
      ? Math.round(history.reduce((a, b) => a + b.percent, 0) / history.length)
      : 0) + "%";
  document.getElementById("courseActivity").innerHTML = courses
    .slice(0, 4)
    .map(
      (c) =>
        "<p><b>" +
        c.title +
        '</b> <span style="float:right">' +
        (progress[c.id] || 0) +
        '%</span></p><div class="progress"><span style="width:' +
        (progress[c.id] || 0) +
        '%"></span></div>',
    )
    .join("");
  document.getElementById("recentActivities").innerHTML =
    history
      .slice(-4)
      .reverse()
      .map(
        (h) =>
          "<p>" +
          h.category +
          " quiz · " +
          h.percent +
          "% <small>(" +
          h.date +
          ")</small></p>",
      )
      .join("") || "No quiz attempts yet.";
  if (window.Chart)
    new Chart(document.getElementById("overviewChart"), {
      type: "doughnut",
      data: {
        labels: ["Completed", "In progress"],
        datasets: [{ data: [completed, courses.length - completed] }],
      },
    });
}
function defaultCourses() {
  return [
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
}
