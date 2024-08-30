import { useState, useEffect } from "react";

function FetchMockData() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch("./recipes.json");
        let result = await res.json();

        setRecipes(result.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  );
}

export default FetchMockData;
