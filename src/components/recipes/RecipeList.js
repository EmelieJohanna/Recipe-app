// components/RecipeList.js
import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = ({ recipes, onDelete, onEdit, onRate }) => {
  console.log("Recipes in RecipeList:", recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={`${recipe.recipe.label}-${index}`} // Generate a unique key
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          onDelete={onDelete}
          onEdit={onEdit}
          onRate={onRate}
        />
      ))}
    </div>
  );
};

export default RecipeList;
