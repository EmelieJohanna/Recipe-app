import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";

const FetchRecipes = ({ query, filters, useMockData = false, onDelete }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let data;
        if (useMockData) {
          // Fetch from mock data
          const response = await fetch("/recipes.json");
          if (!response.ok) {
            throw new Error("Failed to fetch mock recipes");
          }
          data = await response.json();
          console.log(data);
          setRecipes(data.hits);
        } else {
          const APP_ID = "ad781b5d";
          const APP_KEY = "48f43889e89875afdcb8aea24d944c27";
          const searchQuery = query.trim() === "" ? "all" : query;

          const filterParams = Object.entries(filters)
            .map(([key, value]) => (value ? `${key}=${value}` : ""))
            .filter((param) => param)
            .join("&");
          const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&${filterParams}`;
          console.log("API Request URL:", url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          data = await response.json();
        }
        const uniqueRecipes = removeComplexDuplicates(data.hits);
        setRecipes(uniqueRecipes);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipes();
  }, [query, filters, useMockData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  const handleDelete = (title) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.recipe.label !== title)
    );
    if (onDelete) onDelete(title);
  };

  function removeComplexDuplicates(data) {
    const unique = [];
    const identifiers = new Set();

    for (const item of data) {
      const identifier = `${item.recipe.label}-${item.recipe.calories}`;
      if (!identifiers.has(identifier)) {
        unique.push(item);
        identifiers.add(identifier);
      }
    }

    return unique;
  }

  return <RecipeList recipes={recipes} onDelete={handleDelete} />;
};

export default FetchRecipes;
