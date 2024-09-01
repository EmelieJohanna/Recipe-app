import React from "react";
import "./RecipeCard.css";
import "./styles/deleteBtn.css";

const RecipeCard = ({ title, calories, image, ingredients, onDelete }) => {
  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={image} alt="title" />
      <h1 className="recipe-card-title">{title}</h1>
      <div className="recipe-card-ingredients">
        <h2>Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.foodId}-${index}`}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
      <p className="recipe-card-calories">Calories : {calories}</p>
      <button onClick={() => onDelete(title)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};
export default RecipeCard;
