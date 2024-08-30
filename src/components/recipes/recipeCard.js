import React from "react";
import './RecipeCard.css';

const RecipeCard = ({ title, calories, image, ingredients }) => {
  return (
    <div className="style.recipe">
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories : {calories}</p>
      <img className="style.image" src={image} alt="" />
    </div>
  );
};
export default RecipeCard;
