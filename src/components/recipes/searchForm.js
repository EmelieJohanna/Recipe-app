// components/SearchForm.js
import React from "react";
import "./SearchForm.css"

const SearchForm = ({ query, updateSearch, getSearch }) => (
  <form className="search-form" onSubmit={getSearch}>
    <input
      className="search-bar"
      type="text"
      value={query}
      onChange={updateSearch}
    />
    <button className="search-button" type="submit">
      Search
    </button>
  </form>
);

export default SearchForm;
