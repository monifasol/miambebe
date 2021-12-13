import { useState, useEffect } from "react";
import axios from "axios";
//import AddRecipe from "./../components/recipes/AddRecipe";
//import RecipeCard from "./../components/recipes/RecipeCard";
import env from "react-dotenv";

const API_URI = env.SERVER_API_URL;

function RecipesListPage() {
  const [recipes, setRecipes] = useState([]);

  const getAllRecipes = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URI}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="ProjectListPage">

      <h1>Recipes</h1>

      <p>I am working on this!</p>


      title: My first recipe"
      content
      preparationTime 
      difficulty


      
      {/* <AddRecipe refreshProjects={getAllRecipes} />

      {projects.map((project) => (
        <RecipeCard key={project._id} {...project} />
      ))} */}
      
    </div>
  );
}

export default RecipesListPage;
