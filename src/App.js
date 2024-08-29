import React, { useEffect, useState } from "react";
import "./App.css";
import RecipeCard from "./components/recipeCard";

const App = () => {
  //the api keys - put in env file later
  const APP_ID = "3aed539c";
  const APP_KEY = "6dfab6fbb48a7afb4e107d3933a8418d";
  //all states I need:
  const [recipes, setRecipes] = useState([]); //the list of recipes
  const [search, setSearch] = useState(""); //the search field state
  const [query, setQuery] = useState("chicken"); //a query for the api, set to chicken to start with

  //The fetch to get the recipes, not on mount but on query
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    // Call the async function
    fetchRecipes();
  }, [query]); // Run the effect when 'query' changes

  //functions for setting the search state on the input and setting the search input to be the query on form submit
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //return a form with a search bar & button and under it a list of recipes
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipe.lable} //no id:s in the api, change to something else?
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
