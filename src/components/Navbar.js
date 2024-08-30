// components/Navbar.js
import React from 'react';
import './Navbar.css'; 

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
    <nav className="navbar">
        <div className="navbar-left">
        <button onClick={() => onSelectView('home')}>All Recipes</button>
        <button onClick={() => onSelectView('search')}>Gluten-Free</button>
        <button onClick={() => onSelectView('search')}>Vegan</button>
        </div>
        <div className="navbar-title">
        <button onClick={() => onSelectView('home')}><h1>The Little Cook Book</h1></button>

        
      </div>
      <div className="navbar-right">
      <button onClick={() => handleViewChange("userRecipe")}>Submit Recipe</button>
      <button onClick={() => handleViewChange("search")}>Recipe Search</button>
      </div>
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
