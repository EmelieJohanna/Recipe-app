// App.js
import React from "react";
import "./App.css";
import RecipeSearch from "./components/recipeSearch";
import FetchMockData from "./mockComponents/fetchMockData";

const App = () => {
  return (
    <div className="App">
      <RecipeSearch />
      <FetchMockData />
    </div>
  );
};

export default App;
