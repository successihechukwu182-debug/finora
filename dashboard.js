const user = localStorage.getItem("finora_current_user");

if (!user) {
  window.location.href = "index.html";
}

document.getElementById("welcome").innerText =
  "Welcome, " + user;

const key = "finora_records_" + user;

function getRecords() {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveRecords(records) {
  localStorage.setItem(key, JSON.stringify(records));
}

function addRecord() {
  const amount = document.getElementById("amount").value;
  const note = document.getElementById("note").value;

  if (!amount || !note) {
    alert("Fill all fields");
    return;
  }

  const records = getRecords();
  records.push({ amount, note });
  saveRecords(records);

  displayRecords();
}

function displayRecords() {
  const records = getRecords();
  const list = document.getElementById("records");
  list.innerHTML = "";

  records.forEach(r => {
    const li = document.createElement("li");
    li.innerText = `₦${r.amount} - ${r.note}`;
    list.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("finora_current_user");
  window.location.href = "index.html";
}

displayRecords();
