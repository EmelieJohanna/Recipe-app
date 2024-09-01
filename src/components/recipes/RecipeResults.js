// components/RecipeSearch.js
import FetchRecipes from "./FetchRecipes";

const RecipeResults = ({ query, filters }) => {
  return (
    <div>
      <FetchRecipes query={query} filters={filters} />
    </div>
  );
};

export default RecipeResults;
