// components/recipes/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ onSelectCategory }) => {
  const categories = ["Gluten-Free", "Vegetarian", "Vegan"];

  return (
    <div className="category-filter">
      <h4>Filter by Category</h4>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => onSelectCategory(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
