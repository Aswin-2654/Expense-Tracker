import "../styles/CategoryFilter.css";

function CategoryFilter({ setCategory }) {
  return (
    <input
      className="category-filter"
      placeholder="Filter by category"
      onChange={(e) => setCategory(e.target.value)}
    />
  );
}

export default CategoryFilter;
