let contactForm = document.getElementById("contactForm");
contactForm.onsubmit = function (e) {
  e.preventDefault();
  let messages = JSON.parse(localStorage.getItem("lt_messages") || "[]");
  messages.push({
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    subject: document.getElementById("contactSubject").value,
    message: document.getElementById("contactMessage").value,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("lt_messages", JSON.stringify(messages));
  contactForm.reset();
  document.getElementById("contactStatus").innerHTML =
    '<p class="notice">Thank you! Your message has been saved.</p>';
};
