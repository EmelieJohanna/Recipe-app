// App.js
import React from "react";
import "./App.css";
import RecipeSearch from "./components/recipeSearch";
import FetchMockData from "./mockComponents/fetchMockData";
import UserRecipeForm from "./components/userRecipeForm";

const App = () => {
  return (
    <div className="App">
      <h1>Recipe App Name</h1>

      <UserRecipeForm />
      <RecipeSearch />
      <FetchMockData />
    </div>
  );
};

export default App;
