import React from "react";
import { useState } from "react";
import "./RecipeCard.css";

const RecipeCard = ({ title, image, ingredients, onDelete, onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(title, newRating);
    }
  };
  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={image} alt={title} />
      <h1 className="recipe-card-title">{title}</h1>
      <div className="recipe-card-ingredients">
        <h2>Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.foodId}-${index}`}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
      {/* <p className="recipe-card-calories">Calories : {calories}</p> */}
      <div className="recipe-card-footer">
        <div className="recipe-card-rating">
          <p>Rating: {rating}</p>
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
        <button onClick={() => onDelete(title)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};
export default RecipeCard;
