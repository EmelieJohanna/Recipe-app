// components/recipes/RecipeSearchPage.js
import React, { useState } from "react";
import RecipeSearch from "./recipeSearch";
import CategoryFilter from "./CategoryFilter";
import SearchForm from "./searchForm";
import "./RecipeSearchPage.css";

const RecipeSearchPage = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    mealType: "",
    dishType: "",
    health: "",
  });
  const handleSelectCategory = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType] === value ? "" : value,
    }));
  };

  const updateSearch = (e) => {
    setQuery(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    // This will trigger the search with the current query and filters
  };

  return (
    <div className="recipe-search-page">
      <SearchForm
        query={query}
        updateSearch={updateSearch}
        getSearch={getSearch}
      />
      <CategoryFilter
        filters={filters}
        onSelectCategory={handleSelectCategory}
      />
      <RecipeSearch query={query} filters={filters} />
    </div>
  );
};

export default RecipeSearchPage;
