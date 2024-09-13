import React, { useState } from "react";
import "./styles/RecipeCard.css";

const RecipeCard = ({
  title,
  image,
  ingredients,
  onDelete,
  onEdit,
  onRate,
}) => {
  // State for managing editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedIngredients, setEditedIngredients] = useState(
    ingredients.map((ingredient) => ingredient.text)
  );

  // State for rating
  const [rating, setRating] = useState(0);

  // Handle rating
  const handleRate = (newRating) => {
    setRating(newRating);
    // if (onRate) {
    //   onRate(title, newRating);
    // }
  };

  // Handle save
  const handleSave = () => {
    const editedRecipe = {
      recipe: {
        label: editedTitle,
        image: image,
        ingredients: editedIngredients.map((text) => ({ text })),
      },
    };

    // Save locally
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
                <li key={`${ingredient.foodId}-${index}`}>{ingredient.text}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-card-footer">
            <div className="recipe-card-rating">
              <p>Rating: {rating}/5</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  className={rating >= star ? "star filled" : "star"}
                >
                  ★
                </button>
              ))}
            </div>
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(title)} className="delete-btn">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeCard;
