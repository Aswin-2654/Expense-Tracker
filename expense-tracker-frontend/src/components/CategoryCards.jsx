import "../styles/CategoryCards.css";

function CategoryCards({ expenses }) {
  
  const categorySummary = expenses.reduce((acc, exp) => {
    const cat = exp.category;

    if (!acc[cat]) {
      acc[cat] = { total: 0, count: 0 };
    }

    acc[cat].total += Number(exp.amount);
    acc[cat].count += 1;

    return acc;
  }, {});

  const categories = Object.keys(categorySummary).sort();

  if (categories.length === 0) return null;

  return (
    <div className="category-cards">
      {categories.map((cat) => (
        <div key={cat} className="category-card">
          <h3>{cat}</h3>

          <p>
            Total Amount: <b>₹{categorySummary[cat].total.toFixed(2)}</b>
          </p>

          <p>
            Total Items: <b>{categorySummary[cat].count}</b>
          </p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;
