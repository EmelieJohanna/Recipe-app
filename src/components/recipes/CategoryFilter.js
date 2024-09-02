// components/CategoryFilter.js
import React from "react";
import "./styles/CategoryFilter.css";

const CategoryFilter = ({ onSelectCategory, filters }) => {
  const categories = {
    mealType: ["Breakfast", "Lunch", "Dinner", "Snack"],
    dishType: ["Main course", "Side dish", "Desserts"],
    health: ["Gluten-Free", "Vegan", "Vegetarian"],
  };
  const handleSelect = (filterType, value) => {
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
    onSelectCategory(filterType, value);
  };
  return (
    <div className="category-filter">
      {Object.keys(categories).map((filterType) => (
        <div key={filterType} className="filter-group">
          <h3>{filterType.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
          {categories[filterType].map((value) => (
            <button
              key={value}
              className={`filter-button ${
                filters[filterType] === value ? "active" : ""
              }`}
              onClick={() =>
                handleSelect(filterType, value)
              }
            >
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
