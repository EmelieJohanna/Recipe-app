import React, { useState } from "react";
import SearchForm from "./SearchForm";
import CategoryFilter from "./CategoryFilter";
import FetchRecipes from "./FetchRecipes";

// Parent component!
// Handles State and Logic for the whole page

// State managment: holds "query" state for search input.
// Holds filters object in state

const HomePage = () => {
  const defaultQuery = "";
  const [query, setQuery] = useState(""); // User search query
  const [filters, setFilters] = useState({
    mealType: "",
    dishType: "",
    health: "",
  }); // User-selected filters

  const [useMockData, setUseMockData] = useState(false);

  // Handling input changes
  const handleSelectCategory = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: prevFilters[filterType] === value ? "" : value,
      };
      console.log("Updated Filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const updateSearch = (e) => {
    setQuery(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
  };

  const handleMockDataChange = () => {
    setUseMockData((prev) => !prev);
  };

  return (
    <div>
      <SearchForm
        query={query}
        updateSearch={updateSearch}
        getSearch={getSearch}
      />
      <span>Use Mock Data for Recipes</span>
      <input
        type="checkbox"
        checked={useMockData}
        onChange={handleMockDataChange}
      />
      <CategoryFilter
        filters={filters}
        onSelectCategory={handleSelectCategory}
      />
      <FetchRecipes query={query} filters={filters} useMockData={useMockData} />
    </div>
  );
};

export default HomePage;
