// components/RecipeSearch.js
import React from "react";
import FetchRecipes from "./FetchRecipes";

const RecipeResults = ({ query, filters }) => {
  return (
    <div>
      <FetchRecipes query={query} filters={filters} />
    </div>
  );
};

export default RecipeResults;
