import api from "../api/axios";
import "../styles/ExpenseList.css";

function ExpenseList({ expenses, refreshExpenses, onEdit }) {

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return; 

    await api.delete(`/expenses/${id}`);
    refreshExpenses();
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>

      <div className="expense-header">
        <span>Title</span>
        <span>Amount</span>
        <span>Category</span>
        <span>notes</span>
        <span>Date</span>
        <span>Actions</span>
      </div>

      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <span>{expense.title}</span>
          <span>₹{expense.amount}</span>
          <span>{expense.category}</span>
          <span>{expense.notes || "-"}</span>
          <span>{expense.date}</span>

          <div className="action-buttons">
            <button className="edit-btn" onClick={() => onEdit(expense)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
