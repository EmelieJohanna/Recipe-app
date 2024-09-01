// components/RecipeSearch.js
import React, { useState } from "react";
import SearchForm from "./SearchForm";
import FetchRecipes from "./FetchRecipes";

const RecipeSearch = ({ query, filters }) => {
  return (
    <div>
      <FetchRecipes query={query} filters={filters} />
    </div>
  );
};

export default RecipeSearch;
