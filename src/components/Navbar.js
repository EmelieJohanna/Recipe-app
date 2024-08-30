// components/Navbar.js
import React from 'react';

const Navbar = ({ onSelectView, onSelectCategory }) => {
  const categories = ["Gluten-Free", "Vegetarian", "Vegan"];
  const views = ["search", "userRecipe"];

  const handleViewChange = (view) => {
    onSelectView(view);
  };

  const handleCategoryChange = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <nav>
      <ul>
      <li><button onClick={() => onSelectView('home')}>Home</button></li>
        <li>
          <button onClick={() => handleViewChange("search")}>Recipe Search</button>
        </li>
        <li>
          <button onClick={() => handleViewChange("userRecipe")}>Submit Recipe</button>
        </li>
      </ul>
      {onSelectCategory && (
        <div>
          <h4>Filter by Category</h4>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <button onClick={() => handleCategoryChange(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
