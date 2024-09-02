// Importing neccessary dependencies and styles
import React from "react";
import "./styles/CategoryFilter.css";

// Child component that displays filter options, handles user interactions
// CategoryFilter component accepts props: onSelectCategory (function) and filters (object containing current filter states)

const CategoryFilter = ({ onSelectCategory, filters }) => {
  // Defining categories for filtering, each has an array of options
  const categories = {
    mealType: ["Breakfast", "Lunch", "Dinner", "Snack"],
    dishType: ["Main course", "Side dish", "Desserts"],
    health: ["Gluten-Free", "Vegan", "Vegetarian"],
  };

  // Function to handle filter selection, is triggered on button click
  const handleSelect = (filterType, value) => {
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
    //Call onSelectCategory function to update filters
    onSelectCategory(filterType, value);
  };

  //Render UI
  return (
    <div className="category-filter">
      {/* Loops through each filter category (mealType, dishType, health) */}
      {Object.keys(categories).map((filterType) => (
        <div key={filterType} className="filter-group">
          {/* Filter type as header */}
          <h3>{filterType.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
          {/* Makes button for each */}
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
              {/* Display the value of the filter option on the button */}
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
