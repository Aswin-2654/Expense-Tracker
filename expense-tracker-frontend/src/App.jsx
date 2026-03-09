import { useEffect, useState } from "react";
import api from "./api/axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryFilter from "./components/CategoryFilter";
import "./styles/App.css";
import CategoryCards from "./components/CategoryCards";



function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [sortOrder, setSortOrder] = useState(""); 
 


 const fetchExpenses = async () => {
    const response = await api.get("/expenses", {
      params: {
        ...(category ? { category } : {}),
        ...(sortOrder ? { sort: sortOrder } : {}),
        
      },
    });

    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [category,sortOrder]);


   useEffect(() => {
    setPage(1);
  }, [category]);

  const totalPages = Math.ceil(expenses.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentExpenses = expenses.slice(startIndex, endIndex);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        refreshExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <CategoryFilter setCategory={setCategory} />
      <select 
      className="sort-dropdown"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Sort</option>
        <option value="asc">Min → Max</option>
        <option value="desc">Max → Min</option>
        <option value="recent">Recent → Old</option>
        <option value="old">Old → Recent</option>
      </select>
   
      <ExpenseList
        expenses={currentExpenses}
        refreshExpenses={fetchExpenses}
        onEdit={setEditingExpense}
      />
       <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
       <CategoryCards expenses={expenses} />

    </div>
  );
}

export default App;
