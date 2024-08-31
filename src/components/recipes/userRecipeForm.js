import React, { useState } from "react";
import RecipeCard from "./recipeCard";
import "./UserRecipeForm.css";

function UserRecipeForm() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: [],
    image: "",
    calories: "",
  });
  const [error, setError] = useState("");

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  // Handle input changes for ingredients
  const handleIngredientsChange = (e) => {
    setNewRecipe({ ...newRecipe, ingredients: e.target.value.split(", ") });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    // Get the first file from the file input element

    const file = e.target.files[0];
    // Create a new FileReader instance to read the file

    const reader = new FileReader();
    //when the file reading is completed..
    reader.onloadend = () => {
      setNewRecipe({ ...newRecipe, image: reader.result });
    };
    // If a file is selected, read it as a Data URL (base64-encoded string)

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Basic validation
  const validateForm = () => {
    if (!newRecipe.title || !newRecipe.ingredients.length) {
      setError("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  // Handle adding a new recipe
  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Add new recipe to the list
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({
      title: "",
      ingredients: [],
      image: "",
      calories: "", // Reset
    });
    setError(""); // Clear any previous error messages
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return (
    <div className="user-recipe-form">
      <h3>New Recipe</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleAddRecipe} id="recipeForm">
        <input
          type="text"
          id="title"
          name="title"
          value={newRecipe.title}
          onChange={handleInputChange}
          placeholder="Recipe Title"
          required
        />

        <textarea
          id="ingredients"
          name="ingredients"
          value={newRecipe.ingredients.join(", ")}
          onChange={handleIngredientsChange}
          placeholder="Ingredients"
          required
        />

        <input
          type="text"
          id="calories"
          name="calories"
          value={newRecipe.calories}
          onChange={handleInputChange}
          placeholder="Calories"
        />
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Add Recipe</button>
      </form>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image || "/food.jpg"}
            title={recipe.title}
            calories={recipe.calories}
            ingredients={recipe.ingredients}
            onDelete={() => handleDeleteRecipe(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default UserRecipeForm;
