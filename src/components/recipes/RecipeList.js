// components/RecipeList.js
import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = ({ recipes, onDelete, onRate }) => (
  <div className="recipe-list">
    {recipes.map((recipe) => (
      <RecipeCard
        key={recipe.recipe.uri}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        onDelete={onDelete}
        onRate={onRate}
      />
    ))}
  </div>
);

export default RecipeList;
