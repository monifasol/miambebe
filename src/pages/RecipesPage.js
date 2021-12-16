import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "../components/layout-elements/LoadingSpinner";
import { DataContext } from '../context/data.context';
import AddRecipe from "../components/recipes/AddRecipe";

import axios from "axios";
//import AddRecipe from "./../components/recipes/AddRecipe";
import RecipeSelected from "../components/recipes/RecipeSelected";
import RecipeCard from "./../components/recipes/RecipeCard";


const API_URI = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("authToken");


function RecipesListPage() {

    const [ recipes, setRecipes ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ recipeSelected, setRecipeSelected ] = useState(null)

    const { userDevice } = useContext(DataContext)

    
    const dispatchToRecipe = (recipeId) => {

      if (userDevice === "mobile") {
          <Redirect to={`/recipes/${recipeId}`} />  
      } else {
          // show recipe in the container
          let getRecipe = recipes.filter( (recipe) => recipe._id === recipeId)
          setRecipeSelected(getRecipe[0])
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
          let firstRecipe = foundRecipes[0]
          setRecipeSelected(firstRecipe)
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


    const openModalRecipe = () => {
      let overlay = document.getElementById("overlayModals")
      let modalNewBaby = document.getElementById('modalRecipe')
      modalNewBaby.classList.add("show")
      overlay.classList.add("show")

  }

  const closeModalRecipe = () => {
      let overlay = document.getElementById("overlayModals")
      let modalNewBaby = document.getElementById('modalRecipe')
      modalNewBaby.classList.remove("show")
      overlay.classList.remove("show")
  }


  useEffect(() => {

    let recipeSelectedElement = document.querySelector('.recipes-selected')


    console.log("recipeSelectedElement", recipeSelectedElement)

    if (recipes) {

      window.addEventListener('scroll', function () {
        var scrolledHeight = window.pageYOffset || document.documentElement.scrollTop;
    
        if (scrolledHeight > 240) {     // we are in the top
          recipeSelectedElement && recipeSelectedElement.classList.add('fix')
        } else {
          recipeSelectedElement && recipeSelectedElement.classList.remove('fix')
        }
      }, false);
    }

  }, [])
  

  return (
    <div className="recipes-page">

      <h1>Recipes</h1>

      <div className="btn" onClick={ ()=> openModalRecipe()}>Add recipe</div>

      <div className="modal" id="modalRecipe">
          <span className="close-modal" onClick={ ()=> closeModalRecipe()}></span>
          <AddRecipe /> 
      </div>


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
