// components/recipes/HomePage.js
import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import SearchForm from './SearchForm';
import CategoryFilter from './CategoryFilter';
import FetchRecipes from './FetchRecipes';

const HomePage = () => {
  const defaultQuery = '';
  const [query, setQuery] = useState(''); // User search query
  const [filters, setFilters] = useState({
    mealType: '',
    dishType: '',
    health: '',
  }); // User-selected filters

 // Handling input changes and form submission
 const handleSelectCategory = (filterType, value) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [filterType]: prevFilters[filterType] === value ? '' : value,
  }));
};

const updateSearch = (e) => {
  setQuery(e.target.value);
};

const getSearch = (e) => {
  e.preventDefault();
};

return (
  <div>
    <SearchForm query={query} updateSearch={updateSearch} getSearch={getSearch} />
    <CategoryFilter filters={filters} onSelectCategory={handleSelectCategory} />
    <FetchRecipes query={query} filters={filters} />
  </div>
);
};

export default HomePage;