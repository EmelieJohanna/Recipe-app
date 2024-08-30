import { useState } from "react";
import RecipeCard from "./recipeCard";
import './UserRecipeForm.css';

function UserRecipeForm() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    time: "",
    ingredients: [],
    instructions: "",
    imgSrc: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleIngredientsChange = (e) => {
    const ingredientsArray = e.target.value
      .split(",")
      .map((ingredient) => ingredient.trim());
    setNewRecipe({ ...newRecipe, ingredients: ingredientsArray });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewRecipe({ ...newRecipe, imgSrc: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !newRecipe.title ||
      !newRecipe.ingredients.length ||
      !newRecipe.instructions
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({
      title: "",
      time: "",
      ingredients: [],
      instructions: "",
      imgSrc: "",
    });
    setError(""); // Clear any previous error messages
  };

  const handleEditRecipe = (id) => {
    const recipe = recipes.find((r) => r.id === id);
    const updatedRecipe = {
      ...recipe,
      isEditing: true,
    };
    setRecipes(recipes.map((r) => (r.id === id ? updatedRecipe : r)));
  };

  const handleSaveRecipe = (id, updatedRecipe) => {
    setRecipes(
      recipes.map((r) =>
        r.id === id ? { ...updatedRecipe, id, isEditing: false } : r
      )
    );
  };

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
        <input
          type="text"
          id="time"
          name="time"
          value={newRecipe.time}
          onChange={handleInputChange}
          placeholder="Cooking Time"
        />
        <textarea
          id="ingredients"
          name="ingredients"
          value={newRecipe.ingredients.join(", ")}
          onChange={handleIngredientsChange}
          placeholder="Ingredients (comma separated)"
          required
        />
        <textarea
          id="instructions"
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          placeholder="Instructions"
          required
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

      <div className="recipe-list-container" id="recipesContainer">
        {recipes.map((recipe) =>
          recipe.isEditing ? (
            <div key={recipe.id}>
              <input
                type="text"
                value={recipe.title}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={recipe.time}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    time: e.target.value,
                  })
                }
              />
              <textarea
                value={recipe.ingredients.join(", ")}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    ingredients: e.target.value
                      .split(",")
                      .map((ingredient) => ingredient.trim()),
                  })
                }
              />
              <textarea
                value={recipe.instructions}
                onChange={(e) =>
                  handleSaveRecipe(recipe.id, {
                    ...recipe,
                    instructions: e.target.value,
                  })
                }
              />
              <button
                onClick={() => handleSaveRecipe(recipe.id, { ...recipe })}
              >
                Save
              </button>
            </div>
          ) : (
            <RecipeCard
              key={recipe.id}
              imgSrc={recipe.imgSrc || "/img/Recept1.png"} // Use the uploaded image if available, otherwise use a default image
              imgAlt="image of dish"
              title={recipe.title}
              time={recipe.time}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              onEdit={() => handleEditRecipe(recipe.id)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
              onSave={(updatedRecipe) =>
                handleSaveRecipe(recipe.id, updatedRecipe)
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default UserRecipeForm;
