import React, { useState, useEffect } from "react";

const UserRecipeForm = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      title.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      alert("Please fill out all fields!");
      return;
    }

    // Handle image upload
    if (image) {
      const formData = new FormData();
      formData.append("recipe[title]", title);
      formData.append("recipe[ingredients]", ingredients);
      formData.append("recipe[instructions]", instructions);
      formData.append("recipe[image]", image);

      fetch("/api/create-recipe", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Recipe created:", data);
          // Reset form after successful submission
          setTitle("");
          setIngredients("");
          setInstructions("");
          setImage(null);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please select an image to upload.");
    }
  };

  // Function to handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    const handleUpload = async () => {
      try {
        if (!image) return;

        const formData = new FormData();
        formData.append("recipe[title]", title);
        formData.append("recipe[ingredients]", ingredients);
        formData.append("recipe[instructions]", instructions);
        formData.append("recipe[image]", image);

        const response = await fetch("/api/create-recipe", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Recipe created:", data);

        // Reset form after successful submission
        setTitle("");
        setIngredients("");
        setInstructions("");
        setImage(null);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    handleUpload();
  }, [image]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create your recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name..."
      />

      <textarea
        rows="4"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients..."
      ></textarea>

      <textarea
        rows="4"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions..."
      ></textarea>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />

      <button type="submit">Add recipe</button>
    </form>
  );
};

export default UserRecipeForm;
