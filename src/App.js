// App.js
import React, { useState } from "react";
import "./App.css";
// import FetchMockData from "./mockComponents/fetchMockData";
import UserRecipeForm from "./components/recipes/UserRecipeForm";
import Navbar from "./components/Navbar";

import HomePage from "./components/recipes/HomePage";

const App = () => {
  const [view, setView] = useState("home");

  // Funktion för view
  const handleSelectView = (view) => {
    setView(view);
  };
  return (
    <div className="App">
      <Navbar onSelectView={handleSelectView} />
      {view === "home" && <HomePage />}
      {view === "userRecipe" && <UserRecipeForm />}
    </div>
  );
};

export default App;
