import React, { useState } from "react";

function SearchBar({ onSort, onFilter }) {
  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState("Tech");

  function handleSortChange(e) {
    const value = e.target.value;
    setSortBy(value);
    if (onSort) onSort(value);
  }

  function handleFilterChange(e) {
    const value = e.target.value;
    setFilterBy(value);
    if (onFilter) onFilter(value);
  }
  
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          name="sort"
          checked={sortBy === "Alphabetically"}
          onChange={handleSortChange}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          name="sort"
          checked={sortBy === "Price"}
          onChange={handleSortChange}
        />
        Price
      </label>
      <br />
      <label>
        <strong>Filter:</strong>
        <select value={filterBy} onChange={handleFilterChange}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
}

export default SearchBar;
