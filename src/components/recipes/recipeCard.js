import React from "react";
import './RecipeCard.css';

const RecipeCard = ({ title, calories, image, ingredients }) => {
  return (
    <div className="recipe-card">
      <img className="recipe-card-image" src={image} alt="title" />
      <h1 className="recipe-card-title">{title}</h1>
      <div className="recipe-card-ingredients">
          <h2>Ingredients:</h2>
      <ul> 
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      </div>
      <p className="recipe-card-calories">Calories : {calories}</p>
      
    </div>
  );
};
export default RecipeCard;
