import React, { useState, useEffect } from "react";
import "./styles.css";


const API_KEY = "f23c001e1d0c4f9bb9f77906e6d2c62b";
const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Initial load with "Pasta" as the default search term
    searchRecipe("Pasta");
  }, []);

  const searchRecipe = async (title) => {
    try {
      const response = await fetch(`${BASE_URL}&query=${title}`);
      const data = await response.json();
      if (data.results) {
        setRecipes(data.results); // Use data.results for Spoonacular
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    searchRecipe(searchTerm);
  };

  return (
    <div className="application">
      <h1>Recipe Guide!!!</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe">
              <h3>{recipe.title}</h3>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "200px" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default App;
