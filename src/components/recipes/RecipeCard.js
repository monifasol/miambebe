import React from 'react'


const RecipeCard = ({ recipe, dispatchToRecipe }) => {


  return (

    <div className="recipe-card" onClick={ () => { dispatchToRecipe(recipe._id) }}>

        <p className="title">
          {recipe.title}
        </p>

        <p className="writter">by {recipe.user.name} </p>

        <p> 
          { recipe.tags.map((tag, i) => 
              <span className="tag" key={i}> {tag} </span>
          ) }
        </p>

        <p className="content">
          {recipe.content.slice(0, 200)}...
        </p>

        <p className="intolerances">
          <span className="intolerances-label">Possible intolerances: </span>
          { recipe.intolerances.map((into, i) => 
              <span className="tag" key={i}> {into} </span>
          ) }
        </p>

        <div className="bar-bottom">
            <p className="prep-time">
                Preparation time: {recipe.preparationTime} min
            </p>

            <p className="difficulty">
              difficulty: {recipe.difficulty} 
            </p>
        </div>

    </div>
  )
}

export default RecipeCard;
