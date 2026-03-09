import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ExpenseForm.css";

function ExpenseForm({ refreshExpenses, editingExpense, setEditingExpense }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    customCategory: "",
    notes:"",
    date: "",
  });

  
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        customCategory: "",
        date: editingExpense.date,
      });
    }
  }, [editingExpense]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleCategoryChange = (e) => {
    const selected = e.target.value;

    setFormData({
      ...formData,
      category: selected,
      customCategory: selected === "Others" ? formData.customCategory : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Final category selection
    const finalCategory =
      formData.category === "Others"
        ? formData.customCategory.trim()
        : formData.category;

    if (!finalCategory) {
      alert("Please select or enter a category");
      return;
    }

   
    const payload = {
      title: formData.title,
      amount: Number(formData.amount),
      category: finalCategory,
      notes: formData.notes,
      date: formData.date,
    };

    if (editingExpense) {
      //UPDATE
      await api.put(`/expenses/${editingExpense.id}`, payload);
      setEditingExpense(null);
    } else {
      //CREATE
      await api.post("/expenses", payload);
    }

    //Reset form
    setFormData({
      title: "",
      amount: "",
      category: "",
      customCategory: "",
      notes:"",
      date: "",
    });

    refreshExpenses();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      {/*Category Dropdown */}
      <select
        name="category"
        value={formData.category}
        onChange={handleCategoryChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Others">Others</option>
      </select>

      
      {formData.category === "Others" && (
        <input
          name="customCategory"
          placeholder="Enter custom category"
          value={formData.customCategory}
          onChange={handleChange}
          required
        />
      )}

      <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
      />

      <input
        name="date"
        type="datetime-local"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
