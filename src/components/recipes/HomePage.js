// components/recipes/HomePage.js
import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (useMockData) {
          const response = await fetch("/recipes.json");
          if (!response.ok) {
            throw new Error("Failed to fetch mock recipes");
          }
          const data = await response.json();
          console.log(data);
          setRecipes(data.hits);
        } else {
          const APP_ID = "ad781b5d";
          const APP_KEY = "48f43889e89875afdcb8aea24d944c27";
          const response = await fetch(
            `https://api.edamam.com/search?q=all&app_id=${APP_ID}&app_key=${APP_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recipes from API");
          }
          const data = await response.json();
          setRecipes(data.hits);
          console.log(data.hits);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, [useMockData]);

  const deleteRecipe = (label) => {
    setRecipes(recipes.filter((recipe) => recipe.recipe.label !== label));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={useMockData}
            onChange={(e) => setUseMockData(e.target.checked)}
          />
          Use Mock Data
        </label>
      </div>
      <RecipeList recipes={recipes} onDelete={deleteRecipe} />
    </div>
  );
};

export default HomePage;
