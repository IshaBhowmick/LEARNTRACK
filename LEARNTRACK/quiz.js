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
  activeQuestions = [],
  answers = [],
  questionIndex = 0,
  activeCategory = "";
let questionBank = {
  HTML: [
    {
      question: "What does HTML stand for?",
      correct: "HyperText Markup Language",
      wrong: [
        "HighText Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language",
      ],
    },
    {
      question: "Which tag creates a paragraph?",
      correct: "<p>",
      wrong: ["<para>", "<text>", "<pg>"],
    },
    {
      question: "Which tag inserts an image?",
      correct: "<img>",
      wrong: ["<image>", "<picture>", "<src>"],
    },
    {
      question: "Which attribute gives an image alternative text?",
      correct: "alt",
      wrong: ["title", "name", "href"],
    },
    {
      question: "Which tag creates a hyperlink?",
      correct: "<a>",
      wrong: ["<link>", "<href>", "<url>"],
    },
    {
      question: "Which tag creates an unordered list?",
      correct: "<ul>",
      wrong: ["<ol>", "<li>", "<list>"],
    },
    {
      question: "Which tag creates a table row?",
      correct: "<tr>",
      wrong: ["<td>", "<th>", "<row>"],
    },
    {
      question: "Which attribute specifies a link destination?",
      correct: "href",
      wrong: ["src", "alt", "action"],
    },
    {
      question: "Which tag is the largest heading by default?",
      correct: "<h1>",
      wrong: ["<h6>", "<head>", "<heading>"],
    },
    {
      question: "Which input type hides typed characters?",
      correct: "password",
      wrong: ["text", "hidden-text", "secure"],
    },
    {
      question: "Which tag creates a line break?",
      correct: "<br>",
      wrong: ["<lb>", "<break>", "<hr>"],
    },
    {
      question: "Which tag defines a form?",
      correct: "<form>",
      wrong: ["<input>", "<fieldset>", "<label>"],
    },
    {
      question: "Which tag is used for a list item?",
      correct: "<li>",
      wrong: ["<item>", "<ul>", "<list>"],
    },
    {
      question: "Which attribute opens a link in a new tab?",
      correct: "target",
      wrong: ["newtab", "window", "open"],
    },
    {
      question: "Which tag displays a horizontal thematic line?",
      correct: "<hr>",
      wrong: ["<line>", "<br>", "<border>"],
    },
  ],
  CSS: [
    {
      question: "What does CSS stand for?",
      correct: "Cascading Style Sheets",
      wrong: [
        "Computer Style Syntax",
        "Creative Styling System",
        "Colorful Style Sheets",
      ],
    },
    {
      question: "Which property changes text color?",
      correct: "color",
      wrong: ["font-color", "text-style", "foreground"],
    },
    {
      question: "Which symbol selects a class?",
      correct: " . ",
      wrong: ["#", "*", "&"],
    },
    {
      question: "Which property sets an element's background?",
      correct: "background-color",
      wrong: ["color-background", "bg", "fill"],
    },
    {
      question: "Which property rounds corners?",
      correct: "border-radius",
      wrong: ["corner-style", "round", "radius"],
    },
    {
      question: "Which display value enables flex layout?",
      correct: "flex",
      wrong: ["block-flex", "flexbox", "inline"],
    },
    {
      question: "Which property controls space inside an element?",
      correct: "padding",
      wrong: ["margin", "gap", "outline"],
    },
    {
      question: "Which property controls space outside an element?",
      correct: "margin",
      wrong: ["padding", "border", "spacing"],
    },
    {
      question: "How do you select an element by id?",
      correct: "#name",
      wrong: [".name", "name", "*name"],
    },
    {
      question: "Which property changes font size?",
      correct: "font-size",
      wrong: ["text-size", "font-style", "size"],
    },
    {
      question: "Which property makes text bold?",
      correct: "font-weight",
      wrong: ["font-bold", "text-weight", "bold"],
    },
    {
      question: "Which property adds a shadow to a box?",
      correct: "box-shadow",
      wrong: ["shadow-box", "text-shadow", "filter"],
    },
    {
      question: "Which unit is relative to the root font size?",
      correct: "rem",
      wrong: ["px", "cm", "pt"],
    },
    {
      question: "Which property aligns flex items on the main axis?",
      correct: "justify-content",
      wrong: ["align-items", "flex-align", "position"],
    },
    {
      question: "Which at-rule is used for responsive breakpoints?",
      correct: "@media",
      wrong: ["@screen", "@responsive", "@device"],
    },
  ],
  JavaScript: [
    {
      question: "Which keyword declares a block-scoped variable?",
      correct: "let",
      wrong: ["varies", "define", "dim"],
    },
    {
      question: "Which method writes text into the browser console?",
      correct: "console.log()",
      wrong: ["print()", "write.console()", "log.console()"],
    },
    {
      question: "Which method selects an element by id?",
      correct: "getElementById()",
      wrong: ["queryId()", "selectId()", "getId()"],
    },
    {
      question: "Which symbol starts a single-line comment?",
      correct: "//",
      wrong: ["<!--", "##", "**"],
    },
    {
      question: "Which data type represents true or false?",
      correct: "Boolean",
      wrong: ["String", "Number", "Array"],
    },
    {
      question: "Which method adds an item to an array's end?",
      correct: "push()",
      wrong: ["pop()", "shift()", "join()"],
    },
    {
      question: "Which operator checks strict equality?",
      correct: "===",
      wrong: ["=", "==", "!="],
    },
    {
      question: "Which event happens when a button is clicked?",
      correct: "click",
      wrong: ["hover", "changeText", "pressing"],
    },
    {
      question: "Which function converts JSON text to an object?",
      correct: "JSON.parse()",
      wrong: ["JSON.stringify()", "JSON.convert()", "parse.JSON()"],
    },
    {
      question: "Which method selects the first matching CSS selector?",
      correct: "querySelector()",
      wrong: ["getSelector()", "selectAll()", "findElement()"],
    },
    {
      question: "Which keyword defines a function?",
      correct: "function",
      wrong: ["method", "func", "define"],
    },
    {
      question: "Which property changes an element's text content?",
      correct: "textContent",
      wrong: ["innerStyle", "htmlText", "valueText"],
    },
    {
      question: "Which loop repeats while a condition is true?",
      correct: "while",
      wrong: ["repeat", "loopif", "during"],
    },
    {
      question: "Which storage keeps data in the browser after closing it?",
      correct: "localStorage",
      wrong: ["sessionMemory", "tempStorage", "cookieOnly"],
    },
    {
      question: "Which method converts an object to JSON text?",
      correct: "JSON.stringify()",
      wrong: ["JSON.parse()", "toObject()", "string.JSON()"],
    },
  ],
  Python: [
    {
      question: "Which symbol begins a comment?",
      correct: "#",
      wrong: ["//", "<!--", "**"],
    },
    {
      question: "Which keyword defines a function?",
      correct: "def",
      wrong: ["function", "func", "method"],
    },
    {
      question: "Which function displays output?",
      correct: "print()",
      wrong: ["echo()", "display()", "write()"],
    },
    {
      question: "Which data type stores whole numbers?",
      correct: "int",
      wrong: ["str", "list", "bool"],
    },
    {
      question: "Which brackets create a list?",
      correct: "[]",
      wrong: ["{}", "()", "<>"],
    },
    {
      question: "Which keyword checks a condition?",
      correct: "if",
      wrong: ["when", "check", "case"],
    },
    {
      question: "Which operator is used for exponentiation?",
      correct: "**",
      wrong: ["^", "//", "%%"],
    },
    {
      question: "Which function returns the length of a sequence?",
      correct: "len()",
      wrong: ["size()", "countall()", "length()"],
    },
    {
      question: "Which value represents no value?",
      correct: "None",
      wrong: ["null", "nil", "void"],
    },
    {
      question: "Which keyword starts a loop over items?",
      correct: "for",
      wrong: ["repeat", "each", "iterate"],
    },
    {
      question: "Which method adds an item to a list?",
      correct: "append()",
      wrong: ["addEnd()", "push()", "insertLast()"],
    },
    {
      question: "Which extension is commonly used for Python files?",
      correct: ".py",
      wrong: [".python", ".pt", ".p"],
    },
    {
      question: "Which data type stores key-value pairs?",
      correct: "dictionary",
      wrong: ["tuple", "set", "string"],
    },
    {
      question: "Which keyword handles exceptions?",
      correct: "try",
      wrong: ["catch", "error", "excepting"],
    },
    {
      question: "Which function converts a value to an integer?",
      correct: "int()",
      wrong: ["integer()", "number()", "toInt()"],
    },
  ],
  Java: [
    {
      question: "Which method is the usual entry point of a Java application?",
      correct: "main()",
      wrong: ["start()", "run()", "init()"],
    },
    {
      question: "Which keyword creates an object?",
      correct: "new",
      wrong: ["make", "class", "create"],
    },
    {
      question: "Which type stores whole numbers?",
      correct: "int",
      wrong: ["float", "char", "boolean"],
    },
    {
      question: "Which keyword defines a class?",
      correct: "class",
      wrong: ["object", "define", "struct"],
    },
    {
      question: "Which symbol ends most Java statements?",
      correct: ";",
      wrong: [":", ".", ","],
    },
    {
      question: "Which keyword inherits a class?",
      correct: "extends",
      wrong: ["implements", "inherits", "super"],
    },
    {
      question: "Which keyword prevents a variable from being reassigned?",
      correct: "final",
      wrong: ["static", "private", "fixed"],
    },
    {
      question: "Which package is automatically imported from java.lang?",
      correct: "java.lang",
      wrong: ["java.util", "java.io", "java.net"],
    },
    {
      question: "Which type stores a single character?",
      correct: "char",
      wrong: ["String", "byte[]", "character"],
    },
    {
      question: "Which keyword refers to the current object?",
      correct: "this",
      wrong: ["self", "current", "that"],
    },
    {
      question: "Which access modifier is most restrictive?",
      correct: "private",
      wrong: ["public", "protected", "default"],
    },
    {
      question: "Which concept allows one name with different forms?",
      correct: "Polymorphism",
      wrong: ["Compilation", "Iteration", "Encapsulation"],
    },
    {
      question: "Which keyword is used to implement an interface?",
      correct: "implements",
      wrong: ["extends", "interface", "inherits"],
    },
    {
      question: "Which loop checks condition before each iteration?",
      correct: "while",
      wrong: ["do-while only", "switch", "try"],
    },
    {
      question: "Which class is commonly used to read keyboard input?",
      correct: "Scanner",
      wrong: ["ReaderInput", "Keyboard", "ConsoleRead"],
    },
  ],
  Database: [
    {
      question: "What does DBMS stand for?",
      correct: "Database Management System",
      wrong: [
        "Data Backup Management Software",
        "Digital Base Machine System",
        "Database Main Storage",
      ],
    },
    {
      question:
        "Which language is commonly used to query relational databases?",
      correct: "SQL",
      wrong: ["HTML", "CSS", "XML"],
    },
    {
      question: "What uniquely identifies a table row?",
      correct: "Primary key",
      wrong: ["Foreign key", "Duplicate key", "Index label"],
    },
    {
      question: "What is a collection of related data called?",
      correct: "Database",
      wrong: ["Program", "Algorithm", "Network"],
    },
    {
      question: "Which command retrieves records?",
      correct: "SELECT",
      wrong: ["INSERT", "UPDATE", "DELETE"],
    },
    {
      question: "Which command adds new records?",
      correct: "INSERT",
      wrong: ["SELECT", "DROP", "ALTER"],
    },
    {
      question: "Which key links two tables?",
      correct: "Foreign key",
      wrong: ["Primary key", "Candidate key", "Super key"],
    },
    {
      question: "What does SQL stand for?",
      correct: "Structured Query Language",
      wrong: [
        "Simple Question Language",
        "System Query Logic",
        "Sequential Query Link",
      ],
    },
    {
      question: "Which clause filters rows?",
      correct: "WHERE",
      wrong: ["ORDER BY", "GROUP BY", "FROM"],
    },
    {
      question: "Which command changes existing data?",
      correct: "UPDATE",
      wrong: ["MODIFY TABLE", "CHANGE", "ALTER ROW"],
    },
    {
      question: "Which command removes a table?",
      correct: "DROP",
      wrong: ["DELETE ROW", "CLEAR", "REMOVE FIELD"],
    },
    {
      question: "What is data redundancy?",
      correct: "Unnecessary duplication of data",
      wrong: ["Data encryption", "Data sorting", "Data validation"],
    },
    {
      question: "Which model stores data in tables?",
      correct: "Relational model",
      wrong: [
        "Hierarchical model only",
        "Network cable model",
        "Document layout",
      ],
    },
    {
      question: "What is a row in a relational table also called?",
      correct: "Tuple",
      wrong: ["Attribute", "Domain", "Schema"],
    },
    {
      question: "What is a column in a table also called?",
      correct: "Attribute",
      wrong: ["Tuple", "Record", "Relation"],
    },
  ],
};
function shuffle(list) {
  let copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)),
      temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
