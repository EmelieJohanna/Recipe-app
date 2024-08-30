// components/RecipeSearch.js
import React, { useState } from "react";
import SearchForm from "./searchForm";
import FetchRecipes from "./fetchRecipes";

const RecipeSearch = ({ category }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="recipe-search">
      <SearchForm
        query={query}
        updateSearch={updateSearch}
        getSearch={getSearch}
      />
      <FetchRecipes query={query} category={category} />
    </div>
  );
};

export default RecipeSearch;
