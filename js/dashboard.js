// ===============================
// USER SESSION CHECK
// ===============================

let profileBtn = document.getElementById("profile-btn");
let dropDown = document.getElementById("dropdown");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "../index.html";
} else {
  profileBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${currentUser.registerName}`;
}

// Dropdown
profileBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  dropDown.style.display =
    dropDown.style.display === "flex" ? "none" : "flex";
});

window.addEventListener("click", () => {
  dropDown.style.display = "none";
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});


// ===============================
// TRANSACTION SYSTEM
// ===============================

// Load transactions for current user
let transactions = JSON.parse(
  localStorage.getItem(`transactions_${currentUser.registerName}`)
) || [];

// Elements
const incomeEl = document.getElementById("income-amt");
const expenseEl = document.getElementById("expense-amt");
const balanceEl = document.getElementById("balance-amt");
const transactionList = document.getElementById("transactionList");

// Modal elements
let modal = document.getElementById("modal");
let openModal = document.getElementById("openModal");
let closeModal = document.getElementById("closeModal");
let addBtn = document.getElementById("addBtn");

// Open Modal
openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// ===============================
// ADD TRANSACTION
// ===============================

addBtn.addEventListener("click", () => {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value.trim();
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  if (!category || !amount || !date) {
    alert("Please fill all fields");
    return;
  }

  const newTransaction = {
    id: Date.now(),
    type: type,
    category: category,
    amount: Number(amount),
    date: date,
  };

  transactions.push(newTransaction);

  saveTransactions();
  updateSummary();
  renderTransactions();

  // Reset form
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  modal.classList.add("hidden");
});

// ===============================
// SAVE TO LOCAL STORAGE
// ===============================

function saveTransactions() {
  localStorage.setItem(
    `transactions_${currentUser.registerName}`,
    JSON.stringify(transactions)
  );
}

// ===============================
// UPDATE SUMMARY
// ===============================

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = income - expense;
}

// ===============================
// RENDER TRANSACTIONS
// ===============================

function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((t) => {
    const row = document.createElement("div");
    row.classList.add("transaction-row");

    row.innerHTML = `
      <span>${t.date}</span>
      <span>${t.category}</span>
      <span class="${t.type === "income" ? "income-text" : "expense-text"}">
        ${t.type}
      </span>
      <span>₹ ${t.amount}</span>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">
        Delete
      </button>
    `;

    transactionList.appendChild(row);
  });
}

// ===============================
// DELETE TRANSACTION
// ===============================

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  saveTransactions();
  updateSummary();
  renderTransactions();
}

// ===============================
// INITIAL LOAD
// ===============================

updateSummary();
renderTransactions();