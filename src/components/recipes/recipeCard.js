import React, { useState } from "react";
import "./RecipeCard.css";
import "./styles/deleteBtn.css";

const RecipeCard = ({ title, calories, image, ingredients, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
    const [editedCalories, setEditedCalories] = useState(calories);
    const [editedIngredients, setEditedIngredients] = useState(ingredients);
  
    const handleSave = () => {
      const editedRecipe = {
        recipe: {
        label: editedTitle,
        calories: editedCalories,
        image: image,
        ingredients: editedIngredients.map(text => ({ text })),
      },
    };
    //Save locally
    try {
      localStorage.setItem(editedTitle, JSON.stringify(editedRecipe));
    } catch (e) {
      console.error("Error saving to local storage", e);
    }

    if (onEdit) {
      onEdit();
    }

    setIsEditing(false);
  };

  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={image} alt={title} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedIngredients.join(", ")}
            onChange={(e) => setEditedIngredients(e.target.value.split(", "))}
          />
          <input
            type="text"
            value={editedCalories}
            onChange={(e) => setEditedCalories(e.target.value)}
          />
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </>
      ) : (
        <>
          <h1 className="recipe-card-title">{title}</h1>
          <div className="recipe-card-ingredients">
            <h2>Ingredients:</h2>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
          <p className="recipe-card-calories">Calories : {calories}</p>
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(title)} className="delete-btn">
            Delete
          </button>
        </>
      )}
    </div>
  );
};
export default RecipeCard;
