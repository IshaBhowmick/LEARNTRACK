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
let current = requireStudent(),
  defaultList = [
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
if (current) {
  let courses =
    JSON.parse(localStorage.getItem("lt_courses") || "null") || defaultList;
  localStorage.setItem("lt_courses", JSON.stringify(courses));
  let progress = JSON.parse(
    localStorage.getItem("lt_progress_" + current.id) || "{}",
  );
  function draw() {
    document.getElementById("courseList").innerHTML = courses
      .map(
        (c) =>
          '<div class="card course-card"><div class="course-top"><span class="icon">' +
          (c.image || "📘") +
          '</span><span class="pill">' +
          c.category +
          "</span></div><h3>" +
          c.title +
          "</h3><p>" +
          c.desc +
          '</p><p style="margin-top:14px">Course progress <b style="float:right">' +
          (progress[c.id] || 0) +
          '%</b></p><div class="progress"><span style="width:' +
          (progress[c.id] || 0) +
          '%"></span></div><button class="btn small" onclick="updateCourse(\'' +
          c.id +
          "')\">" +
          ((progress[c.id] || 0) > 0 ? "Continue Learning" : "Start Learning") +
          '</button> <button class="btn light small" onclick="completeCourse(\'' +
          c.id +
          "')\">Mark Completed</button></div>",
      )
      .join("");
  }
  window.updateCourse = function (id) {
    progress[id] = Math.min(90, (progress[id] || 0) + 15);
    save();
    draw();
  };
  window.completeCourse = function (id) {
    progress[id] = 100;
    save();
    draw();
  };
  function save() {
    localStorage.setItem("lt_progress_" + current.id, JSON.stringify(progress));
  }
  draw();
}
