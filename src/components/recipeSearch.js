// components/RecipeSearch.js
import React, { useEffect, useState } from "react";
import RecipeCard from "./recipeCard";

const RecipeSearch = () => {
  // API keys (move to env file later)
  const APP_ID = "3aed539c";
  const APP_KEY = "6dfab6fbb48a7afb4e107d3933a8418d";

  // States
  const [recipes, setRecipes] = useState([]); // List of recipes
  const [search, setSearch] = useState(""); // Search field state
  const [query, setQuery] = useState("chicken"); // Default query set to 'chicken'

  // Fetch recipes from API whenever 'query' changes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [query]);

  // Handlers
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  // Render search form and list of recipes
  return (
    <div className="recipe-search">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipe.label} // no id in the api?
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
