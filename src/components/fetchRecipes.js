// components/FetchRecipes.js
import React, { useEffect, useState } from "react";
import RecipeList from "./recipeList";

const FetchRecipes = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const APP_ID = "3aed539c";
        const APP_KEY = "6dfab6fbb48a7afb4e107d3933a8418d";
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.hits);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, [query]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return <RecipeList recipes={recipes} />;
};

export default FetchRecipes;
