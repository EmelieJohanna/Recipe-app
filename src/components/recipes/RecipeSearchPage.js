// components/recipes/RecipeSearchPage.js
import React, { useState } from 'react';
import RecipeSearch from './recipeSearch';
import CategoryFilter from './CategoryFilter';

const RecipeSearchPage = () => {
  const [category, setCategory] = useState('');

  const handleSelectCategory = (category) => {
    setCategory(category);
  };

  return (
    <div className="recipe-search-page">
      <CategoryFilter onSelectCategory={handleSelectCategory} />
      <RecipeSearch category={category} />
    </div>
  );
};

export default RecipeSearchPage;
