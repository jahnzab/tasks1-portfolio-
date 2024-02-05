// JavaScript
let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const editCell = newRow.insertCell();
    const editBtn = document.createElement('button');
    editBtn.style.color='blue'
    editBtn.style.backgroundColor = 'yellow';
    editBtn.style.borderRadius = '4px';
    editBtn.style.padding = '10px 30px';
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function() {
        editExpense(expense, newRow);
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
});

function editExpense(expense, row) {
    const newCategory = prompt('Enter new category:', expense.category);
    const newAmount = parseFloat(prompt('Enter new amount:', expense.amount));
    const newDate = prompt('Enter new date:', expense.date);

    if (newCategory && !isNaN(newAmount) && newDate) {
        // Update the expense object
        expense.category = newCategory;
        expense.amount = newAmount;
        expense.date = newDate;

        // Update the row in the table
        updateTableRow(row, expense);

        // Recalculate total amount
        calculateTotalAmount();
    } else {
        alert('Invalid input. Please try again.');
    }
}

function updateTableRow(row, expense) {
    const [categoryCell, amountCell, dateCell] = row.cells;

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
}

function calculateTotalAmount() {
    totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountCell.textContent = totalAmount;
}
