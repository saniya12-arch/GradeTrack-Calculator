function addRow() {
  let table = document.getElementById("table");

  let row = table.insertRow();

  row.insertCell(0).innerHTML = '<input placeholder="Subject">';
  row.insertCell(1).innerHTML = '<input class="marks">';
  row.insertCell(2).innerHTML = '<input class="credits">';
}

function clearAll() {
  let table = document.getElementById("table");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  document.getElementById("sgpa").innerText = "";
  document.getElementById("cgpa").innerText = "";
}

function getGP(m) {
  if (m >= 90) return 10;
  if (m >= 80) return 9;
  if (m >= 70) return 8;
  if (m >= 60) return 7;
  if (m >= 50) return 6;
  return 0;
}

function calculateSGPA() {
  let marks = document.getElementsByClassName("marks");
  let credits = document.getElementsByClassName("credits");

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < marks.length; i++) {
    let m = Number(marks[i].value);
    let c = Number(credits[i].value);

    if (m === 0 || c === 0) continue;

    let gp = getGP(m);

    totalPoints += gp * c;
    totalCredits += c;
  }

  if (totalCredits === 0) {
    document.getElementById("sgpa").innerText = "Enter valid data";
    return;
  }

  let sgpa = (totalPoints / totalCredits).toFixed(2);

  document.getElementById("sgpa").innerText = "SGPA: " + sgpa;
}

function calculateCGPA() {
  let prev = Number(document.getElementById("prevCgpa").value);
  let sem = Number(document.getElementById("sem").value);

  let sgpaText = document.getElementById("sgpa").innerText;

  if (!sgpaText) {
    alert("Calculate SGPA first");
    return;
  }

  let sgpa = Number(sgpaText.replace("SGPA: ", ""));

  let cgpa = ((prev * sem) + sgpa) / (sem + 1);

  document.getElementById("cgpa").innerText =
    "CGPA: " + cgpa.toFixed(2);
}

window.onload = function () {
  for (let i = 0; i < 5; i++) addRow();
};
