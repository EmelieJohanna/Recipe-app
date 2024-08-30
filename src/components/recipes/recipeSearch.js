// components/RecipeSearch.js
import React, { useState } from "react";
import SearchForm from "./searchForm";
import FetchRecipes from "./fetchRecipes";

const RecipeSearch = ({ query, filters }) => {
  return (
    <div>
      <FetchRecipes query={query} filters={filters} />
    </div>
  );
};

export default RecipeSearch;
