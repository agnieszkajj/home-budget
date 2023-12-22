const incomeName = document.querySelector("#incomeName");
const incomeAmount = document.querySelector("#incomeAmount");
const addIncome = document.querySelector("#incomeButton");

const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const addExpense = document.querySelector("#expenseButton");

const incomeList = document.querySelector("#incomeList");
const expenseList = document.querySelector("#expenseList");

const incomeSum = document.querySelector("#incomeSum");
const expenseSum = document.querySelector("#expenseSum");

const totalBudget = document.querySelector("#total-budget");

const updateSummary = (element) => {
  let total = 0;
  Array.from(element.children).forEach((li) => {
    const valueSpan = li.querySelector("#span-amount");
    if (valueSpan) {
      total += parseFloat(valueSpan.innerText);
    }
  });
  if (element === incomeList) {
    incomeSum.innerText = total;
  } else if (element === expenseList) {
    expenseSum.innerText = total;
  }
  totalBudget.innerText = incomeSum.innerText - expenseSum.innerText;
};

addIncome.addEventListener("click", () => {
  if (
    !isNaN(incomeAmount.value) &&
    incomeAmount.value > 0 &&
    incomeName.value
  ) {
    const li = document.createElement("li");
    li.innerHTML = `<div>${
      incomeName.value
    } - <span id="span-amount">${parseFloat(incomeAmount.value).toFixed(
      2
    )}</span></div><div><button class="edit">Edytuj</button><button class="delete">Usuń</button></div>`;
    li.classList.add("li");
    incomeList.appendChild(li);
    updateSummary(incomeList);
  } else {
    alert("Proszę wprowadz prawidłowe wartości!");
  }
  incomeAmount.value = "";
  incomeName.value = "";
});

addExpense.addEventListener("click", () => {
  if (
    !isNaN(expenseAmount.value) &&
    expenseAmount.value > 0 &&
    expenseName.value
  ) {
    const li = document.createElement("li");
    li.innerHTML = `<div>${
      expenseName.value
    } - <span id="span-amount">${parseFloat(expenseAmount.value).toFixed(
      2
    )}</span></div><div><button class="edit">Edytuj</button><button class="delete">Usuń</button></div>`;
    li.classList.add("li");
    expenseList.appendChild(li);
    updateSummary(expenseList);
  } else {
    alert("Proszę wprowadz prawidłowe wartości!");
  }
  expenseAmount.value = "";
  expenseName.value = "";
});

incomeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    updateSummary(incomeList);
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement.parentElement;
    const incomeName = li.childNodes[0].childNodes[0].nodeValue
      .trim()
      .slice(0, -1);
    const incomeValue = li.querySelector("#span-amount").innerText;
    li.innerHTML = `<input id="editedName" value="${incomeName}" class="w-2/5"></input><input type="number" class="w-2/5" id="editedValue" value="${incomeValue}"></input><button class="save">Zapisz</button>`;
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest(".li");
    const newName = li.querySelector("#editedName").value;
    const newAmount = li.querySelector("#editedValue").value;
    if (isNaN(newAmount) || newAmount <= 0) {
      alert("Proszę wprowadz prawidłową kwotę!");
    } else if (!newName) {
      alert("Proszę wprowadz prawidłową wartość!");
    } else {
      li.innerHTML = `<div class="flex justify-between w-full"><div>${newName} - <span id="span-amount">${parseFloat(
        newAmount
      ).toFixed(
        2
      )}</span></div><div><button class="edit">Edytuj</button><button class="delete">Usuń</button></div></div>`;
      updateSummary(incomeList);
    }
  }
});

expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    updateSummary(expenseList);
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.parentElement.parentElement;
    const expenseName = li.childNodes[0].childNodes[0].nodeValue
      .trim()
      .slice(0, -1);
    const expenseValue = li.querySelector("#span-amount").innerText;
    li.innerHTML = `<input id="editedName" value="${expenseName}" class="w-2/5"></input><input class="w-2/5" id="editedValue" value="${expenseValue}"</input><button class="save">Zapisz</button>`;
  } else if (e.target.classList.contains("save")) {
    const li = e.target.closest(".li");
    const newName = li.querySelector("#editedName").value;
    const newAmount = li.querySelector("#editedValue").value;
    if (isNaN(newAmount) || newAmount <= 0) {
      alert("Proszę wprowadz prawidłową kwote!");
    } else if (!newName) {
      alert("Proszę wprowadz prawidłową wartość!");
    } else {
      li.innerHTML = `<div class="flex justify-between w-full"><div >${newName} - <span id="span-amount">${parseFloat(
        newAmount
      ).toFixed(
        2
      )}</span></div><div><button class="edit">Edytuj</button><button class="delete">Usuń</button></div>`;
      updateSummary(expenseList);
    }
  }
});
