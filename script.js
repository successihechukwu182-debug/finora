// ===== LOGIN =====
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let msg = document.getElementById("msg");

  if (user === "" || pass === "") {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("finoraUser", user);
  window.location.href = "dashboard.html";
}

// ===== DASHBOARD PROTECTION =====
let currentUser = localStorage.getItem("finoraUser");
let welcome = document.getElementById("welcome");

if (welcome) {
  if (!currentUser) {
    records = [];
    window.location.href = "index.html";
  } else {
    welcome.innerText = "Welcome, " + currentUser;
  }
}

// ===== LOAD EXISTING RECORDS =====
let records = JSON.parse(localStorage.getItem("finoraRecords")) || [];

function displayRecords() {
  let list = document.getElementById("records");
  list.innerHTML = "";

  records.forEach((r) => {
    let li = document.createElement("li");
    li.innerText = `${r.date} | Income: ₦${r.income} | Expense: ₦${r.expense} | Balance: ₦${r.balance}`;
    list.appendChild(li);
  });

  updateSummary();
}

displayRecords();

// ===== SAVE NEW RECORD =====
function saveRecord() {
  let incomeInput = document.getElementById("income").value;
  let expenseInput = document.getElementById("expense").value;

  let income = Number(incomeInput.replace(/[^0-9.]/g, ""));
  let expense = Number(expenseInput.replace(/[^0-9.]/g, ""));
  let result = document.getElementById("result");

  if (isNaN(income) && isNaN(expense)) {
    result.innerText = "Enter at least one valid number";
    result.style.color = "red";
    return;
  }

  if (isNaN(income)) income = 0;
  if (isNaN(expense)) expense = 0;

  let balance = income - expense;

  if (balance > 0) {
    result.innerText = `Profit: ₦${balance}`;
    result.style.color = "green";
  } else if (balance < 0) {
    result.innerText = `Loss: ₦${Math.abs(balance)}`;
    result.style.color = "red";
  } else {
    result.innerText = "No profit, no loss";
    result.style.color = "black";
  }

  let record = {
    date: new Date().toISOString(),
    income: income,
    expense: expense,
    balance: balance
  };

  records.push(record);
  localStorage.setItem("finoraRecords", JSON.stringify(records));

  displayRecords();
  clearInputs();
}

// ===== CLEAR INPUTS =====
function clearInputs() {
  document.getElementById("income").value = "";
  document.getElementById("expense").value = "";
}

// ===== UPDATE MONTHLY & YEARLY SUMMARY =====
function updateSummary() {
  let monthlyIncome = 0,
      monthlyExpense = 0,
      yearlyIncome = 0,
      yearlyExpense = 0;

  let now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  records.forEach(r => {
    let recordDate = new Date(r.date);
    if (recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear) {
      monthlyIncome += r.income;
      monthlyExpense += r.expense;
    }
    if (recordDate.getFullYear() === currentYear) {
      yearlyIncome += r.income;
      yearlyExpense += r.expense;
    }
  });

  document.getElementById("monthlySummary").innerText =
    `Income: ₦${monthlyIncome} | Expense: ₦${monthlyExpense} | Balance: ₦${monthlyIncome - monthlyExpense}`;

  document.getElementById("yearlySummary").innerText =
    `Income: ₦${yearlyIncome} | Expense: ₦${yearlyExpense} | Balance: ₦${yearlyIncome - yearlyExpense}`;
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("finoraUser");
  records = [];
  window.location.href = "index.html";
}
