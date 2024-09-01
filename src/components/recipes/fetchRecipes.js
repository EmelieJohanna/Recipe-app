// components/FetchRecipes.js
import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";

const FetchRecipes = ({ query, filters }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const APP_ID = "4f35a1f4";
        const APP_KEY = "1e7689dd2017dd649e7f2620b86cd69b";
        const searchQuery = query.trim() === '' ? 'all' : query;

        const filterParams = Object.entries(filters)
          .map(([key, value]) => value ? `${key}=${value}` : '')
          .filter(param => param)
          .join('&');
        const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&${filterParams}`
        console.log('API Request URL:', url);
        const response = await fetch(url);
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
  }, [query, filters]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return <RecipeList recipes={recipes} />;
};

export default FetchRecipes;