window.startQuiz = function (category) {
  activeCategory = category;
  activeQuestions = shuffle(questionBank[category])
    .slice(0, 10)
    .map((q) => ({
      question: q.question,
      correct: q.correct,
      options: shuffle([q.correct].concat(q.wrong)),
    }));
  answers = Array(10).fill(null);
  questionIndex = 0;
  document.getElementById("quizCategories").classList.add("hidden");
  drawQuestion();
};
function drawQuestion() {
  let q = activeQuestions[questionIndex];
  document.getElementById("quizArea").innerHTML =
    '<div class="quiz-box"><div class="page-head"><div><span class="eyebrow">' +
    activeCategory +
    " quiz</span><h2>Question " +
    (questionIndex + 1) +
    ' of 10</h2></div><span class="pill">' +
    questionIndex * 10 +
    '% complete</span></div><div class="progress"><span style="width:' +
    (questionIndex + 1) * 10 +
    '%"></span></div><h3 style="margin:22px 0">' +
    q.question +
    "</h3>" +
    q.options
      .map(
        (op, i) =>
          '<label class="option"><input type="radio" name="answer" value="' +
          i +
          '" ' +
          (answers[questionIndex] === op ? "checked" : "") +
          ">" +
          op +
          "</label>",
      )
      .join("") +
    '<div class="flex" style="justify-content:space-between;margin-top:22px"><button class="btn light" onclick="previousQuestion()" ' +
    (questionIndex === 0 ? "disabled" : "") +
    '>Previous</button><button class="btn" onclick="' +
    (questionIndex === 9 ? "submitQuiz()" : "nextQuestion()") +
    '">' +
    (questionIndex === 9 ? "Submit Quiz" : "Next") +
    "</button></div></div>";
  document.querySelectorAll('input[name="answer"]').forEach(
    (r) =>
      (r.onchange = function () {
        answers[questionIndex] = q.options[Number(this.value)];
      }),
  );
}
window.nextQuestion = function () {
  if (!answers[questionIndex]) {
    alert("Please select an answer first.");
    return;
  }
  questionIndex++;
  drawQuestion();
};
window.previousQuestion = function () {
  if (questionIndex > 0) {
    questionIndex--;
    drawQuestion();
  }
};
window.submitQuiz = function () {
  if (!answers[questionIndex]) {
    alert("Please select an answer first.");
    return;
  }
  let correct = 0;
  activeQuestions.forEach((q, i) => {
    if (q.correct === answers[i]) correct++;
  });
  let record = {
    category: activeCategory,
    score: correct,
    total: 10,
    percent: correct * 10,
    date: new Date().toLocaleString(),
    details: activeQuestions.map((q, i) => ({
      question: q.question,
      correct: q.correct,
      chosen: answers[i],
      right: q.correct === answers[i],
    })),
  };
  let history = JSON.parse(
    localStorage.getItem("lt_quizzes_" + current.id) || "[]",
  );
  history.push(record);
  localStorage.setItem("lt_quizzes_" + current.id, JSON.stringify(history));
  document.getElementById("quizArea").innerHTML =
    '<div class="quiz-box" style="text-align:center"><div class="icon">🏆</div><h2>Quiz Completed!</h2><p class="muted">' +
    activeCategory +
    ' Quiz Result</p><h1 style="font-size:52px;color:#4965e9;margin:15px">' +
    record.percent +
    "%</h1><p>You answered " +
    correct +
    ' out of 10 questions correctly.</p><p class="notice">' +
    (10 - correct) +
    " incorrect answers · " +
    correct +
    ' correct answers</p><div style="text-align:left;margin-top:25px">' +
    record.details
      .map(
        (d, i) =>
          '<p style="margin:12px 0"><b>' +
          (i + 1) +
          ". " +
          d.question +
          '</b><br><span style="color:' +
          (d.right ? "#18a875" : "#c44") +
          '">Your answer: ' +
          (d.chosen || "Not answered") +
          '</span><br><span class="muted">Correct answer: ' +
          d.correct +
          "</span></p>",
      )
      .join("") +
    '</div><button class="btn" onclick="retakeQuiz()">Retake Quiz</button> <a class="btn light" href="progress.html">View Progress</a></div>';
};
window.retakeQuiz = function () {
  document.getElementById("quizCategories").classList.remove("hidden");
  document.getElementById("quizArea").innerHTML = "";
};
