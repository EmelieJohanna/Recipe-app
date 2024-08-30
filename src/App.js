// App.js
import React, { useState } from "react";
import "./App.css";
import FetchMockData from "./mockComponents/fetchMockData";
import UserRecipeForm from "./components/recipes/userRecipeForm";
import Navbar from "./components/Navbar";
import RecipeSearchPage from './components/recipes/RecipeSearchPage';
import HomePage from './components/recipes/HomePage';


const App = () => {
  const [view, setView] = useState("home");

  // Funktion för view
  const handleSelectView = (view) => {
    setView(view);
  };
  return (
    <div className="App">
      <h1>Recipe App Name</h1>
      <Navbar onSelectView={handleSelectView} />
      {view === 'home' && <HomePage />}
      {view === 'search' && <RecipeSearchPage />}
      {view === 'userRecipe' && <UserRecipeForm />}
    </div>
  );
};

export default App;
