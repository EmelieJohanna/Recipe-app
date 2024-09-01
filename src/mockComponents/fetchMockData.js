import { useState, useEffect } from "react";
//import "../components/recipes/RecipeList.css";
//import "../components/recipes/RecipeCard.css";
import "./MockData.css";

function FetchMockData() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch("/recipes.json");
        let result = await res.json();
        console.log(result);
        setRecipes(result.recipes);
        console.log(result.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="recipe-list-2">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card-2">
      <div className="first-half">
        <h2>{recipe.title}</h2>
        <img src={recipe.imageURL} alt={recipe.title} className="recipe-card-image" />
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="second-half">
        <h3>Instructions:</h3>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default FetchMockData;
