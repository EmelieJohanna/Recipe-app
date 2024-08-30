import React, { useState, useEffect } from "react";

const UserRecipeForm = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
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

    try {
      // Create a JSON object with form data
      const formData = {
        title,
        ingredients,
        instructions,
        image: image ? URL.createObjectURL(image) : null,
      };

      // Send POST request with JSON body
      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  // Function to handle image selection
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    const handleUpload = async () => {
      try {
        if (!image) return;

        const formData = {
          title,
          ingredients,
          instructions,
          image: URL.createObjectURL(image),
        };

        const response = await fetch("/api/create-recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
