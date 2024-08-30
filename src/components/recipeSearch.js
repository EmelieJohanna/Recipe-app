// components/RecipeSearch.js
import React, { useState } from "react";
import SearchForm from "./searchForm";
import FetchRecipes from "./fetchRecipes";

const RecipeSearch = () => {
  const [query, setQuery] = useState("chicken");
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
      <FetchRecipes query={query} />
    </div>
  );
};

export default RecipeSearch;
