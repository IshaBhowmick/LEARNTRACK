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
  let courses = JSON.parse(localStorage.getItem("lt_courses") || "[]"),
    progress = JSON.parse(
      localStorage.getItem("lt_progress_" + current.id) || "{}",
    ),
    history = JSON.parse(
      localStorage.getItem("lt_quizzes_" + current.id) || "[]",
    ),
    done = courses.filter((c) => (progress[c.id] || 0) >= 100).length,
    avg = history.length
      ? Math.round(history.reduce((a, b) => a + b.percent, 0) / history.length)
      : 0,
    high = history.length ? Math.max(...history.map((h) => h.percent)) : 0;
  document.getElementById("pTotal").innerText = courses.length;
  document.getElementById("pDone").innerText = done;
  document.getElementById("pQuiz").innerText = history.length;
  document.getElementById("pAvg").innerText = avg + "%";
  document.getElementById("pHigh").innerText = high + "%";
  document.getElementById("quizHistory").innerHTML = history.length
    ? "<table><tr><th>Category</th><th>Score</th><th>Date</th></tr>" +
      history
        .slice()
        .reverse()
        .map(
          (h) =>
            "<tr><td>" +
            h.category +
            "</td><td>" +
            h.score +
            "/" +
            h.total +
            " (" +
            h.percent +
            "%)</td><td>" +
            h.date +
            "</td></tr>",
        )
        .join("") +
      "</table>"
    : '<p class="muted">No quiz attempts yet.</p>';
  if (window.Chart) {
    new Chart(document.getElementById("courseChart"), {
      type: "pie",
      data: {
        labels: ["Completed", "Ongoing"],
        datasets: [{ data: [done, courses.length - done] }],
      },
    });
    new Chart(document.getElementById("scoreChart"), {
      type: "bar",
      data: {
        labels: history.map((h, i) => h.category + " " + (i + 1)),
        datasets: [
          { label: "Quiz percentage", data: history.map((h) => h.percent) },
        ],
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } } },
    });
    new Chart(document.getElementById("timeChart"), {
      type: "line",
      data: {
        labels: history.map((h, i) => h.date),
        datasets: [
          {
            label: "Quiz score %",
            data: history.map((h) => h.percent),
            tension: 0.3,
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } } },
    });
  }
}
