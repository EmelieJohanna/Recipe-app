export const getCategoryQuery = (category) => {
    const categoryQueryMap = {
      "Gluten-Free": "gluten-free",
      "Vegetarian": "vegetarian",
      "Vegan": "vegan",
    };
  
    return categoryQueryMap[category] || "all";
  };
  