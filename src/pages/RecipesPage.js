import { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import LoadingSpinner from "../components/layout-elements/LoadingSpinner";
import { CurrentDataContext } from '../context/currentData.context';

import axios from "axios";
//import AddRecipe from "./../components/recipes/AddRecipe";
import RecipeSelected from "../components/recipes/RecipeSelected";
import RecipeCard from "./../components/recipes/RecipeCard";


const API_URI = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const token = localStorage.getItem("authToken");


function RecipesListPage() {

    const [ recipes, setRecipes ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ recipeSelected, setRecipeSelected ] = useState(null)

    const { userDevice } = useContext(CurrentDataContext)

    // Load the first recipe in the Selected recipe container
    useEffect(()=>{
      if (recipes) {
        let firstRecipe = recipes[0]
        setRecipeSelected(firstRecipe)
      }
    },[recipes])

    
    const dispatchToRecipe = (recipeId) => {

      if (userDevice === "mobile") {
          <Redirect to="/recipes" id={recipeId} />   // CHECK THIS!! 
      } else {
          // show recipe in the container
          let getRecipe = recipes.filter( (recipe) => recipe._id === recipeId)
          setRecipeSelected(getRecipe)
      }
    }

    const getAllRecipes = () => {
      // Get the token from the localStorage
      const token = localStorage.getItem("authToken");
      axios
        .get(`${API_URI}/recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          let foundRecipes = response.data.data
          setRecipes(foundRecipes)
          setIsLoading(false)
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
      getAllRecipes();
    }, []);


    const submitRecipeChange = (e, recipeId) => {

      let tooltipEl = e.target.parentElement.querySelector('.tooltip-form.info')
      let field = e.target.attributes.fieldtoedit.value  // custom attribute  
      let value = e.target.innerText
      
      const requestBody = { [field]: value }   
      const putURL = `${API_URI}/recipes/${recipeId}`

      axios
          .put(putURL, requestBody, {     // updates baby info    
              headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
              tooltipEl.classList.add('show')
              tooltipEl.innerText = `${field} saved!`
              setTimeout(()=>{ tooltipEl.classList.remove('show')}, 1000)
          })
          .catch((error) => console.log(error));
    }


  return (
    <div className="recipes-page">

      <h1>Recipes</h1>

      <Link to="/"><div className="btn">Add recipe</div></Link>

      <div className="recipes-page-container">

          { isLoading && <LoadingSpinner msg="Loading recipes..."/> }

          <div className="recipes-list-container">
                { recipes && recipes.map((recipe) => 
                      <RecipeCard key={recipe._id} recipe={recipe} dispatchToRecipe={dispatchToRecipe} /> 
                )}
          </div>

          <div className="recipes-selected">
            <RecipeSelected recipe={recipeSelected} submitRecipeChange={submitRecipeChange} />
          </div>
      </div>
      
    </div>
  );
}

export default RecipesListPage;
