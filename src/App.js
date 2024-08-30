// App.js
import React from "react";
import "./App.css";
import RecipeSearch from "./components/recipeSearch";
import UserRecipeForm from "./components/userRecipeForm";

const App = () => {
  return (
    <div className="App">
      <h1>Recipe App Name</h1>

      <UserRecipeForm />
      <RecipeSearch />
    </div>
  );
};

export default App;
